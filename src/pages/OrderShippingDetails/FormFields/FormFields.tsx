import React from "react";
import { addYears, endOfToday } from "date-fns";
import { Link } from "@material-ui/core";
import {
  InputField,
  Field,
  Input,
  DatePickerField,
  CheckboxField,
  Typography,
} from "@welldigital/components";
import { useFormContext } from "hooks";
import AddressLookupByPostcode from "pages/OrderShippingDetails/AddressLookupByPostcode";
import AddressLookupGP from "pages/OrderShippingDetails/AddressLookupGP";
import { FormValues } from "pages/OrderShippingDetails/types";
import {
  validatePhone,
  validateName,
  validateRequiredAddress,
  validateMaxLength,
} from "pages/OrderShippingDetails/helpers";
import { useStyles } from "pages/OrderShippingDetails/styles";

const minAgeInYears = 18;
const maxAgeInYears = 120;

const maxSelectableDate = addYears(endOfToday(), -minAgeInYears);
const minSelectableDate = addYears(endOfToday(), -maxAgeInYears);

type FieldNames = Array<keyof FormValues>;

interface Props {
  formValues: Partial<FormValues>;
  isBusy: boolean;
  handleFormError: (message: string) => void;
  handlePostcodeSearch?: (success: boolean) => void;
  isSubscription: boolean;
  isAuthenticated?: boolean;
  isGuest?: boolean;
  shouldRenderAddress?: boolean;
}

export const FormFields: React.FC<Props> = ({
  formValues,
  isBusy,
  handleFormError,
  handlePostcodeSearch = () => {},
  isSubscription,
  isAuthenticated,
  isGuest,
  shouldRenderAddress,
}) => {
  const { form } = useFormContext();
  const classes = useStyles();

  const shouldRenderName = (["firstName", "lastName"] as FieldNames).every(
    (key) => key in formValues
  );

  const shouldRenderDateOfBirth = (["dob"] as FieldNames).every(
    (key) => key in formValues
  );

  const shouldRenderContactInfo = (["email", "phone"] as FieldNames).every(
    (key) => key in formValues
  );

  const shouldRenderGpDetails = (["gpDetails"] as FieldNames).every(
    (key) => key in formValues
  );

  return (
    <>
      {shouldRenderName && (
        <>
          <Typography
            variant={"subtitle1"}
            className={classes.subTitle}
            spacingAfter={3}
          >
            Your name
          </Typography>
          <Field
            name={"firstName"}
            label={"Name"}
            component={Input}
            validate={validateName}
            disabled={isBusy}
            defaultValue={""}
          />
          <Field
            name={"lastName"}
            label={"Surname"}
            component={Input}
            validate={validateName}
            disabled={isBusy}
            defaultValue={""}
          />
        </>
      )}

      {shouldRenderDateOfBirth && (
        <>
          <Typography
            variant={"subtitle1"}
            className={classes.subTitle}
            spacingAfter={3}
          >
            Your date of birth
          </Typography>
          <DatePickerField
            required
            disableFuture
            maxDate={maxSelectableDate}
            minDate={minSelectableDate}
            name={"dob"}
            label={"Birth date"}
            validationMessages={{
              required: "Enter your birth date",
              maxDate: "You need to be at least 18 years old to register",
              minDate: "Please enter a valid birth date",
            }}
            disabled={isBusy}
          />
        </>
      )}

      {shouldRenderAddress && (
        <>
          <Typography
            variant={"subtitle1"}
            className={classes.subTitle}
            spacingAfter={3}
          >
            Your address
          </Typography>
          <AddressLookupByPostcode
            isDisabled={isBusy}
            onSearchError={handleFormError}
            handlePostcodeSearch={handlePostcodeSearch}
          />
          <Field
            required
            name={"addressLine1"}
            label={"Delivery address line 1"}
            component={Input}
            validate={validateRequiredAddress}
            disabled={isBusy}
            defaultValue={""}
          />
          <Field
            required
            name={"addressLine2"}
            label={"Delivery address line 2"}
            component={Input}
            validate={validateMaxLength}
            disabled={isBusy}
            defaultValue={""}
          />
          <InputField
            required
            name={"city"}
            label={"City"}
            validationMessages={{ required: "Enter a city" }}
            disabled={isBusy}
          />
        </>
      )}

      {shouldRenderContactInfo && (
        <>
          <Typography
            variant={"subtitle1"}
            className={classes.subTitle}
            spacingAfter={3}
          >
            Your contact information
          </Typography>
          <Typography className={classes.paragraph} spacingAfter={3}>
            {isGuest
              ? "We’ll email your order confirmation to the email address you provide. We need your phone number to contact you if anything changes with your order."
              : "Please enter the email address you want to use to sign in to your account. We need your phone number to contact you if anything changes with your order."}
          </Typography>
          <InputField
            required
            email
            name={"email"}
            label={"Email"}
            validationMessages={{
              required: "Enter your email",
              email: "Enter a valid email address",
            }}
            disabled={isBusy || Boolean(isAuthenticated)}
          />
          <Field
            required
            name={"phone"}
            label={"Phone number"}
            component={Input}
            validate={validatePhone}
            disabled={isBusy}
            defaultValue={""}
          />
        </>
      )}

      {shouldRenderGpDetails && (
        <>
          <Typography
            variant={"subtitle1"}
            className={classes.subTitle}
            spacingAfter={3}
          >
            GP details
          </Typography>
          <AddressLookupGP onSearchError={handleFormError} />
        </>
      )}

      <CheckboxField
        required
        spacingAfter={2}
        name={"agreeTerms"}
        validationMessages={{
          required: "You must agree with the terms and conditions",
        }}
        label={
          <span
            className={form.errors.agreeTerms?.message ?? classes.disclaimer}
          >
            I agree with{" "}
            <Link
              className={classes.link}
              href={
                "https://www.well.co.uk/about-us/policies/terms-and-conditions"
              }
            >
              Terms and Conditions
            </Link>
            {isSubscription ? ", " : " and "}
            {/* TODO: Add link / route */}
            <Link
              className={classes.link}
              href={"https://www.well.co.uk/about-us/policies/privacy"}
            >
              Privacy Policy
            </Link>
            {isSubscription && (
              <>
                <span>{` and `}</span>
                <Link
                  className={classes.link}
                  href={"/online/terms-and-conditions"}
                  target={"_blank"}
                >
                  Subscription Policy
                </Link>
              </>
            )}
          </span>
        }
        disabled={isBusy}
      />
      <CheckboxField
        name={"agreeMarketing"}
        spacingAfter={4}
        label={
          <span className={classes.disclaimer}>
            Optional: I would like to receive health advice and offers from Well
            by email. (You can change your marketing preferences at any time)
          </span>
        }
        disabled={isBusy}
      />
    </>
  );
};

export default FormFields;
