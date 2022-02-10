import { useContext } from "react";
import { FormContext, FormContextValue } from "@welldigital/components";

/**
 * @description Grants access to the context used by Form (welldigital/components)
 */

export const useFormContext = (): FormContextValue => {
  return useContext<FormContextValue>(FormContext);
};
