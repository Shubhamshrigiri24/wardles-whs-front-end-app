import { addDeliveryDetails } from "./actions";
import { makeDeliveryDetails } from "../mock";
import { ADD_DELIVERY_DETAILS } from "app/store/reducer/checkout/constants";

describe("actions", () => {
  describe("set Delivery Details", () => {
    it("should create an action to set the delivery details", () => {
      const delivery = makeDeliveryDetails();
      const expectedAction = {
        payload: {
          deliveryDetails: delivery,
        },
        type: ADD_DELIVERY_DETAILS,
      };
      expect(addDeliveryDetails(delivery)).toEqual(expectedAction);
    });
  });
});
