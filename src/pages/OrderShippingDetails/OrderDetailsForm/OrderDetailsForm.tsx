/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { pick, omit, isEqual } from "lodash";
import {
  Form,
  InputField,
  Field,
  Input,
  Typography,
  RadioSelect,
  HelperInfoBox,
  PackageIcon,
  Divider,
  Spacing,
} from "@welldigital/components";
import AddressLookupByPostcode from "pages/OrderShippingDetails/AddressLookupByPostcode";
import AppModal from "components/AppModal";
import {
  FormValues,
  Scenarios,
  FormStep,
} from "pages/OrderShippingDetails/types";
import FormFields from "pages/OrderShippingDetails/FormFields";
import { FormActions } from "pages/OrderShippingDetails/FormActions";
import { useAuthentication } from "@welldigital/ui-common/Authentication";
import {
  getCustomerDetailsFromValues,
  redirectToPINConfirmationPage,
  validateRequiredAddress,
  validateMaxLength,
} from "pages/OrderShippingDetails/helpers";
import { OrderCustomerDetails } from "app/store/reducer/order/types";
import { CUSTOMER_TYPES } from "app/store/reducer/order/constants";
import { useRegisterAccount } from "pages/OrderShippingDetails/hooks";
import {
  useCustomer,
  useSetCustomer,
  useProduct,
  useSetProduct,
} from "app/store/hooks";
import { analytics } from "@welldigital/ui-common";
import { eventsBuilder } from "utils/events";
import { useStyles } from "pages/OrderShippingDetails/styles";
import { Pack } from "app/store/reducer/online/types";
import { Grid, Link } from "@material-ui/core";

type Delivery = NonNullable<Pack["delivery"]>;
type DeliveryType = Delivery["type"];

export type OrderDetailsFormProps = {
  initialValues: Partial<FormValues>;
  scenarios: Scenarios;
  onlineServicesUser: Partial<OrderCustomerDetails>;
  handleFormError: (message: string) => void;
  setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isBusy: boolean;
  isAuthenticated: boolean;
  setShouldSuppressDeliveryInfo: React.Dispatch<React.SetStateAction<boolean>>;
  shouldSkipAccountDetailsStep?: boolean;
};

