import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Theme,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Card,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CustomerDetails,
  DeliveryDetails,
} from "app/store/reducer/checkout/types";
import { emptyDeliveryDetails } from "app/store/reducer/checkout/constants";
import { PostcodeLookupAddress } from "app/store/reducer/shared";
import AddressLookUp from "../../../components/AddressLookUp";
import { POSTCODE_PATTERN } from "../../../utils/regex/postcode";
import capitalize from "lodash/capitalize";

const Schema = yup.object().shape({
  firstName: yup.string().trim().required("Enter your first name"),
  lastName: yup.string().trim().required("Enter your last name"),
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

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    margin: "0 auto",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
    border: `1px solid ${theme.palette.divider}`,
  },
  inputMargin: {
    margin: theme.spacing(2, 0),
  },
  paddingBottom: {
    paddingBottom: theme.spacing(2),
  },
  marginTopBottom: {
    marginBottom: theme.spacing(3),

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0),
    },
  },
  marginTop: {
    marginTop: theme.spacing(4),
  },
  input: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  pageMargin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
    },
  },
  card: {
    border: "none",
    background: "none",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
      padding: "0px",
    },
  },
  checkboxText: {
    color: "#65727D",
    marginBottom: theme.spacing(3),
  },
  textLink: {
    textDecoration: "none",
    color: "#0061F2",
  },
  hidden: { display: "none" },
}));

export interface DeliveryDetailsFormProps {
  onSubmit(data: DeliveryDetails): void;
  customerDetails: CustomerDetails;
  fetchAddressesByPostcode(postcode: string): void;
  postCodeLookUpAddresses: PostcodeLookupAddress[];
}

interface DeliveryDetailsFormData {
  title: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
}

