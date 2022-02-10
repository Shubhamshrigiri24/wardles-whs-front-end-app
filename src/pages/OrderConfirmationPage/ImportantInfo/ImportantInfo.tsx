import React from "react";
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { Message } from "../../../components";
import { OnlineQuestion } from "../../../app/store/reducer/online/types";
import { HanaTripettoQuestions } from "../../../constants/hanaTripettoQuestions";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginTop: theme.spacing(5),
  },
  title: {
    marginTop: theme.spacing(5),
  },
  content: {
    color: "#65727D",
    fontSize: "18px",
    lineHeight: "32.4px",
  },
  specialWarningsMessage: {
    marginTop: "30px",
  },
}));

export type ImportantInfoProps = {
  consultation: OnlineQuestion[];
};

type ContentBlock = {
  title: string;
  content: JSX.Element;
};

const ImportantInfo: React.FC<ImportantInfoProps> = ({ consultation }) => {
  const classes = useStyles();
  const contentBlocks: ContentBlock[] = [];
  const specialWarnings: JSX.Element[] = [];

  let isHana1315Flow = false;
  let isQ3No = false;
  let isQ3aDesogestrel = false;
  let isQ3aInjection = false;
  let isQ3aImplant = false;
  let isQ3aUid = false;
  let isQ3aCPill = false;
  let isQ3aRing = false;
  let isQ3aPatch = false;
  let isQ3aMPill = false;
  let isQ3bcdeYes = false;
  let isQ3bcdeNo = false;
  let isQ5Yes = false;
  let isQ7Chloasma = false;
  let isQ7Thromboembolic = false;
  let isQ7Hypertension = false;
  let isQ11bNo = false;

  consultation.forEach(({ question, answer }) => {
    if (
      question === HanaTripettoQuestions.q1 &&
      ["13", "14", "15"].includes(answer)
    ) {
      isHana1315Flow = true;
    } else if (question === HanaTripettoQuestions.q3No) {
      isQ3No = true;
    } else if (question === HanaTripettoQuestions.q3aDesogestrel) {
      isQ3aDesogestrel = true;
    } else if (question === HanaTripettoQuestions.q3aInjection) {
      isQ3aInjection = true;
    } else if (question === HanaTripettoQuestions.q3aImplant) {
      isQ3aImplant = true;
    } else if (question === HanaTripettoQuestions.q3aUid) {
      isQ3aUid = true;
    } else if (question === HanaTripettoQuestions.q3aCPill) {
      isQ3aCPill = true;
    } else if (question === HanaTripettoQuestions.q3aRing) {
      isQ3aRing = true;
    } else if (question === HanaTripettoQuestions.q3aPatch) {
      isQ3aPatch = true;
    } else if (question === HanaTripettoQuestions.q3aMPill) {
      isQ3aMPill = true;
    } else if (question === HanaTripettoQuestions.q3bcdeYes) {
      isQ3bcdeYes = true;
    } else if (question === HanaTripettoQuestions.q3bcdeNo) {
      isQ3bcdeNo = true;
    } else if (question === HanaTripettoQuestions.q5Yes) {
      isQ5Yes = true;
    } else if (question === HanaTripettoQuestions.q7Chloasma) {
      isQ7Chloasma = true;
    } else if (question === HanaTripettoQuestions.q7Thromboembolic) {
      isQ7Thromboembolic = true;
    } else if (question === HanaTripettoQuestions.q7Hypertension) {
      isQ7Hypertension = true;
    } else if (
      new RegExp(HanaTripettoQuestions.q11bNoRegExp, "g").test(question)
    ) {
      isQ11bNo = true;
    }
  });

  if (isHana1315Flow) {
    // 13-15 Hana flow
    contentBlocks.push({
      title: "Safeguarding information for under-16s",
      content: (
        <>
          As you're under 16, there are a few points we need to run through with
          you.
          <br />
          <br />
          - The legal age of consent in the UK is 16
          <br />
          - Even if it's consensual, sexual activity under the age of 16 is an
          offence
          <br />
          - The offence is considered more serious if it involves someone under
          the age of 13. It's then classed as statuatory rape.
          <br />
          <br />
          Your consultation with us is confidential, but we do have a duty to
          break this in some cases. These are:
          <br />
          - If we suspect child protection issues
          <br />
          - We feel someone is at risk of exploitation
          <br />
          - We suspect someone is being coerced or forced to engage in sexual
          activity.
          <br />
          <br />
          It's important to understand the emotional and physical impact of
          sexual relationships. The risks around pregnancy and sexually
          transmitted infections are important to consider, as well as looking
          after your emotional wellbeing.
          <br />
          <br />
          You can talk to a pharmacist confidentially if you have any concerns,
          or take a look at some of the resources available online, such as the{" "}
          <a
            href={
              "https://www.nhs.uk/live-well/sexual-health/where-can-i-get-sexual-health-advice-now/"
            }
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            NHS Website
          </a>
        </>
      ),
    });
    // priority slice no 1
  } else if (isQ5Yes && isQ3aDesogestrel && isQ3bcdeYes) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Because you've told us that you have used emergency contraception
          recently, please follow the below instructions.
          <br />
          <br />
          If the emergency contraception contained levonorgestrel, you can take
          Hana on the same day, but you'll need to use another form of
          contraception for 7 days to be protected, such as condoms.
          <br />
          <br />
          If it contained ulipristal acetate, please wait 5 days before you
          start taking Hana. You should use another form of contraception until
          you start taking Hana and for the first 7 days after, such as condoms.
        </>
      ),
    });
    // priority slice no 2
  } else if (
    isQ5Yes &&
    (isQ3No ||
      isQ3aCPill ||
      isQ3aRing ||
      isQ3aPatch ||
      isQ3aMPill ||
      isQ3aInjection ||
      isQ3aImplant ||
      isQ3aUid)
  ) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Because you've told us that you have used emergency contraception
          recently, you should wait until the first day of your next period
          before you start taking Hana.
          <br />
          <br />
          In the meantime, you should use another form of contraception to be
          protected, such as condoms.
          <br />
          <br />
          If you have any concerns about this, please contact us and we'll
          arrange for you to speak to a pharmacist.
        </>
      ),
    });
  } else if (isQ3No) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          If you haven't used hormonal contraception in the last month, start
          taking Hana on the first day of your next period. You won't need to
          use any extra methods of contraception to be protected.
          <br />
          <br />
          If you start taking Hana after the first day of your period, you'll
          need to use another form of contraception to be protected, such as
          condoms.
        </>
      ),
    });
    contentBlocks.push({
      title: "Late periods",
      content: (
        <>
          If your period is late and you've had unprotected sex, you'll need to
          take a pregnancy test before you start taking Hana. We recommend
          taking a pregnancy test approximately 3 weeks after having unprotected
          sex.
          <br />
          <br />
          If the test is negative, start taking Hana on the first day of your
          period. If it's positive, do not start taking Hana, please visit your
          doctor.
        </>
      ),
    });
    contentBlocks.push({
      title: "Taking Hana after having a baby",
      content: (
        <>
          If you're taking Hana after having a baby, start within the first 21
          days after you gave birth. If this isn't possible for you, you should
          use another form of contraception for 7 days to be protected, such as
          condoms.
          <br />
          <br />
          If you've had unprotected sex before starting Hana, you should take a
          pregnancy test before you start taking it. If the test is positive,
          please visit your doctor.
        </>
      ),
    });
    contentBlocks.push({
      title: "Taking Hana after a miscarriage or abortion ",
      content: (
        <>
          If you're starting to take Hana following a miscarriage or an
          abortion, start taking it immediately or within 5 days. You won't need
          to use any extra methods of contraception. If this isn't possible for
          you, you should use another form of contraception for 7 days to be
          protected, such as condoms.
        </>
      ),
    });
  } else if (isQ3aInjection) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana on the day your next injection is due. You won't
          need to use any extra methods of contraception to be protected.
        </>
      ),
    });
  } else if (isQ3aImplant) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana on the day your implant is removed. You won't need
          to use any extra methods of contraception to be protected.
        </>
      ),
    });
  } else if (isQ3aUid) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana on the day your intrauterine system (also known as
          the coil or IUD) is removed. You won't need to use any extra methods
          of contraception to be protected.
        </>
      ),
    });
  } else if (isQ3aDesogestrel && isQ3bcdeYes) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Once you've finished your current pill pack, start your new pack the
          following day without a break, regardless of bleeding.
        </>
      ),
    });
  } else if (isQ3aDesogestrel && isQ3bcdeNo) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Once you've finished your current pill pack, start your new pack the
          following day without a break, regardless of bleeding.
          <br />
          <br />
          Because you've told us that you might've missed a dose, you'll need to
          take a pregnancy test. We recommend taking a pregnancy test
          approximately 3 weeks after having unprotected sex. You should
          continue to take Hana until then. If you do have a positive pregnancy
          test result, please visit your doctor as soon as possible.
        </>
      ),
    });
  } else if (isQ3aCPill && isQ3bcdeYes) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana the day after your last active tablet. You won't
          need to use any extra methods of contraception to be protected. If you
          start taking Hana the day after an inactive tablet, you should use
          another form of contraception for 7 days to be protected, such as
          condoms.
        </>
      ),
    });
  } else if (isQ3aCPill && isQ3bcdeNo) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana the day after your last active tablet. If you start
          taking Hana the day after an inactive tablet, use another form of
          contraception for 7 days to be protected, such as condoms.
          <br />
          <br />
          Because you've told us that you might've missed a dose, you'll need to
          take a pregnancy test. We recommend taking a pregnancy test
          approximately 3 weeks after having unprotected sex. If you do have a
          positive pregnancy test result, please visit your doctor.
        </>
      ),
    });
  } else if ((isQ3aRing || isQ3aPatch) && isQ3bcdeYes) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana on the day your contraceptive is removed. You won't
          need to use any extra methods of contraception to be protected. If you
          start the day after a break, you should use another form of
          contraception for 7 days to be protected, such as condoms.
        </>
      ),
    });
  } else if ((isQ3aRing || isQ3aPatch) && isQ3bcdeNo) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana on the day your contraceptive is removed. You won't
          need to use any extra methods of contraception to be protected. If you
          start the day after a break, you should use another form of
          contraception for 7 days to be protected, such as condoms.
          <br />
          <br />
          Because you told us you might've had an unscheduled break, you'll need
          to take a pregnancy test. We recommend taking a pregnancy test
          approximately 3 weeks after having unprotected sex. If you do have a
          positive pregnancy test result, please visit your doctor.
        </>
      ),
    });
  } else if (isQ3aMPill && isQ3bcdeYes) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana the day after your last tablet. You won't need to
          use any extra methods of contraception to be protected.
        </>
      ),
    });
  } else if (isQ3aMPill && isQ3bcdeNo) {
    contentBlocks.push({
      title: "How to take Hana",
      content: (
        <>
          Start taking Hana the day after your last tablet. You won't need to
          use any extra methods of contraception to be protected.
          <br />
          <br />
          Because you've told us that you might have missed a dose, you'll need
          to take a pregnancy test. We recommend taking a pregnancy test
          approximately 3 weeks after having unprotected sex. If you do have a
          positive pregnancy test result, please visit your doctor.
        </>
      ),
    });
  }

  // Next: warnings
  if (isQ7Chloasma) {
    specialWarnings.push(
      <>Chloasma can recur, avoid sun or UV exposure while taking Hana.</>
    );
  }
  if (isQ7Thromboembolic) {
    specialWarnings.push(
      <>
        Thromboembolic disorders can recur. You must visit your doctor urgently
        if you experience any of the following symptoms:
        <br />
        - Warm or swollen, painful leg
        <br />
        - Shortness of breath
        <br />- Coughing up blood
      </>
    );
  }
  if (isQ7Hypertension) {
    specialWarnings.push(
      <>
        You must see your doctor if your hypertension worsens or does not
        respond to any medication they prescribe for you.
      </>
    );
  }
  if (isQ11bNo) {
    specialWarnings.push(
      <>
        You're taking an antibiotic or antifugal medication which may limit how
        effective Hana is. You should use another form of contraception during
        your course of treatment and for 28 days after you've finished taking
        the medication, such as condoms.
      </>
    );
  }

  return (
    <>
      <Typography variant={"h2"} className={classes.header}>
        Important information about your order
      </Typography>
      {!!specialWarnings.length && (
        <Message
          className={classes.specialWarningsMessage}
          message={specialWarnings.map((message, k) => (
            <React.Fragment key={k}>
              {message}
              {k !== specialWarnings.length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </React.Fragment>
          ))}
        />
      )}
      {!!contentBlocks &&
        contentBlocks.map(({ title, content }, k) => (
          <React.Fragment key={k}>
            <Typography
              className={classes.title}
              variant={"h3"}
              component={"h3"}
            >
              {title}
            </Typography>
            <Typography className={classes.content}>{content}</Typography>
          </React.Fragment>
        ))}
    </>
  );
};

export default ImportantInfo;
