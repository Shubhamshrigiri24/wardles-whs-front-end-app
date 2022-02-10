import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductSelectionPage, {
  ProductSelectionProps,
} from "./ProductSelectionPage";
import {
  Ed,
  Hana,
  OnlineProductIds,
  OnlineServiceIds,
} from "app/store/reducer/online/types";
import { makeProduct } from "app/store/reducer/mock";
import { HanaTripettoQuestions } from "../../constants/hanaTripettoQuestions";

let mock_token = "";
let mock_onlineServiceId: string;
let mock_productId: string | undefined;
const mock_historyPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(() => {
    return {
      onlineServiceId: mock_onlineServiceId,
      productId: mock_productId,
    };
  }),
  useHistory: () => ({
    push: mock_historyPush,
  }),
  useLocation: () => ({
    search: mock_token ? `?token=${mock_token}` : "",
  }),
}));

describe("<ProductSelectionPage />", () => {
  beforeEach(() => {
    mock_onlineServiceId = OnlineServiceIds.hana;
    mock_productId = undefined;
  });

  it("should match the snapshot", () => {
    const props = makeProps();
    const { container } = render(<ProductSelectionPage {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should contain the sildenafil product selected in url", async () => {
    mock_onlineServiceId = OnlineServiceIds.ed;
    mock_productId = OnlineProductIds.sildenafil;
    const props = makeProps();
    const { getByTestId } = render(<ProductSelectionPage {...props} />);
    const sildenafilProduct = getByTestId("product-sildenafil");
    expect(sildenafilProduct).toBeTruthy();
  });

  it("should contain the viagra product selected in url", async () => {
    mock_onlineServiceId = OnlineServiceIds.ed;
    mock_productId = OnlineProductIds.viagra;
    const props = makeProps();
    const { getByTestId } = render(<ProductSelectionPage {...props} />);
    const sildenafilProduct = getByTestId("product-viagra");
    expect(sildenafilProduct).toBeTruthy();
  });

  it("should call fetch products on render", async () => {
    const props = makeProps();
    render(<ProductSelectionPage {...props} />);
    expect(props.fetchProducts).toBeCalledWith(props.selectedService.id);
  });

  it("should call set product when products are loaded", async () => {
    const props = makeProps();
    const { getByTestId } = render(<ProductSelectionPage {...props} />);
    await act(async () => {
      fireEvent.click(getByTestId("ProductSelectionPage/continue-button"));
    });
    expect(props.setProduct).toBeCalledWith(props.products[0]);
  });

  it("should not call check product token on render if not token present", async () => {
    const props = makeProps();
    render(<ProductSelectionPage {...props} />);
    expect(props.checkProductToken).not.toBeCalled();
  });

  it("should call check product token on render if token present in url", async () => {
    mock_token = "test-token";
    const props = makeProps();
    render(<ProductSelectionPage {...props} />);
    expect(props.checkProductToken).toBeCalledWith(mock_token);
    mock_token = "";
  });

  it("should call history push after if token is invalid", async () => {
    mock_token = "test-token";
    const props = makeProps({ productTokenValid: false });
    render(<ProductSelectionPage {...props} />);
    expect(mock_historyPush).toBeCalledWith("/page-not-found");
    expect(props.setProductToken).not.toBeCalled();
    expect(props.setConsultation).not.toBeCalled();
    mock_historyPush.mockClear();
    mock_token = "";
  });

  it("should not call history push after if token is valid, and set consultation if empty", async () => {
    mock_token = "test-token";
    const props = makeProps({ productTokenValid: true });
    render(<ProductSelectionPage {...props} />);
    expect(mock_historyPush).not.toBeCalled();
    expect(props.setProductToken).toBeCalledWith(mock_token);
    expect(props.setConsultation).toBeCalledWith(props.selectedService.id, [
      {
        type: "int",
        number: 0,
        question: HanaTripettoQuestions.q1,
        answer: "14",
      },
    ]);
    mock_historyPush.mockClear();
    mock_token = "";
  });

  it("should not call history push after if token is valid, and NOT set consultation if is already set", async () => {
    mock_token = "test-token";
    const props = makeProps({
      productTokenValid: true,
      consultation: [
        {
          type: "int",
          number: 0,
          question: HanaTripettoQuestions.q1,
          answer: "14",
        },
      ],
    });
    render(<ProductSelectionPage {...props} />);
    expect(mock_historyPush).not.toBeCalled();
    expect(props.setProductToken).toBeCalledWith(mock_token);
    expect(props.setConsultation).not.toBeCalled();
    mock_historyPush.mockClear();
    mock_token = "";
  });
});

function makeProps(p?: Partial<ProductSelectionProps>): ProductSelectionProps {
  const selectedProduct = makeProduct(mock_productId);
  return {
    setProduct: jest.fn(),
    services: [Ed, Hana],
    selectedService: mock_onlineServiceId === OnlineServiceIds.hana ? Hana : Ed,
    selectedProduct,
    productToken: p?.productToken ?? null,
    productTokenValid: p?.productTokenValid ?? true,
    products: [selectedProduct, selectedProduct],
    getEligiblePacks: (p) => p.packs,
    fetchProducts: jest.fn(),
    fetching: false,
    setPack: jest.fn(),
    setOnlineService: jest.fn(),
    setProductToken: jest.fn(),
    checkProductToken: jest.fn(),
    consultation: p?.consultation || [],
    setConsultation: jest.fn(),
  };
}
