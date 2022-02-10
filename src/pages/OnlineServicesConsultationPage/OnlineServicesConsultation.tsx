import React, { FC, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ConsultationAPI from "utils/api/ConsultationAPI";
import {
  OnlineQuestion,
  OnlineServiceIds,
  OnlineServiceParamTypes,
  SuccessfulConsultationResponse,
} from "app/store/reducer/online/types";
import { ALL_STEPS, Stepper, StepperSteps } from "components/Stepper";
import { analytics } from "@welldigital/ui-common/Analytics";
import { isHana1315Flow } from "../../utils/onlineServiceConsultation";
import { Text } from "../../components";
import { useStyles } from "./styles";
import { eventsBuilder } from "utils/events";
import { getCookieObject } from "utils/cookieParser";

export interface OnlineServicesConsultationDispatchProps {
  runTripetto(
    onlineServiceId: string,
    element: React.MutableRefObject<null>,
    handleSuccessfulConsultation: (
      data: SuccessfulConsultationResponse[]
    ) => void,
    onAnswerEditStarted: ({
      question,
      answer,
    }: {
      question?: string;
      answer?: string;
    }) => void
  ): void;
  setConsultation(service: string, c: OnlineQuestion[]): void;
  setIsConsultationValidForOrder(payload: boolean): void;
  sendHana1315Email(d: OnlineQuestion[]): void;
}

export const OnlineServicesConsultation: FC<OnlineServicesConsultationDispatchProps> =
  ({
    runTripetto,
    setConsultation,
    sendHana1315Email,
    setIsConsultationValidForOrder,
  }) => {
    const { onlineServiceId } = useParams<OnlineServiceParamTypes>();
    const classes = useStyles();

    useEffect(() => {
      const hasReferral = document.referrer && document.referrer !== "";
      const refferal = hasReferral ? document.referrer : "UNAVAILABLE";

      const cookieObject = getCookieObject();

      const cookieToSpread: any = {};

      if (cookieObject._gaexp) {
        const cookieValues = cookieObject._gaexp.split(".");
        cookieToSpread.experimentId = cookieValues[2];
        cookieToSpread.experimentVariant = cookieValues[4];
      }

      analytics.trackEvent({
        flow: onlineServiceId,
        event: eventsBuilder.consultation.start,
        metadata: { refferal, ...cookieToSpread },
      });
    }, [onlineServiceId]);

    const handleSuccessfulConsultation = useCallback(
      (data: SuccessfulConsultationResponse[]) => {
        const values = data
          .filter(({ answer }) => answer !== undefined)
          .filter(
            ({ kind, answer }) => kind !== "tripetto-block-checkboxes" || answer
          )
          .map((response, i) => ({
            number: i,
            initialQuestion: response.initialQuestion,
            question: response.question,
            answer: response.answerString,
            type: response.type,
          }));

        let successMarker;

        if (values[values.length - 1]?.question === "Successful consultation") {
          successMarker = values.pop();
          if (successMarker?.answer === "true") {
            setIsConsultationValidForOrder(true);
          }
        }

        setConsultation(onlineServiceId, values);

        if (successMarker?.answer) {
          analytics.trackEvent({
            flow: onlineServiceId,
            event: eventsBuilder.consultation.complete,
          });
        } else {
          const userConsultation = [...values];
          const isEmail = (question: string) =>
            !!/email address/i.test(question);
          const isInfo = (question: string) =>
            !!/relevant information for the pharmacist/i.test(question);
          const isPhone = (question: string) =>
            !!/phone number/i.test(question);

          const userEmail = userConsultation.find(({ question }) =>
            isEmail(question)
          )?.answer;
          const userInfo = userConsultation.find(({ question }) =>
            isInfo(question)
          )?.answer;
          const userPhone = userConsultation.find(({ question }) =>
            isPhone(question)
          )?.answer;

          const filteredConsultation = userConsultation
            .filter(({ question }) => !isEmail(question))
            .filter(({ question }) => !isInfo(question))
            .filter(({ question }) => !isPhone(question));

          const finalConsultation = filteredConsultation.map((q) => {
            switch (q.type) {
              case "bool":
                return {
                  number: q.number,
                  question: q.question,
                  answerBool: q.answer === "true",
                };
              case "int":
                return {
                  number: q.number,
                  question: q.question,
                  answerInt: parseInt(q.answer),
                };
              case "string":
              default:
                return {
                  number: q.number,
                  question: q.question,
                  answerString: q.answer,
                };
            }
          });

          const requestBody = {
            email: userEmail,
            info: userInfo,
            phone: userPhone,
            consultation: {
              service: onlineServiceId,
              consultation: finalConsultation,
            },
          };

          analytics.trackEvent({
            flow: onlineServiceId,
            event: eventsBuilder.consultation.referral,
          });

          (async () => {
            try {
              await ConsultationAPI.sendInfoToReferral(requestBody);
            } catch (err) {
              console.error(err);
            }
          })();

          const lastQuestion = values.pop();

          analytics.trackEvent({
            flow: onlineServiceId,
            event: eventsBuilder.consultation.referral,
            metadata: {
              lastQuestion: lastQuestion?.initialQuestion,
              answer: lastQuestion?.question,
            },
          });
        }

        if (
          onlineServiceId === OnlineServiceIds.hana &&
          isHana1315Flow(values)
        ) {
          sendHana1315Email(values);
        }
      },
      [
        setConsultation,
        onlineServiceId,
        sendHana1315Email,
        setIsConsultationValidForOrder,
      ]
    );

    const inputEl = useRef(null);

    useEffect(() => {
      if (!inputEl || !inputEl.current) {
        return;
      }

      const onAnswerEdit = ({
        question,
        answer,
      }: {
        question?: string;
        answer?: string;
      }) => {
        if (question && !/Successful consultation/i.test(question)) {
          analytics.trackEvent({
            flow: onlineServiceId,
            event: question,
            metadata: {
              answer,
            },
          });
        }
      };

      runTripetto(
        onlineServiceId,
        inputEl,
        handleSuccessfulConsultation,
        onAnswerEdit
      );
    }, [inputEl, runTripetto, onlineServiceId, handleSuccessfulConsultation]);

    return (
      <>
        {onlineServiceId === OnlineServiceIds.ed && (
          <Stepper steps={ALL_STEPS} currentStep={StepperSteps.CONSULTATION} />
        )}
        <Text variant={"label"}>Let’s get started</Text>
        <Text variant={"title"}>Complete your free online consultation</Text>
        <Text classes={{ root: classes.description }} variant={"paragraph"}>
          All information you provide is completely confidential. We don't ask
          for your personal details during your consultation. You'll only need
          to enter your details when placing an order.
        </Text>
        <div ref={inputEl} />
      </>
    );
  };
