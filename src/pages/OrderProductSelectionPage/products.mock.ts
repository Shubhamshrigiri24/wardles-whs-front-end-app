import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import { PRODUCT_CONSTANTS } from "constants/product";
import sildenafilSrc from "./assets/sildenafil.png";
import viagraSrc from "./assets/viagra.png";
import cialisSrc from "./assets/cialis-10mg.png";
import tadalafilSrc from "./assets/tadalafil-10mg.png";

const priceTemplate = "Price: £<price>";

const strengthTemplate = "<value> mg";
const packSizeTemplate = "<value> tablets";
const pricePerUnitTemplate = "£<price> per unit";

export const sildenafil: PriceConfig = {
  __meta__: {
    id: "sildenafil",
    productName: "Sildenafil",
    activeIngredient: "Sildenafil",
    imageURI: sildenafilSrc,
    worksIn: "30-60 min  ",
    duration: "4-5 hrs",
    isBestValue: true,
    description:
      "Sildenafil contains the same active ingredient as Viagra Connect and works in the same way. As it doesn't have a brand name, it's usually cheaper to buy.",
    moreInfo: [
      {
        title: "Manufacturer",
        content: "Pfizer and various companies",
      },
      {
        title: "How should I take it?",
        content: "Swallow one whole tablet with water an hour before sex.",
      },
      {
        title: "Can I drink alcohol with it?",
        content:
          "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
      },
      {
        title: "Can I take it with food?",
        content:
          "You can but it may take longer to work if you take it with a heavy meal.",
      },
      {
        title: "Can I drive after taking it?",
        content:
          "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
      },
    ],
    subscriptionMoreInfo:
      "Our subscription service gives you the best value for money on medication and treatments you take regularly that need approval from a pharmacist. If you’d like to set up a monthly subscription, you’ll need to create an account where you can keep track of your orders and manage your scheduled payments. Before your order is processed each month, we’ll ask you to confirm if there have been any changes to your health since your last order. Once our pharmacists are happy the product is still suitable for you, we’ll deliver straight to your door in discreet packaging.",
    priceTemplate,

    defaultPricePath: ["50", PRODUCT_CONSTANTS.subscription, "16"],

    levels: [
      {
        renderOrder: 0,
        levelLabel: "Strength",
        columnLabelTemplate: strengthTemplate,
        // the following 2 attributes are only valid on the last level
        // because only on the last level we can know the price for every pricePath
      },
      {
        renderOrder: 2,
        levelLabel: "Sign up for monthly subscriptions and save",
        columnLabelTemplate: "<value>",
        stealPriceFromSelectedChild: true,
        pricePerUnitTemplate: "£<price> per unit",
        shouldDeriveBestValue: true,
      },
      // The last level is the priceHolder node.
      // In other words priceHolder node must be on the last level.
      // priceHolder node has only one child/leaf of type Price which is the price object itself.
      {
        renderOrder: 1,
        levelLabel: "Pack size",
        columnLabelTemplate: packSizeTemplate,
        // the following 2 attributes are only valid on the last level
        // because only on the last level we can know the price for every pricePath.
        // As an exception they are also allowed for last but one (ex: Subscription level)
        // if it has "stealPriceFromSelectedChild" set to true
        // in which case it will peek into its children (last level) for deriving price info.
        pricePerUnitTemplate,
        shouldDeriveBestValue: false,
      },
    ],
  },
  priceTree: {
    50: {
      [PRODUCT_CONSTANTS.subscription]: {
        4: {
          sku: "SI05359845",
          price: 13.49,
          meta: { subscriptionDuration: Infinity },
        },
        8: {
          sku: "SI05359846",
          price: 24.29,
          meta: { subscriptionDuration: Infinity },
        },
        12: {
          sku: "SI05359847",
          price: 35.99,
          meta: { subscriptionDuration: Infinity },
        },
        16: {
          sku: "SI05359848",
          price: 46.79,
          meta: { subscriptionDuration: Infinity },
        },
      },
      [PRODUCT_CONSTANTS.noSubscription]: {
        4: {
          sku: "SI05359845",
          price: 14.99,
        },
        8: {
          sku: "SI05359846",
          price: 26.99,
        },
        12: {
          sku: "SI05359847",
          price: 39.99,
        },
        16: {
          sku: "SI05359848",
          price: 51.99,
        },
      },
    },
  },
};

