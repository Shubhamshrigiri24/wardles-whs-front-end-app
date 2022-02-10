export default {
  online: {
    consultation: {
      started: "Consultation started", // as the consultation is being loaded
      answeringQuestion: `Consultation answering question`, // when a user begins answering a question
      completed: "Consultation complete", // when the consultation is finished (when tripetto starts showing the epilogue)
    },
    productSelection: "Select product",
  },
  order: {
    tapOnSubscription: "tap on subscription",
    tapOnNoSubscription: "tap on no subscription",
    subscriptionMoreInfo: "tap on subscription more info",
    selectProductWithSubscription:
      "tap on continue to checkout with subscription",
    selectProductWithoutSubscription:
      "tap on continue to checkout one off purchase",
    deliveryDetails: "delivery details",
    paymentSuccess: "payment complete",
    confirmation: "confirmation complete",
  },
  subscription: {
    viewHealthStatusConfirmation: "view health status confirmation",
    submitHealthStatusConfirmation: "submit health status confirmation",
    cancel: "cancel subscription",
  },
  registration: {
    customer: "customer registration",
  },
};

export const eventsBuilder = {
  consultation: {
    start: "Started consultation",
    answer: "Question answered",
    ineligible: "Ineligible",
    complete: "Consultation Complete",
    referral: "Pharmacist Referral",
    referralSubmited: "Pharmacist Referral Submited",
    referralLink: "Pharmacist Referral Link",
  },
  productSelect: {
    productCardSelectButton: (product?: any) => `${product} selected`,
    packSelected: (
      productName?: string,
      productStrength?: string,
      productPackSize?: string,
      isSubscription?: boolean
    ) =>
      `${productName} ${productStrength}mg ${productPackSize} ${
        isSubscription ? "with" : "without"
      } subscription selected`,
    seeMoreAboutSubscription: "Clicked subscription info",
    choseProduct: "Chose product",
    choseProductWithSubscription: "Chose product with subscription",
  },
  basket: {
    discountApplied: "Discount Code Applied",
    discountFailed: "Discount Code Failed",
  },
  loginOptions: {
    signIn: "Chose Sign In",
    signInWithSub: "Chose Sign In With Subscription",
    signInComplete: "Sign in complete",
    customerLogin: "Services: customer login",
    register: "Chose Register",
    registerWithSub: "Chose Register With Subscription",
    guestCheckout: "Chose guest checkout",
    guestCheckoutWithSub: "Chose guest checkout with subscription",
    guestShowModal: "Guest checkout: Show subscription modal",
    guestRemoveSub: "Guest checkout: Removed subscription",
    guestBackToCheckout: "Guest checkout: Chose back to checkout option",
    viewTermsAndConditions: "Viewed terms and conditions",
  },
  orderDetailsForm: {
    newUser: {
      postcodeLookup: "Address: Postcode lookup",
      postcodeFailed: "Address: Postcode lookup failed",
      gpLookup: "GP lookup",
      gpLookupFailed: "GP lookup failed",
      accountDetailsSubmitted: "Account details: submitted",
      accountDetailsValidationError: "Account details: error",
    },
    existingUser: {
      postcodeLookup: "Delivery details: Postcode lookup",
      postcodeFailed: "Delivery details: Postcode lookup failed",
      deliveryDetailsSubmitted: "Delivery details: Submitted",
      deliveryDetailsValidationError: "Delivery details: Error",
      addressChangeModal: "Address change modal",
      addressChangeSubmit: "New delivery address submitted",
    },
  },
  account: {
    dashboard: "Account dashboard",
    cancelSubscriptionLink: "Chose cancel subscription",
    cancelSubscriptionConfirm: "Confirmed subscription cancellation",
    orderDetails: "Order details",
    subscriptionOrderDetails: "Subscription order details",
  },
  payment: {
    paymentComplete: "Payment complete",
    paymentWithSubcomplete: "Subscription payment complete",
    paymentFailed: "Payment failed",
    changePaymentMethod: "Chose change payment method",
    paymentMethodUpdate: "Updated payment method",
    paymentMethodUpdateFailed: "Payment update failed",
  },
  orderConfirmation: {
    showConfirmationScreen: "Order confirmed",
    showConfirmationScreenWithSub: "Subscription order confirmed",
  },
};
