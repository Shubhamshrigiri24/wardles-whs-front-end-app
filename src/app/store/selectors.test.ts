import { makeGetEligiblePacks } from "./selectors";
import { getConsultationResponses } from "./reducer/online/selectors";
import { OnlineQuestion, OnlineServiceIds, Pack } from "./reducer/online/types";
import { RootState } from "./types";
import { makePack, makeProduct } from "./reducer/mock";

jest.mock("./reducer/online/selectors");

afterEach(() => {
  jest.resetAllMocks();
});

describe("makeGetEligibleProductPacks", () => {
  it("doesn't filter out packs by default", () => {
    const product = makeProduct();
    (getConsultationResponses as jest.Mock<OnlineQuestion[]>).mockReturnValue(
      []
    );
    const onlineState = Symbol();
    expect(
      makeGetEligiblePacks({ online: onlineState } as unknown as RootState)(
        product
      )
    ).toEqual(product.packs);
    expect(getConsultationResponses).toBeCalledTimes(1);
    expect(getConsultationResponses).toBeCalledWith(onlineState);
  });

  describe("hana", () => {
    const hanaAliases = {
      usingHormonalContraception: "Currently using hormonal contraception? Yes",
      usingDesogestrel: "Current contraceptive: Desogestrel",
      age: "How old are you?",
      previouslyUsedDesogestrel: "Previously had desogestrel? Yes",
    };
    const alwaysGoodPacks: Pack[] = [
      makePack("1"),
      makePack("2"),
      makePack("3"),
    ];
    const desogestrelOnlyPacks: Pack[] = [
      "HN539979",
      "HN539980",
      "HN539981",
    ].map((sku, i) => makePack(`${4 + i}`, { sku }));

    const product = makeProduct(undefined, {
      service: OnlineServiceIds.hana,
      packs: alwaysGoodPacks.concat(desogestrelOnlyPacks),
    });

    it("doesn't filter out hana skus if questions answered correctly", () => {
      (
        getConsultationResponses as unknown as jest.Mock<OnlineQuestion[]>
      ).mockReturnValue([
        {
          number: 0,
          question: hanaAliases.usingDesogestrel,
          answer: "TRUE",
          type: "bool",
        },
        {
          number: 1,
          question: hanaAliases.age,
          answer: "18",
          type: "bool",
        },
        {
          number: 2,
          question: hanaAliases.previouslyUsedDesogestrel,
          answer: "TRUE",
          type: "bool",
        },
        {
          number: 3,
          question: hanaAliases.usingHormonalContraception,
          answer: "TRUE",
          type: "bool",
        },
      ]);
      const onlineState = Symbol();
      expect(
        makeGetEligiblePacks({ online: onlineState } as unknown as RootState)(
          product
        )
      ).toEqual(product.packs);
      expect(getConsultationResponses).toBeCalledTimes(1);
      expect(getConsultationResponses).toBeCalledWith(onlineState);
    });

    it.each([
      [
        "not currently using desogestrel",
        [
          {
            number: 0,
            question: hanaAliases.usingDesogestrel,
            answer: "false",
            type: "bool",
          },
          {
            number: 1,
            question: hanaAliases.age,
            answer: "18",
            type: "bool",
          },
          {
            number: 2,
            question: hanaAliases.previouslyUsedDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 3,
            question: hanaAliases.usingHormonalContraception,
            answer: "true",
            type: "bool",
          },
        ],
      ],
      [
        "current desogestrel usage is unknown",
        [
          {
            number: 1,
            question: hanaAliases.age,
            answer: "18",
            type: "bool",
          },
          {
            number: 2,
            question: hanaAliases.previouslyUsedDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 3,
            question: hanaAliases.usingHormonalContraception,
            answer: "true",
            type: "bool",
          },
        ],
      ],
      [
        "under 18",
        [
          {
            number: 0,
            question: hanaAliases.usingDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 1,
            question: hanaAliases.age,
            answer: "17",
            type: "bool",
          },
          {
            number: 2,
            question: hanaAliases.previouslyUsedDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 3,
            question: hanaAliases.usingHormonalContraception,
            answer: "true",
            type: "bool",
          },
        ],
      ],
      [
        "age unknown",
        [
          {
            number: 0,
            question: hanaAliases.usingDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 2,
            question: hanaAliases.previouslyUsedDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 3,
            question: hanaAliases.usingHormonalContraception,
            answer: "true",
            type: "bool",
          },
        ],
      ],
      [
        "not using hormonal contraception",
        [
          {
            number: 0,
            question: hanaAliases.usingDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 1,
            question: hanaAliases.age,
            answer: "18",
            type: "bool",
          },
          {
            number: 2,
            question: hanaAliases.previouslyUsedDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 3,
            question: hanaAliases.usingHormonalContraception,
            answer: "false",
            type: "bool",
          },
        ],
      ],
      [
        "current use of hormonal contraception is unknown",
        [
          {
            number: 0,
            question: hanaAliases.usingDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 1,
            question: hanaAliases.age,
            answer: "18",
            type: "bool",
          },
          {
            number: 2,
            question: hanaAliases.previouslyUsedDesogestrel,
            answer: "true",
            type: "bool",
          },
        ],
      ],
      [
        "not previously used desogestrel",
        [
          {
            number: 0,
            question: hanaAliases.usingDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 1,
            question: hanaAliases.age,
            answer: "18",
            type: "bool",
          },
          {
            number: 2,
            question: hanaAliases.previouslyUsedDesogestrel,
            answer: "false",
            type: "bool",
          },
          {
            number: 3,
            question: hanaAliases.usingHormonalContraception,
            answer: "true",
            type: "bool",
          },
        ],
      ],
      [
        "previous use of desogestrel is unknown",
        [
          {
            number: 0,
            question: hanaAliases.usingDesogestrel,
            answer: "true",
            type: "bool",
          },
          {
            number: 1,
            question: hanaAliases.age,
            answer: "18",
            type: "bool",
          },
          {
            number: 3,
            question: hanaAliases.usingHormonalContraception,
            answer: "true",
            type: "bool",
          },
        ],
      ],
    ] as [string, OnlineQuestion[]][])(
      "filters out hana skus if %s",
      (_test, consultation) => {
        (
          getConsultationResponses as unknown as jest.Mock<OnlineQuestion[]>
        ).mockReturnValue(consultation);
        const onlineState = Symbol();
        expect(
          makeGetEligiblePacks({
            online: onlineState,
          } as unknown as RootState)(product)
        ).toEqual(alwaysGoodPacks);
        expect(getConsultationResponses).toBeCalledTimes(1);
        expect(getConsultationResponses).toBeCalledWith(onlineState);
      }
    );
  });
});