export const viagra: PriceConfig = {
  __meta__: {
    id: "viagra",
    productName: "Viagra Connect",
    activeIngredient: "Sildenafil",
    imageURI: viagraSrc,
    worksIn: "30-60 min  ",
    duration: "4-5 hrs",
    isBestValue: false,
    description:
      "Viagra Connect is well known as a long-established, global brand of ED treatment.",
    moreInfo: [
      {
        title: "Manufacturer",
        content: "Pfizer",
      },
      {
        title: "How should I take it?",
        content: "Swallow one whole tablet with water an hour before sex.",
      },
      {
        title: "Can I drink alcohol with it?",
        content:
          "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
      },
      {
        title: "Can I take it with food?",
        content:
          "You can but it may take longer to work if you take it with a heavy meal.",
      },
      {
        title: "Can I drive after taking it?",
        content:
          "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
      },
    ],
    subscriptionMoreInfo:
      "Our subscription service gives you the best value for money on medication and treatments you take regularly that need approval from a pharmacist. If you’d like to set up a monthly subscription, you’ll need to create an account where you can keep track of your orders and manage your scheduled payments. Before your order is processed each month, we’ll ask you to confirm if there have been any changes to your health since your last order. Once our pharmacists are happy the product is still suitable for you, we’ll deliver straight to your door in discreet packaging.",
    priceTemplate,

    defaultPricePath: ["50", PRODUCT_CONSTANTS.subscription, "16"],

    levels: [
      {
        renderOrder: 0,
        levelLabel: "Strength",
        columnLabelTemplate: strengthTemplate,
      },
      {
        renderOrder: 2,
        levelLabel: "Sign up for monthly subscriptions and save",
        columnLabelTemplate: "<value>",
        stealPriceFromSelectedChild: true,
        pricePerUnitTemplate: "£<price> per unit",
        shouldDeriveBestValue: true,
      },
      {
        renderOrder: 1,
        levelLabel: "Pack size",
        columnLabelTemplate: packSizeTemplate,
        pricePerUnitTemplate,
        shouldDeriveBestValue: false,
      },
    ],
  },
  priceTree: {
    50: {
      [PRODUCT_CONSTANTS.subscription]: {
        4: {
          sku: "OT074771",
          price: 17.99,
          meta: { subscriptionDuration: Infinity },
        },
        8: {
          sku: "OT074772",
          price: 31.49,
          meta: { subscriptionDuration: Infinity },
        },
        12: {
          sku: "VC4256147",
          price: 46.79,
          meta: { subscriptionDuration: Infinity },
        },
        16: {
          sku: "VC3656888",
          price: 61.19,
          meta: { subscriptionDuration: Infinity },
        },
      },
      [PRODUCT_CONSTANTS.noSubscription]: {
        4: {
          sku: "OT074771",
          price: 19.99,
        },
        8: {
          sku: "OT074772",
          price: 34.99,
        },
        12: {
          sku: "VC4256147",
          price: 51.99,
        },
        16: {
          sku: "VC3656888",
          price: 67.99,
        },
      },
    },
  },
};

