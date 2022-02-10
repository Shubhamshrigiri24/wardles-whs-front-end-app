import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import DeliveryDetailsForm from "./DeliveryForm/DeliveryForm";
import {
  DeliveryDetails,
  CustomerDetails,
  AddDeliveryDetailsAction,
} from "app/store/reducer/checkout/types";
import { PostcodeLookupAddress } from "app/store/reducer/shared";
import { OnlineService } from "app/store/reducer/online/types";
import { analytics } from "@welldigital/ui-common/Analytics";

export interface DeliveryDetailsPageStateProps {
  customerDetails: CustomerDetails;
  postCodeLookUpAddresses: PostcodeLookupAddress[];
  selectedService: OnlineService;
}

export interface DeliveryDetailsPageDispatchProps {
  addDeliveryDetails(data: DeliveryDetails): AddDeliveryDetailsAction;
  fetchPostCodeAddress(postcode: string): void;
}

export type DeliveryDetailsPageProps = DeliveryDetailsPageStateProps &
  DeliveryDetailsPageDispatchProps;

const CustomerPage: React.FC<DeliveryDetailsPageProps> = ({
  customerDetails,
  addDeliveryDetails,
  postCodeLookUpAddresses,
  fetchPostCodeAddress,
  selectedService,
}) => {
  const history = useHistory();
  const onSubmit = useCallback(
    (data: DeliveryDetails): void => {
      addDeliveryDetails(data);

      analytics.trackEvent({
        flow: selectedService.id,
        event: "Delivery details entered",
      });

      history.push(`/online/${selectedService.id}/checkout/payment`);
    },
    [history, addDeliveryDetails, selectedService.id]
  );

  return (
    <DeliveryDetailsForm
      onSubmit={onSubmit}
      customerDetails={customerDetails}
      postCodeLookUpAddresses={postCodeLookUpAddresses}
      fetchAddressesByPostcode={fetchPostCodeAddress}
    />
  );
};

export default CustomerPage;
