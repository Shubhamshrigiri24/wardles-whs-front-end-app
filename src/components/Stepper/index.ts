import { StepperSteps } from "./types";

export { default, Stepper } from "./Stepper";
export * from "./types";

export const ALL_STEPS = [
  StepperSteps.CONSULTATION,
  StepperSteps.PRODUCT_SELECTION,
  StepperSteps.PERSONAL_DETAILS,
  StepperSteps.DELIVERY_DETAILS,
  StepperSteps.PAYMENT_DETAILS,
];