export const tadalafil: PriceConfig = {
  __meta__: {
    id: "tadalafil",
    productName: "Tadalafil",
    activeIngredient: "Tadalafil",
    imageURI: tadalafilSrc,
    worksIn: "30 min  ",
    duration: "up to 36 hrs",
    isBestValue: false,
    description:
      "Tadalafil contains the same active ingredient as Cialis and works in the same way. As it is a non-branded treatment it's usually cheaper to buy. Tadalafil can be effective for up to 36 hours so can allow for more spontaneity than some other ED treatments.",
    moreInfo: [
      {
        title: "Manufacturer",
        content: "Various companies",
      },
      {
        title: "How should I take it?",
        content:
          "Swallow one whole tablet with water at least 30 minutes before sex.",
      },
      {
        title: "Can I drink alcohol with it?",
        content:
          "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
      },
      {
        title: "Can I take it with food?",
        content: "You can take tadalafil with or without food.",
      },
      {
        title: "Can I drive after taking it?",
        content:
          "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
      },
    ],
    subscriptionMoreInfo:
      "Our subscription service gives you the best value for money on medication and treatments you take regularly that need approval from a pharmacist. If you’d like to set up a monthly subscription, you’ll need to create an account where you can keep track of your orders and manage your scheduled payments. Before your order is processed each month, we’ll ask you to confirm if there have been any changes to your health since your last order. Once our pharmacists are happy the product is still suitable for you, we’ll deliver straight to your door in discreet packaging.",
    priceTemplate,

    defaultPricePath: ["10", PRODUCT_CONSTANTS.subscription, "16"],

    levels: [
      {
        renderOrder: 0,
        levelLabel: "Strength",
        columnLabelTemplate: strengthTemplate,
      },
      {
        renderOrder: 2,
        levelLabel: "Sign up for monthly subscriptions and save",
        columnLabelTemplate: "<value>",
        stealPriceFromSelectedChild: true,
        pricePerUnitTemplate: "£<price> per unit",
        shouldDeriveBestValue: true,
      },
      {
        renderOrder: 1,
        levelLabel: "Pack size",
        columnLabelTemplate: packSizeTemplate,
        pricePerUnitTemplate,
        shouldDeriveBestValue: false,
      },
    ],
  },
  priceTree: {
    10: {
      [PRODUCT_CONSTANTS.subscription]: {
        4: {
          sku: "TA96561726",
          price: 22.49,
          meta: { subscriptionDuration: Infinity },
        },
        8: {
          sku: "TA96561727",
          price: 37.79,
          meta: { subscriptionDuration: Infinity },
        },
        12: {
          sku: "TA96561728",
          price: 53.99,
          meta: { subscriptionDuration: Infinity },
        },
        16: {
          sku: "TA96561729",
          price: 68.39,
          meta: { subscriptionDuration: Infinity },
        },
      },
      [PRODUCT_CONSTANTS.noSubscription]: {
        4: {
          sku: "TA96561726",
          price: 24.99,
        },
        8: {
          sku: "TA96561727",
          price: 41.99,
        },
        12: {
          sku: "TA96561728",
          price: 59.99,
        },
        16: {
          sku: "TA96561729",
          price: 75.99,
        },
      },
    },
    20: {
      [PRODUCT_CONSTANTS.subscription]: {
        4: {
          sku: "TA96561730",
          price: 25.19,
          meta: { subscriptionDuration: Infinity },
        },
        8: {
          sku: "TA96561731",
          price: 44.99,
          meta: { subscriptionDuration: Infinity },
        },
        12: {
          sku: "TA96561732",
          price: 58.49,
          meta: { subscriptionDuration: Infinity },
        },
        16: {
          sku: "TA96561733",
          price: 73.79,
          meta: { subscriptionDuration: Infinity },
        },
      },
      [PRODUCT_CONSTANTS.noSubscription]: {
        4: {
          sku: "TA96561730",
          price: 27.99,
        },
        8: {
          sku: "TA96561731",
          price: 49.99,
        },
        12: {
          sku: "TA96561732",
          price: 64.99,
        },
        16: {
          sku: "TA96561733",
          price: 81.99,
        },
      },
    },
  },
};

