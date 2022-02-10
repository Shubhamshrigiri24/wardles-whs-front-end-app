import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImportantInfo from "./ImportantInfo";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { OnlineQuestion } from "../../../app/store/reducer/online/types";

const history = createMemoryHistory();

describe("<ImportantInfo />", () => {
  it("should match the snapshot for 13-15 flow", () => {
    const consultation: OnlineQuestion[] = [
      { number: 0, question: "How old are you?", answer: "14" },
    ];
    const { container } = render(
      <Router history={history}>
        <ImportantInfo consultation={consultation} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot for Q3, Answer: No", () => {
    const consultation: OnlineQuestion[] = [
      {
        number: 0,
        question: "Currently using hormonal contraception? No",
        answer: "",
      },
    ];
    const { container } = render(
      <Router history={history}>
        <ImportantInfo consultation={consultation} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot for Q3a, Answer: Injection", () => {
    const consultation: OnlineQuestion[] = [
      { number: 0, question: "Current contraceptive: Injection", answer: "" },
    ];
    const { container } = render(
      <Router history={history}>
        <ImportantInfo consultation={consultation} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot for Q3a, Answer: Implant", () => {
    const consultation: OnlineQuestion[] = [
      { number: 0, question: "Current contraceptive: Implant", answer: "" },
    ];
    const { container } = render(
      <Router history={history}>
        <ImportantInfo consultation={consultation} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot for Q3a, Answer: Intrauterine system (coil/IUD)", () => {
    const consultation: OnlineQuestion[] = [
      { number: 0, question: "Current contraceptive: IUD", answer: "" },
    ];
    const { container } = render(
      <Router history={history}>
        <ImportantInfo consultation={consultation} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  const Q3Contraceptives = [
    "Current contraceptive: Desogestrel",
    "Current contraceptive: Combined pill",
    "Current contraceptive: Vaginal ring",
    "Current contraceptive: Skin patch",
    "Current contraception: Mini-pill",
  ];

  for (const contraceptive of Q3Contraceptives) {
    for (const answer of ["Yes", "No"]) {
      it(`should match the snapshot for Q3: ${contraceptive}, Answer: ${answer}`, () => {
        const consultation: OnlineQuestion[] = [
          { number: 0, question: contraceptive, answer: "" },
          {
            number: 1,
            question: `Current contraceptive taken as directed? ${answer}`,
            answer: "",
          },
        ];
        const { container } = render(
          <Router history={history}>
            <ImportantInfo consultation={consultation} />
          </Router>
        );
        expect(container).toMatchSnapshot();
      });
    }
  }

  it("should match the snapshot for Q5 Priority over Q3b, desogestrel", () => {
    const consultation: OnlineQuestion[] = [
      { number: 0, question: "Current contraceptive: Desogestrel", answer: "" },
      {
        number: 1,
        question: "Current contraceptive taken as directed? Yes",
        answer: "",
      },
      { number: 2, question: "Emergency contraception: Yes", answer: "" },
    ];
    const { container } = render(
      <Router history={history}>
        <ImportantInfo consultation={consultation} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot for Q5 Priority over Q3, no contraception", () => {
    const consultation: OnlineQuestion[] = [
      {
        number: 0,
        question: "Currently using hormonal contraception? No",
        answer: "",
      },
      { number: 1, question: "Emergency contraception: Yes", answer: "" },
    ];
    const { container } = render(
      <Router history={history}>
        <ImportantInfo consultation={consultation} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  const restOfQ3 = [
    "Current contraceptive: Combined pill",
    "Current contraceptive: Vaginal ring",
    "Current contraceptive: Skin patch",
    "Current contraception: Mini-pill",
    "Current contraceptive: Injection",
    "Current contraceptive: Implant",
    "Current contraceptive: IUD",
  ];

  for (const question of restOfQ3) {
    it(`should match the snapshot for Q5 Priority over Q3, ${question}`, () => {
      const consultation: OnlineQuestion[] = [
        { number: 0, question, answer: "" },
        { number: 1, question: "Emergency contraception: Yes", answer: "" },
      ];
      const { container } = render(
        <Router history={history}>
          <ImportantInfo consultation={consultation} />
        </Router>
      );
      expect(container).toMatchSnapshot();
    });
  }

  const specialConditions = [
    "Chloasma",
    "Thromboembolic disorders",
    "Hypertension",
  ];

  for (const condition of specialConditions) {
    it(`should match the snapshot for Q7, Answer: ${condition}`, () => {
      const consultation: OnlineQuestion[] = [
        {
          number: 0,
          question: `Current/previous conditions: ${condition}`,
          answer: "",
        },
      ];
      const { container } = render(
        <Router history={history}>
          <ImportantInfo consultation={consultation} />
        </Router>
      );
      expect(container).toMatchSnapshot();
    });
  }

  const antibioticsConditions = [
    "Chloramphenicol",
    "Clarithromycin",
    "Erythromycin",
    "Fluconazole",
    "Griseofulvin",
    "Itraconazole",
    "Ketoconazole",
    "Miconazole",
    "Posaconazole",
    "Rifampicin",
    "Voriconazole",
    "Don't know",
    "None of these",
  ];

  for (const condition of antibioticsConditions) {
    it(`should match the snapshot for Q11b, Answer: No, antibiotic: ${condition}`, () => {
      const consultation: OnlineQuestion[] = [
        {
          number: 0,
          question: `Antibiotics/Antifungals: ${condition}`,
          answer: "",
        },
      ];
      const { container } = render(
        <Router history={history}>
          <ImportantInfo consultation={consultation} />
        </Router>
      );
      expect(container).toMatchSnapshot();
    });
  }
});
