import React from "react";
import { IProduct, Product } from "../Product";
import sildenafilSrc from "./assets/sildenafil.jpg";
import viagraSrc from "./assets/viagra.jpg";

export type EdProductProps = {
  id: EdProductIds;
  checked?: boolean;
  onCheck?: () => void;
};

export enum EdProductIds {
  sildenafil = "sildenafil",
  viagra = "viagra",
}

export const edProductsMap: { [key in EdProductIds]: IProduct } = {
  [EdProductIds.sildenafil]: {
    id: EdProductIds.sildenafil,
    imageSrc: sildenafilSrc,
    title: "Sildenafil",
    analyticsTitle: "Sildenafil 50mg",
    description:
      "Sildenafil contains the same active ingredient (Sildenafil citrate) as Viagra Connect and works in the same way.",
    moreInfo: (
      <>
        <strong>How does Sildenafil work?</strong>
        <br />
        <br />
        Sildenfil works by increasing blood flow to the penis. This should help
        you get and keep an erection for sex or masturbation.
        <br />
        <br />
        <strong>How should I take Sildenafil?</strong>
        <br />
        <br />
        Swallow one whole tablet with some water up to four hours before sex.
        Don’t take more than one tablet a day.
        <br />
        Read the instructions that come with the medicine carefully, or talk to
        a pharmacist or your GP if you’re not sure how to take Sildenafil. After
        sex, your erection should go away normally. If it doesn't, contact your
        pharmacist,{" "}
        <a
          href={"https://111.nhs.uk/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          NHS 111
        </a>{" "}
        or your GP.
        <br />
        <br />
        <strong>Does Sildenafil cause any side effects?</strong>
        <br />
        <br />
        Side effects can include:
        <br />
        <br />
        - headaches
        <br />
        - sickness (nausea)
        <br />
        - hot flushes
        <br />
        - blurred vision.
        <br />
        <br />
        Talk to a pharmacist or your GP if you experience any side effects after
        taking Sildenafil. Find out more about possible side effects on the{" "}
        <a
          href={"https://www.nhs.uk/medicines/sildenafil-viagra/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          NHS website
        </a>
        .
      </>
    ),
    isBestValue: true,
  },
  [EdProductIds.viagra]: {
    id: EdProductIds.viagra,
    imageSrc: viagraSrc,
    title: "Viagra Connect",
    analyticsTitle: "Viagra Connect 50mg",
    description:
      "Viagra Connect is a well known treatment for ED. It contains the active ingredient Sildenafil citrate. ",
    moreInfo: (
      <>
        <strong>How does Viagra Connect work?</strong>
        <br />
        <br />
        Viagra Connect works by increasing blood flow to the penis. This should
        help you get and keep an erection for sex or masturbation.
        <br />
        <br />
        <strong>How should I take Viagra Connect?</strong>
        <br />
        <br />
        Swallow one whole tablet with some water one hour before sex. Don’t take
        more than one tablet a day.
        <br />
        Read the instructions that come with the medicine carefully, or talk to
        a pharmacist or your GP if you’re not sure how to take Viagra Connect.
        After sex, your erection should go away normally. If it doesn't, contact
        your pharmacist,{" "}
        <a
          href={"https://111.nhs.uk/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          NHS 111
        </a>{" "}
        or your GP.
        <br />
        <br />
        <strong>Does Viagra Connect cause any side effects?</strong>
        <br />
        <br />
        Side effects can include:
        <br />
        <br />
        - headaches
        <br />
        - sickness (nausea)
        <br />
        - hot flushes
        <br />
        - blurred vision.
        <br />
        <br />
        Talk to a pharmacist or your GP if you experience any side effects after
        taking Viagra Connect. Find out more about possible side effects on the{" "}
        <a
          href={"https://www.viagraconnect.co.uk/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          Viagra Connect website
        </a>
        .
      </>
    ),
  },
};

export const SildenafilProduct: React.FC<Omit<EdProductProps, "id">> = (
  props
) => {
  return <Product {...edProductsMap[EdProductIds.sildenafil]} {...props} />;
};

export const ViagraConnectProduct: React.FC<Omit<EdProductProps, "id">> = (
  props
) => {
  return <Product {...edProductsMap[EdProductIds.viagra]} {...props} />;
};