export const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({
  initialValues,
  scenarios,
  onlineServicesUser,
  handleFormError,
  setIsPageLoading,
  isBusy,
  isAuthenticated,
  setShouldSuppressDeliveryInfo,
  shouldSkipAccountDetailsStep,
}) => {
  const [formValues, setFormValues] = useState<Partial<FormValues>>({});
  const [currentFormStep, setCurrentFormStep] = useState<FormStep>(
    FormStep.ACCOUNT_DETAILS
  );
  const [existingUserValues, setExistingUserValues] = useState<
    Partial<FormValues>
  >({});
  const [isAddressConfirmationModalOpen, setIsAddressConfirmationModalOpen] =
    useState(false);

  const history = useHistory();
  const classes = useStyles();
  const product = useProduct();
  const setProduct = useSetProduct();
  const customer = useCustomer();
  const setCustomer = useSetCustomer();
  const { email } = useAuthentication();
  const registerAccount = useRegisterAccount();

  const isSubscription = !!product?.subscription;
  const customerType = customer?.customerType;
  const deliveryType = product?.packs[0].delivery?.type;

  const {
    isAuthenticatedAndHasAccount,
    isAuthenticatedAndRequestsAccount,
    isNotAuthenticatedAndRequestsAccount,
    isNotAuthenticatedAndDoesNotRequestAccount,
  } = scenarios;

  const toggleModalState = useCallback(() => {
    if (!isAddressConfirmationModalOpen) {
      analytics.trackEvent({
        flow: "ed",
        event: eventsBuilder.orderDetailsForm.existingUser.addressChangeModal,
      });
    }
    setIsAddressConfirmationModalOpen((prevState) => !prevState);
  }, []);

  const handleAddressChangeConfirmation = useCallback(() => {
    setCustomer({
      customerType,
      customerDetails: getCustomerDetailsFromValues(existingUserValues),
    });
    analytics.trackEvent({
      flow: "ed",
      event: eventsBuilder.orderDetailsForm.existingUser.addressChangeSubmit,
    });
    history.push("/order/ed/payment");
    toggleModalState();
  }, [
    existingUserValues,
    customerType,
    product,
    setCustomer,
    history,
    toggleModalState,
  ]);

  const handleSubmit = useCallback(
    (values: typeof initialValues) => {
      if (isAuthenticatedAndRequestsAccount) {
        setCustomer({
          customerType,
          customerDetails: getCustomerDetailsFromValues(values),
        });
        analytics.trackEvent({
          flow: "ed",
          event:
            eventsBuilder.orderDetailsForm.existingUser
              .deliveryDetailsSubmitted,
        });
        registerAccount({
          values: { ...omit(values, ["agreeTerms"]) },
          setIsPageLoading,
          handleFormError,
          redirect: "/order/ed/payment",
          isCheckoutFlow: true,
        });
        return;
      }

      if (isAuthenticatedAndHasAccount) {
        const existingAddress: Partial<OrderCustomerDetails> = {
          addressLine1: onlineServicesUser.addressLine1,
          addressLine2: onlineServicesUser.addressLine2,
          city: onlineServicesUser.city,
          postcode: onlineServicesUser.postcode,
        };
        const formAddress = pick(values, Object.keys(existingAddress));
        if (isEqual(existingAddress, formAddress)) {
          setCustomer({
            customerType,
            customerDetails: getCustomerDetailsFromValues({
              ...onlineServicesUser,
              ...values,
            }),
          });
          history.push("/order/ed/payment");
        } else {
          const finalFormValues: Partial<FormValues> = {
            ...onlineServicesUser,
            ...omit(values, ["agreeTerms"]),
            email,
          };
          setExistingUserValues(finalFormValues);
          toggleModalState();
        }
        analytics.trackEvent({
          flow: "ed",
          event:
            eventsBuilder.orderDetailsForm.existingUser
              .deliveryDetailsSubmitted,
          metadata: {
            productName: product?.name,
            productSku: product?.packs[0].sku,
            packSize: product?.packs[0].itemsPerPack,
          },
        });
        return;
      }

      if (isNotAuthenticatedAndRequestsAccount) {
        setCustomer({
          customerType: CUSTOMER_TYPES.PENDING,
          customerDetails: getCustomerDetailsFromValues(values),
        });
        analytics.trackEvent({
          flow: "ed",
          event: eventsBuilder.orderDetailsForm.newUser.accountDetailsSubmitted,
        });
        redirectToPINConfirmationPage(values.email!);
        return;
      }

      if (isNotAuthenticatedAndDoesNotRequestAccount) {
        setCustomer({
          customerType,
          customerDetails: getCustomerDetailsFromValues(values),
        });
        analytics.trackEvent({
          flow: "ed",
          event: eventsBuilder.orderDetailsForm.newUser.accountDetailsSubmitted,
          metadata: {
            productName: product?.name,
            productSku: product?.packs[0].sku,
            packSize: product?.packs[0].itemsPerPack,
          },
        });
        history.push("/order/ed/payment");
        return;
      }
    },
    [
      initialValues,
      isAuthenticatedAndRequestsAccount,
      isAuthenticatedAndHasAccount,
      isNotAuthenticatedAndRequestsAccount,
      isNotAuthenticatedAndDoesNotRequestAccount,
      toggleModalState,
      email,
      onlineServicesUser,
      history,
      registerAccount,
      setCustomer,
      product,
      customerType,
      handleFormError,
      setIsPageLoading,
    ]
  );

  const handleCompleteAccountFormStep = (values: typeof initialValues) => {
    setFormValues((prev) => ({ ...prev, ...values }));
    setCurrentFormStep(FormStep.DELIVERY_DETAILS);
    setShouldSuppressDeliveryInfo(false);
    handleFormError("");
  };

  const handleCompleteAddressFormStep = (values: typeof initialValues) => {
    handleSubmit({ ...formValues, ...values });
  };

  const handlePostcodeLookup = (success: boolean, errorMessage?: string) => {
    analytics.trackEvent({
      flow: "ed",
      event: success
        ? eventsBuilder.orderDetailsForm[
            isAuthenticated ? "existingUser" : "newUser"
          ].postcodeLookup
        : eventsBuilder.orderDetailsForm[
            isAuthenticated ? "existingUser" : "newUser"
          ].postcodeFailed,
      metadata: {
        ...(!success && errorMessage ? { error: errorMessage } : {}),
      },
    });
  };

  const updateDelivery = ({
    type,
    price,
  }: {
    type: DeliveryType;
    price: number;
  }) => {
    product &&
      setProduct({
        ...product,
        packs: [
          {
            ...product.packs[0],
            delivery: {
              type,
              price,
            },
          },
        ],
      });
  };

  const renderFormByStep = () => {
    if (
      currentFormStep === FormStep.DELIVERY_DETAILS ||
      shouldSkipAccountDetailsStep
    ) {
      return (
        <Form
          fullWidth
          manualReset
          initialValues={initialValues}
          onSubmit={(values) => handleCompleteAddressFormStep(values)}
          spacingAfter={3}
        >
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
            handlePostcodeSearch={handlePostcodeLookup}
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

          <Typography variant={"h2"} spacingAfter={3} className={classes.title}>
            Delivery options
          </Typography>
          <Typography spacingAfter={4}>
            Please choose a delivery option.
          </Typography>

          <RadioSelect
            value={deliveryType}
            onChange={(type) => updateDelivery({ type, price: 0 })}
            options={[
              {
                id: "FREE" as DeliveryType,
                label: "Standard delivery",
                description: "2-4 working days",
                extra: <span>Free</span>,
              },
            ]}
            className={classes.radio}
            variant={"contained"}
            fullWidth
          />

          <RadioSelect
            value={deliveryType}
            onChange={(type) => updateDelivery({ type, price: 3.99 })}
            options={[
              {
                id: "PREMIUM" as DeliveryType,
                label: "Next day delivery",
                description: "Delivered next working day*",
                extra: <span>£3.99</span>,
              },
            ]}
            className={classes.radio}
            variant={"contained"}
            fullWidth
          />

          <div className={classes.deliveryMoreInfoContainer}>
            <HelperInfoBox
              data-testid={"moreInfo"}
              title={"About our delivery options"}
              variant={"simplified"}
              classes={{ collapseTrigger: classes.deliveryMoreInfoButton }}
            >
              <Typography spacingAfter={2}>
                <span className={classes.textBold}>
                  Standard delivery usually takes 2-4 working days
                </span>
                , however times may vary in busy periods.
              </Typography>
              <Typography spacingAfter={2}>
                <span className={classes.textBold}>
                  Next day delivery applies to your first order only.{` `}
                </span>
                If you are starting a monthly subscription, future orders will
                be sent with free standard delivery.
              </Typography>
              <Typography spacingAfter={2}>
                *Our next day delivery service is provided by Royal Mail. Orders
                must be placed before 4pm on weekdays. If you’re ordering on a
                Saturday your order must be placed before 11am and your items
                will be delivered the next working day. If you place an order
                after the cut-off times, your items will be delivered within two
                working days.
              </Typography>

              <Grid container spacing={2}>
                <Grid item>
                  <PackageIcon fontSize={"small"} />
                </Grid>
                <Grid item>
                  <Typography component={"span"}>
                    Discreet unbranded packaging
                  </Typography>
                </Grid>
              </Grid>
            </HelperInfoBox>
          </div>
          <Divider spacingAfter={4} />
          <FormActions />

          <Spacing spacing={2} />

          <Typography>
            <span className={classes.disclaimer}>
              By continuing you agree to the{" "}
              <Link
                className={classes.link}
                href={
                  "https://www.well.co.uk/about-us/policies/terms-and-conditions"
                }
              >
                Terms and Conditions
              </Link>
              {isSubscription ? ", " : " and "}
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
          </Typography>
        </Form>
      );
    } else if (currentFormStep === FormStep.ACCOUNT_DETAILS) {
      return (
        <Form
          fullWidth
          manualReset
          initialValues={initialValues}
          onSubmit={(values) => handleCompleteAccountFormStep(values)}
          spacingAfter={3}
        >
          <FormFields
            formValues={initialValues}
            // eslint-disable-next-line react/jsx-no-bind
            handlePostcodeSearch={handlePostcodeLookup}
            handleFormError={handleFormError}
            isBusy={isBusy}
            isSubscription={isSubscription}
            isAuthenticated={isAuthenticated}
            isGuest={isNotAuthenticatedAndDoesNotRequestAccount}
          />
          <FormActions />
        </Form>
      );
    }
  };

  useEffect(() => {
    if (
      currentFormStep === FormStep.DELIVERY_DETAILS ||
      shouldSkipAccountDetailsStep
    ) {
      setShouldSuppressDeliveryInfo(false);
    }
  }, [
    currentFormStep,
    shouldSkipAccountDetailsStep,
    setShouldSuppressDeliveryInfo,
  ]);

  return (
    <>
      {renderFormByStep()}
      {isAddressConfirmationModalOpen && (
        <AppModal
          isOpen={isAddressConfirmationModalOpen}
          title={"Change your delivery address"}
          onSuccess={handleAddressChangeConfirmation}
          onBack={toggleModalState}
        >
          <Typography align={"center"} spacingAfter={1} color={"inherit"}>
            It looks like you’re using a different delivery address than the one
            saved on your account. Please be aware that the new address will
            only be applied to this order. If you’ve ordered anything else, your
            items will be sent to your default delivery address
          </Typography>
          <Typography align={"center"} spacingAfter={6} color={"inherit"}>
            Would you like to continue?
          </Typography>
        </AppModal>
      )}
    </>
  );
};

export default OrderDetailsForm;