const DeliveryDetailsForm: React.FC<DeliveryDetailsFormProps> = (props) => {
  const {
    onSubmit,
    postCodeLookUpAddresses,
    fetchAddressesByPostcode,
    customerDetails,
  } = props;
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [useCustomerDetails, setUseCustomerDetails] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    triggerValidation,
    getValues,
  } = useForm({
    validationSchema: Schema,
    defaultValues: emptyDeliveryDetails,
    submitFocusError: false,
  });

  useEffect(() => {
    let initialDeliveryDetails = emptyDeliveryDetails;
    if (useCustomerDetails) {
      initialDeliveryDetails.title = customerDetails.title;
      initialDeliveryDetails.firstName = customerDetails.firstName;
      initialDeliveryDetails.lastName = customerDetails.lastName;
      initialDeliveryDetails.line1 = customerDetails.line1;
      initialDeliveryDetails.line2 = customerDetails.line2;
      initialDeliveryDetails.city = customerDetails.city;
      initialDeliveryDetails.postcode = customerDetails.postcode;
      reset(initialDeliveryDetails);
    } else {
      reset(emptyDeliveryDetails);
    }
  }, [customerDetails, reset, useCustomerDetails]);

  const handleTitleChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string;
        value: unknown;
      }>
    ) => {
      setValue([{ title: event.target.value as string }]);
      triggerValidation("title");
    },
    [setValue, triggerValidation]
  );

  const setAddressFromAddressLookUp = useCallback(
    (address: PostcodeLookupAddress) => {
      setValue([
        { postcode: address.postcode },
        { line1: address.line1 },
        { line2: address.line2 },
        { city: address.city },
      ]);
      triggerValidation("postcode");
      triggerValidation("line1");
      triggerValidation("line2");
      triggerValidation("city");
    },
    [setValue, triggerValidation]
  );

  const DeliveryDetailsFormOnSubmit = useCallback(
    (data: DeliveryDetailsFormData) => {
      onSubmit({ ...data });
    },
    [onSubmit]
  );

  const checkUseCustomerDetails = (event: any) => {
    setUseCustomerDetails(event.target.checked);
  };

  const validateFormOnchange = useCallback(() => {}, []);

  return (
    <Container maxWidth={"sm"} className={classes.pageMargin}>
      <Card className={classes.card}>
        <Typography variant={"h3"} className={classes.marginTopBottom}>
          Delivery details
        </Typography>
        <Checkbox
          onChange={checkUseCustomerDetails}
          style={{
            paddingLeft: "0px",
          }}
          inputProps={{
            // @ts-ignore
            "data-testid": "DeliveryDetailsForm/checkbox",
          }}
        />
        <Typography variant={"caption"} className={classes.checkboxText}>
          Use same details ({capitalize(customerDetails.firstName)}{" "}
          {capitalize(customerDetails.lastName)},{" "}
          {customerDetails.postcode.toUpperCase()})
        </Typography>
        <form
          id={"DeliveryDetails-details-form"}
          noValidate
          autoComplete={"off"}
          onChange={handleSubmit(validateFormOnchange)}
          onSubmit={handleSubmit(DeliveryDetailsFormOnSubmit)}
        >
          <div className={classes.paddingBottom}>
            <FormControl
              variant={"outlined"}
              className={classes.input}
              error={!!errors.title && !!errors.title.message}
            >
              <InputLabel
                htmlFor={"outlined-title-select"}
                style={{ backgroundColor: "white" }}
              >
                Title
              </InputLabel>
              <Select
                key={"DeliveryDetailsForm/title-select"}
                value={getValues("title")}
                onChange={handleTitleChange}
                inputRef={register}
                inputProps={{
                  name: "title",
                  "data-testid": "DeliveryDetailsForm/title-select",
                  id: "outlined-title-select",
                }}
              >
                {["Mr", "Mrs", "Miss", "Ms", "Mx", "Sir", "Dr"].map(
                  (title, index) => {
                    return (
                      <MenuItem key={`${title}-${index}`} value={title}>
                        {title}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
              {errors.title && errors.title.message && (
                <FormHelperText>{errors.title.message}</FormHelperText>
              )}
            </FormControl>

            <TextField
              name={"title"}
              inputRef={register}
              className={classes.hidden}
            />
          </div>

          <TextField
            variant={"outlined"}
            fullWidth
            label={"First name"}
            name={"firstName"}
            error={!!errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "DeliveryDetailsForm/firstName",
            }}
          />

          <TextField
            className={classes.inputMargin}
            label={"Last name"}
            variant={"outlined"}
            fullWidth
            name={"lastName"}
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "lastName",
            }}
          />

          <AddressLookUp
            postCodeLookUpAddresses={postCodeLookUpAddresses}
            fetchAddressesByPostcode={fetchAddressesByPostcode}
            setAddress={setAddressFromAddressLookUp}
            error={errors?.postcode?.message?.toString() || ""}
            inputRef={register}
          />

          <TextField
            className={classes.input}
            label={"Address line 1"}
            variant={"outlined"}
            fullWidth
            name={"line1"}
            error={!!errors.line1}
            helperText={errors.line1 && errors.line1.message}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "line1",
            }}
          />
          <TextField
            className={classes.input}
            label={"Address line 2 (optional)"}
            variant={"outlined"}
            fullWidth
            name={"line2"}
            error={!!errors.line2}
            helperText={errors.line2 && errors.line2.message}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "line2",
            }}
          />
          <TextField
            className={classes.input}
            label={"City"}
            variant={"outlined"}
            fullWidth
            name={"city"}
            error={!!errors.city}
            helperText={errors.city && errors.city.message}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "DeliveryDetailsForm/city",
            }}
          />

          <Button
            type={"submit"}
            color={"primary"}
            variant={"contained"}
            data-testid={"DeliveryDetailsForm/next-button"}
            className={classes.input}
          >
            Next
          </Button>
        </form>
        <div className={classes.input}>
          <Typography variant={"caption"}>
            By entering your details and payment information, you are agreeing
            to our{" "}
            <a
              className={classes.textLink}
              href={
                "https://www.well.co.uk/about-us/policies/shop-terms-and-conditions"
              }
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Terms and Conditions
            </a>
            .
          </Typography>
        </div>
      </Card>
    </Container>
  );
};

export default DeliveryDetailsForm;
