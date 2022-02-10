import { OnlineQuestion } from "../app/store/reducer/online/types";
import { HanaTripettoQuestions } from "../constants/hanaTripettoQuestions";

export type Hana1315EmailDetails = {
  age: number;
  phoneNumber: string;
  availableTime: string;
  email: string;
};

export function isHana1315Flow(consultation: OnlineQuestion[]): boolean {
  if (!consultation[0]) return false;
  return (
    consultation[0].question === "How old are you?" &&
    ["13", "14", "15"].includes(consultation[0].answer)
  );
}

export function getHana1315EmailDetails(
  consultation: OnlineQuestion[]
): Hana1315EmailDetails {
  return consultation.reduce((details, { question, answer }) => {
    if (question === HanaTripettoQuestions.q1) {
      details.age = parseInt(answer);
    } else if (question === HanaTripettoQuestions.phone) {
      details.phoneNumber = answer;
    } else if (question === HanaTripettoQuestions.contactTime) {
      details.availableTime = answer;
    } else if (question === HanaTripettoQuestions.email) {
      details.email = answer;
    }
    return details;
  }, {} as Partial<Hana1315EmailDetails>) as Hana1315EmailDetails;
}
