import React, { FC, useCallback } from "react";
import YourDetailsForm from "./components/YourDetailsForm";
import { useHistory } from "react-router-dom";
import {
  CustomerDetails,
  AddCustomerDetailsAction,
} from "app/store/reducer/checkout/types";
import { PostcodeLookupAddress } from "../../app/store/reducer/shared";
import { OnlineService } from "app/store/reducer/online/types";
import { analytics } from "@welldigital/ui-common/Analytics";

export interface YourDetailsPageStateProps {
  customerDetails: CustomerDetails;
  postCodeLookUpAddresses: PostcodeLookupAddress[];
  selectedOnlineService: OnlineService;
}

export interface YourDetailsPageDispatchProps {
  addCustomerDetails(data: CustomerDetails): AddCustomerDetailsAction;
  fetchAddressesByPostcode(postcode: string): void;
}

const OnlineServicesYourDetails: FC<
  YourDetailsPageStateProps & YourDetailsPageDispatchProps
> = ({
  fetchAddressesByPostcode,
  addCustomerDetails,
  postCodeLookUpAddresses,
  selectedOnlineService,
}) => {
  const history = useHistory();
  const onSubmit = useCallback(
    (data: any): void => {
      if (data.allowMarketing) {
        analytics.enableMarketingTracking(data.email);
      }
      analytics.trackEvent({
        flow: selectedOnlineService.id,
        event: "Customer details entered",
      });

      addCustomerDetails(data);
      history.push(
        `/online/${selectedOnlineService.id}/checkout/delivery-details`
      );
    },
    [history, addCustomerDetails, selectedOnlineService.id]
  );

  return (
    <YourDetailsForm
      onSubmit={onSubmit}
      fetchAddressesByPostcode={fetchAddressesByPostcode}
      postCodeLookUpAddresses={postCodeLookUpAddresses}
    />
  );
};

export default OnlineServicesYourDetails;
