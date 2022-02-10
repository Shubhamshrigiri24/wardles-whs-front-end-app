import * as yup from "yup";
import { POSTCODE_PATTERN } from "../../../utils/regex/postcode";

export const mainSchema = yup.object().shape({
  firstName: yup.string().trim().required("Enter your first name"),
  lastName: yup.string().trim().required("Enter your last name"),
  email: yup.string().trim().required("Enter your email address"),
  phone: yup
    .string()
    .trim()
    .required("Enter a valid telephone number")
    .matches(/([0-9]{10,11}|^$)/, "Enter a valid telephone number"),
  line1: yup
    .string()
    .trim()
    .required("Enter the first line of your delivery address"),
  line2: yup.string().trim(),
  city: yup.string().trim().required("Enter a city"),
  postcode: yup
    .string()
    .trim()
    .required("Enter a valid postcode")
    .matches(POSTCODE_PATTERN, "Enter a valid postcode"),
  title: yup.string().trim().required("Enter your title"),
});
