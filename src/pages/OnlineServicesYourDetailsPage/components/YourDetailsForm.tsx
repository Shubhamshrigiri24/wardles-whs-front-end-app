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
import { mainSchema } from "./schemas";
import { CustomerDetails } from "app/store/reducer/checkout/types";
import { emptyCustomerDetails } from "app/store/reducer/checkout/constants";
import { PostcodeLookupAddress } from "../../../app/store/reducer/shared";
import AddressLookUp from "../../../components/AddressLookUp";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    padding: theme.breakpoints.down("sm") ? "0px" : theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
  text: {
    color: "#445461",
    margin: theme.spacing(3, 0),
  },
  marginInput: {
    margin: theme.spacing(2, 0),
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  paddingBottom: {
    paddingBottom: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(4),
  },
  inputMarginSmall: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  input: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
  pageMargin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(15),
  },
  card: {
    width: theme.breakpoints.down("sm") ? "100%" : "580px",
    border: "none",
    background: "none",
  },
  checkboxText: {
    color: "#65727D",
    marginBottom: theme.spacing(3),
  },
  textLink: {
    textDecoration: "none",
    color: "#0061F2",
  },
  checkboxContainer: {
    display: "flex",
    marginTop: theme.spacing(5),
  },
  titleSelect: {
    width: "170px",
  },
  hidden: { display: "none" },
  nextButton: {
    width: "100%",
    backgroundColor: "#233645",
    marginTop: theme.spacing(3),
  },
}));

export interface YourDetailsFormProps {
  onSubmit(data: CustomerDetails): void;
  fetchAddressesByPostcode(postcode: string): void;
  postCodeLookUpAddresses: PostcodeLookupAddress[];
}

interface YourDetailsFormData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
}

const YourDetailsForm: React.FC<YourDetailsFormProps> = (props) => {
  const { onSubmit, postCodeLookUpAddresses, fetchAddressesByPostcode } = props;
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [allowMarketing, setAllowMarketing] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    triggerValidation,
    getValues,
  } = useForm({
    validationSchema: mainSchema,
    defaultValues: emptyCustomerDetails,
    submitFocusError: true,
  });

  useEffect(() => {
    reset(emptyCustomerDetails);
  }, [reset]);

  const handleTitleChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string;
        value: unknown;
      }>
    ) => {
      const titleValue = event.target.value as string;
      setValue([{ title: titleValue }]);
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

  const YourDetailsFormOnSubmit = useCallback(
    (data: YourDetailsFormData) => {
      onSubmit({ ...data, allowMarketing });
    },
    [onSubmit, allowMarketing]
  );

  const checkReceiveOffers = useCallback(
    (event: any) => {
      setAllowMarketing(event.target.checked);
    },
    [setAllowMarketing]
  );

  return (
    <Container maxWidth={"sm"} className={classes.pageMargin}>
      <Card className={classes.card}>
        <Typography variant={"h3"}>{"Your details"}</Typography>
        <form
          id={"YourDetails-details-form"}
          noValidate
          autoComplete={"off"}
          onSubmit={handleSubmit(YourDetailsFormOnSubmit)}
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
                className={classes.titleSelect}
                key={"YourDetailsForm/title-select"}
                value={getValues("title")}
                onChange={handleTitleChange}
                inputRef={register}
                inputProps={{
                  name: "title",
                  "data-testid": "YourDetailsForm/title-select",
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
              "data-testid": "YourDetailsForm/firstName",
            }}
          />

          <TextField
            className={classes.inputMarginSmall}
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
              "data-testid": "YourDetailsForm/lastName",
            }}
          />

          <TextField
            className={classes.inputMarginSmall}
            label={"Email"}
            variant={"outlined"}
            fullWidth
            name={"email"}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "YourDetailsForm/email",
            }}
          />

          <TextField
            className={classes.marginInput}
            label={"Phone number"}
            variant={"outlined"}
            fullWidth
            name={"phone"}
            error={!!errors.phone}
            helperText={errors.phone && errors.phone.message}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "YourDetailsForm/phone",
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
              "data-testid": "YourDetailsForm/line1",
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
              "data-testid": "YourDetailsForm/line2",
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
              "data-testid": "YourDetailsForm/city",
            }}
          />
          <div className={classes.checkboxContainer}>
            <div>
              <Checkbox
                onChange={checkReceiveOffers}
                style={{
                  paddingLeft: "0px",
                }}
                inputProps={{
                  // @ts-ignore
                  "data-testid": "YourDetailsForm/checkbox",
                }}
              />
            </div>
            <div>
              <Typography variant={"caption"} className={classes.checkboxText}>
                Optional: I would like to receive health advice and offers from
                Well by email. (You can change your marketing preferences at any
                time)
              </Typography>
            </div>
          </div>

          <Button
            type={"submit"}
            color={"primary"}
            variant={"contained"}
            data-testid={"YourDetailsForm/next-button"}
            className={classes.nextButton}
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

export default YourDetailsForm;
