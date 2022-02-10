import React from "react";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import { useStyles } from "./styles";

export type StepperProps = {
  steps: string[];
  currentStep: string;
  ignoreCurrentStep?: boolean;
  classes?: { container: string };
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  ignoreCurrentStep = false,
  classes: overwriteClasses,
}) => {
  const classes = useStyles();

  const currentStepIndex = steps.indexOf(currentStep);
  const activeSteps = steps.slice(0, currentStepIndex);

  return (
    <div className={clsx(classes.container, overwriteClasses?.container)}>
      <div>
        <Grid container spacing={2}>
          {steps.map((step, index) => (
            <Grid item key={step} className={classes.step}>
              <span className={classes.stepNumber}>
                <div
                  className={clsx(
                    classes.stepNumberInner,
                    (activeSteps.includes(step) ||
                      (step === currentStep && !ignoreCurrentStep)) &&
                      classes.stepActive
                  )}
                >
                  {index + 1}
                </div>
              </span>
              <span
                className={clsx(
                  classes.stepName,
                  activeSteps.includes(step) && classes.stepActive
                )}
              >
                {step}
              </span>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Stepper;
