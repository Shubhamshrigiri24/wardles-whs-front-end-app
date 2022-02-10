import faker from "faker/locale/en_GB";
import { CustomerDetails, DeliveryDetails } from "./checkout/types";
import { PostcodeLookupAddress } from "./shared";
import {
  OnlineQuestion,
  Pack,
  Product,
  SuccessfulConsultationResponse,
} from "./online/types";

export function makeCustomerDetails(
  override?: Partial<CustomerDetails>
): CustomerDetails {
  return {
    firstName: "firstName",
    lastName: "lastName",
    email: "a@b.com",
    postcode: "M19 2UL",
    line1: "line1",
    line2: "line2",
    city: "city",
    phone: "01189998819991197253",
    surgeryName: "surgeryName",
    surgeryAddress: "surgeryAddress",
    allowMarketing: true,
    ...override,
  };
}

export function makeDeliveryDetails(): DeliveryDetails {
  return {
    title: "Mrs",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    postcode: faker.address.zipCode(),
    line1: faker.address.streetName(),
    line2: faker.address.streetName(),
    city: faker.address.city(),
  };
}

export function makePostCodeLookUpAddresses(): PostcodeLookupAddress[] {
  return [
    {
      line1: "64 Broom Avenue",
      line2: "",
      city: "Manchester",
      country: "England",
      postcode: "M19 2UL",
    },
    {
      line1: "66 Broom Avenue",
      line2: "",
      city: "Manchester",
      country: "England",
      postcode: "M19 2UL",
    },
    {
      line1: "68 Broom Avenue",
      line2: "",
      city: "Manchester",
      country: "England",
      postcode: "M19 2UL",
    },
  ];
}

export function makeSuccessfulConsultationResponse(
  id: string = "default",
  override?: Partial<SuccessfulConsultationResponse>
): SuccessfulConsultationResponse {
  return {
    answer: `answer-${id}`,
    answerString: `answerString-${id}`,
    initialQuestion: `question-${id}`,
    kind: `trepetto-input-type-${id}`,
    question: `question-${id}`,
    type: "string",
    ...override,
  };
}

export function makeOnlineQuestion(number: number = 1): OnlineQuestion {
  return {
    number,
    question: `question-${number}`,
    answer: `answer-${number}`,
    type: "string",
  };
}

export function makeOnlineQuestions(): OnlineQuestion[] {
  return [makeOnlineQuestion(1), makeOnlineQuestion(2), makeOnlineQuestion(3)];
}

export function makeProduct(
  id: string = "default",
  override?: {
    id?: string;
    name?: string;
    service?: string;
    packs?: Pack[];
    variant?: string;
  }
): Product {
  return {
    id,
    name: `name-${id}`,
    service: `service-${id}`,
    packs: [
      makePack(`${id}-pack-1`),
      makePack(`${id}-pack-2`),
      makePack(`${id}-pack-3`),
    ],
    variant: "",
    ...override,
  };
}

export function makePack(
  id: string = "default",
  override?: {
    sku?: string;
    name?: string;
    label?: string;
    price?: number;
    pricePerUnit?: number;
    itemsPerPack?: number;
  }
): Pack {
  return {
    sku: `sku-${id}`,
    name: `name-${id}`,
    label: `label-${id}`,
    basePrice: 1,
    price: 1,
    pricePerUnit: 1,
    itemsPerPack: 1,
    discounts: [],
    ...override,
  };
}

export const customerDetails: CustomerDetails = {
  firstName: "FIRST_NAME",
  lastName: "LAST_NAME",
  email: "EMAIL",
  postcode: "POSTCODE",
  line1: "LINE_1",
  line2: "LINE_2",
  city: "CITY",
  phone: "PHONE",
  surgeryName: "SURGERY_NAME",
  surgeryAddress: "SURGERY_ADDRESS",
  allowMarketing: true,
};

export const deliveryDetails: DeliveryDetails = {
  title: "Mrs",
  firstName: "FIRST_NAME",
  lastName: "LAST_NAME",
  postcode: "POSTCODE",
  line1: "LINE_1",
  line2: "LINE_2",
  city: "CITY",
};