export const cialis: PriceConfig = {
  __meta__: {
    id: "cialis",
    productName: "Cialis",
    activeIngredient: "Tadalafil",
    imageURI: cialisSrc,
    worksIn: "30 min ",
    duration: "up to 36 hrs",
    isBestValue: false,
    description:
      "Cialis is a branded form of the medicine tadalafil. Tadalafil can be effective for up to 36 hours so can allow for more spontaneity than some other ED treatments.",
    moreInfo: [
      {
        title: "Manufacturer",
        content: "Eli Lilly and Company Limited",
      },
      {
        title: "How should I take it?",
        content:
          "Swallow one whole tablet with water at least 30 minutes before sex.",
      },
      {
        title: "Can I drink alcohol with it?",
        content:
          "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
      },
      {
        title: "Can I take it with food?",
        content: "You can take Cialis with or without food.",
      },
      {
        title: "Can I drive after taking it?",
        content:
          "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
      },
    ],
    subscriptionMoreInfo:
      "Our subscription service gives you the best value for money on medication and treatments you take regularly that need approval from a pharmacist. If you’d like to set up a monthly subscription, you’ll need to create an account where you can keep track of your orders and manage your scheduled payments. Before your order is processed each month, we’ll ask you to confirm if there have been any changes to your health since your last order. Once our pharmacists are happy the product is still suitable for you, we’ll deliver straight to your door in discreet packaging.",
    priceTemplate,

    defaultPricePath: ["10", PRODUCT_CONSTANTS.subscription, "16"],

    levels: [
      {
        renderOrder: 0,
        levelLabel: "Strength",
        columnLabelTemplate: strengthTemplate,
      },
      {
        renderOrder: 2,
        levelLabel: "Sign up for monthly subscriptions and save",
        columnLabelTemplate: "<value>",
        stealPriceFromSelectedChild: true,
        pricePerUnitTemplate: "£<price> per unit",
        shouldDeriveBestValue: true,
      },
      {
        renderOrder: 1,
        levelLabel: "Pack size",
        columnLabelTemplate: packSizeTemplate,
        // the following 2 attributes are only valid on the last level
        // because only on the last level we can know the price for every pricePath
        pricePerUnitTemplate,
        shouldDeriveBestValue: false,
      },
    ],
  },
  priceTree: {
    10: {
      [PRODUCT_CONSTANTS.subscription]: {
        4: {
          sku: "CI60427084",
          price: 36.89,
          meta: { subscriptionDuration: Infinity },
        },
        8: {
          sku: "CI60427085",
          price: 69.29,
          meta: { subscriptionDuration: Infinity },
        },
        12: {
          sku: "CI60427086",
          price: 103.49,
          meta: { subscriptionDuration: Infinity },
        },
        16: {
          sku: "CI60427087",
          price: 136.79,
          meta: { subscriptionDuration: Infinity },
        },
      },
      [PRODUCT_CONSTANTS.noSubscription]: {
        4: {
          sku: "CI60427084",
          price: 40.99,
        },
        8: {
          sku: "CI60427085",
          price: 76.99,
        },
        12: {
          sku: "CI60427086",
          price: 114.99,
        },
        16: {
          sku: "CI60427087",
          price: 151.99,
        },
      },
    },
    20: {
      [PRODUCT_CONSTANTS.subscription]: {
        4: {
          sku: "CI60427088",
          price: 41.39,
          meta: { subscriptionDuration: Infinity },
        },
        8: {
          sku: "CI60427089",
          price: 79.19,
          meta: { subscriptionDuration: Infinity },
        },
        12: {
          sku: "CI60427090",
          price: 113.39,
          meta: { subscriptionDuration: Infinity },
        },
        16: {
          sku: "CI60427091",
          price: 143.99,
          meta: { subscriptionDuration: Infinity },
        },
      },
      [PRODUCT_CONSTANTS.noSubscription]: {
        4: {
          sku: "CI60427088",
          price: 45.99,
        },
        8: {
          sku: "CI60427089",
          price: 87.99,
        },
        12: {
          sku: "CI60427090",
          price: 125.99,
        },
        16: {
          sku: "CI60427091",
          price: 159.99,
        },
      },
    },
  },
};

export const edProducts: PriceConfig[] = [
  sildenafil,
  viagra,
  tadalafil,
  cialis,
];

export const EXPERIMENT_ID =
  process.env.REACT_APP_OPTIMIZE_EXPERIMENT_PACKSELECT || "missing_key";
