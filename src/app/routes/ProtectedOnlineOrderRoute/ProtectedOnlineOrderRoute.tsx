import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useLocation, useHistory } from "react-router-dom";
import {
  OnlineServiceParamTypes,
  OnlineServiceIds,
} from "app/store/reducer/online/types";
import {
  setIsConsultationValidForOrder,
  makeSetConsultation,
} from "app/store/reducer/online/actions";

import { getOnlineIsConsultationValidForOrder } from "app/store/selectors";
import { getProduct, getCustomer } from "app/store/reducer/order/selectors";
import {
  OrderProduct,
  OrderCustomerDetails,
} from "app/store/reducer/order/types";
import { useLocationQuery } from "utils/utils";
import ConsultationAPI from "utils/api/ConsultationAPI";
import { analytics } from "@welldigital/ui-common";
import { eventsBuilder } from "utils/events";

export interface ProtectedOnlineOrderRouteProps {
  requiredStepsIds: RequiredSteps[];
  basename?: string;
}

export enum RequiredSteps {
  CONSULTATION = "consultation",
  PRODUCT_SELECTION = "product-selection",
  CUSTOMER_DETAILS = "customer-details",
}

type ValidatorsByStepType = {
  [key in RequiredSteps]: (step: Step) => boolean;
};

// A dict with validator functions for each step
const validatorsByStep: ValidatorsByStepType = {
  [RequiredSteps.CONSULTATION]: ({ data }: Step) => data as boolean,
  [RequiredSteps.PRODUCT_SELECTION]: ({ data }: Step) =>
    !!(data as OrderProduct),
  [RequiredSteps.CUSTOMER_DETAILS]: (step: Step) => {
    const data = step.data as OrderCustomerDetails | null;
    return !!data?.firstName;
  },
};

type Step = {
  id: RequiredSteps;
  data: boolean | OrderProduct | OrderCustomerDetails;
  redirectUrl: string;
};

export const ProtectedOnlineOrderRoute: React.FC<ProtectedOnlineOrderRouteProps> =
  ({ requiredStepsIds, children, basename }) => {
    const { onlineServiceId } = useParams<OnlineServiceParamTypes>();
    const isEd = onlineServiceId === OnlineServiceIds.ed;
    const isConsultationValidForOrder = useSelector(
      getOnlineIsConsultationValidForOrder
    );
    const { referral, email } = useLocationQuery();
    const { pathname } = useLocation();
    const shouldVerifyReferral =
      isEd &&
      !!referral &&
      !!email &&
      pathname === "/order/ed/product-selection";
    const [isVerifyingReferral, setIsVerifyingReferral] =
      useState<boolean>(shouldVerifyReferral);
    const product = useSelector(getProduct);
    const { customerDetails } = useSelector(getCustomer);
    const history = useHistory();
    const dispatch = useDispatch();

    const verifyReferral = useCallback(async () => {
      try {
        setIsVerifyingReferral(true);
        await ConsultationAPI.validate(referral, email);

        analytics.trackEvent({
          flow: "ed",
          event: eventsBuilder.consultation.referralLink,
          metadata: {
            isCodeValid: true,
          },
        });

        dispatch(setIsConsultationValidForOrder(true));
        makeSetConsultation(dispatch)(onlineServiceId, [
          {
            number: 0,
            initialQuestion: "Pharmacist referral",
            question: "Pharmacist referral Yes",
            answer: "Checked",
            type: "bool",
          },
        ]);
        setIsVerifyingReferral(false);
      } catch (err) {
        analytics.trackEvent({
          flow: "ed",
          event: eventsBuilder.consultation.referralLink,
          metadata: {
            isCodeValid: false,
          },
        });

        history.push(`/order/${onlineServiceId}/consultation`);
      }
    }, [
      onlineServiceId,
      history,
      referral,
      email,
      dispatch,
      setIsVerifyingReferral,
    ]);

    useEffect(() => {
      if (shouldVerifyReferral) {
        verifyReferral();
      }
    }, [shouldVerifyReferral, verifyReferral]);

    if (isVerifyingReferral) return null;

    const steps: Record<string, Step> = {
      [RequiredSteps.CONSULTATION]: {
        id: RequiredSteps.CONSULTATION,
        data: isConsultationValidForOrder,
        redirectUrl: `${
          basename ? `/${basename}` : ""
        }/${onlineServiceId}/consultation`,
      },
      [RequiredSteps.PRODUCT_SELECTION]: {
        id: RequiredSteps.PRODUCT_SELECTION,
        data: product,
        redirectUrl: `${
          basename ? `/${basename}` : ""
        }/${onlineServiceId}/product-selection`,
      },
      [RequiredSteps.CUSTOMER_DETAILS]: {
        id: RequiredSteps.CUSTOMER_DETAILS,
        data: customerDetails,
        redirectUrl: `${
          basename ? `/${basename}` : ""
        }/${onlineServiceId}/account-details`,
      },
    };

    const requiredSteps = requiredStepsIds.map(
      (stepId: RequiredSteps) => steps[stepId]
    );

    const failedStep = requiredSteps.find(
      (step: Step) => !validatorsByStep[step.id](step)
    );

    // for now the protection works only on "ed" flow
    if (!isEd) {
      return children as unknown as JSX.Element;
    }

    return failedStep ? (
      <Redirect to={failedStep.redirectUrl} />
    ) : (
      (children as unknown as JSX.Element)
    );
  };

export default ProtectedOnlineOrderRoute;
