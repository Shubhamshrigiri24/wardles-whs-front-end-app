declare module "braintree-web-drop-in" {
  // Options

  export interface Options {
    authorization: string;
    container: any;
    threeDSecure?: boolean;
    card?: Object;
    vaultManager?: boolean;
  }

  export interface RequestPaymentOptions {
    threeDSecure: {
      amount: string;
      mobilePhoneNumber?: string;
      email?: string;
      billingAddress?: {
        givenName?: string;
        surname?: string;
        phoneNumber?: string;
        streetAddress?: string;
        extendedAddress?: string;
        locality?: string;
        region?: string;
        postalCode?: string;
        countryCodeAlpha2?: string;
      };
    };
  }

  // Dropin

  export interface Dropin {
    clearSelectedPaymentMethod(): void;
    isPaymentMethodRequestable(): boolean;
    requestPaymentMethod(
      options?: RequestPaymentOptions,
      callback: (
        error: object | null,
        payload: PaymentMethodPayload | undefined
      ) => void
    ): void;
    requestPaymentMethod(
      options?: RequestPaymentOptions
    ): Promise<PaymentMethodPayload>;
    teardown(): Promise<void>;
    on(
      event: "paymentMethodRequestable",
      handler: (payload: {
        type: "CreditCard" | "PayPalAccount";
        paymentMethodIsSelected: boolean;
      }) => void
    ): void;
    on(event: "noPaymentMethodRequestable", handler: () => void);
    on(
      event: "paymentOptionSelected",
      handler: (payload: {
        paymentOption: "card" | "paypal" | "paypalCredit";
      }) => void
    ): void;
  }

  export interface PaymentMethodPayload {
    nonce: string;
    details: object;
    type:
      | "CreditCard"
      | "PayPalAccount"
      | "VenmoAccount"
      | "AndroidPayCard"
      | "ApplePayCard";
    deviceData: string | null;
    [key: string]: any;
  }

  // Methods
  export function create(options: Options): Promise<Dropin>;

  // Global

  declare global {
    const braintree: {
      dropin: {
        create(options: Options): Promise<Dropin>;
      };
    };
  }
}
