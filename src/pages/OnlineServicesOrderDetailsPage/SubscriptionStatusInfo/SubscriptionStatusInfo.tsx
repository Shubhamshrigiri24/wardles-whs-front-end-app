import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import RenderCustomerConfirmation from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo/RenderCustomerConfirmation";
import RenderPharmacistApproval from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo/RenderPharmacistApproval";
import RenderPaymentIssue from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo/RenderPaymentIssue";
import RenderCancelled from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo/RenderCancelled";
import RenderDeclined from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo/RenderDeclined";
import { OrderDetailsProduct } from "pages/OnlineServicesOrderDetailsPage/types";
import { SUBSCRIPTION_STATUSES } from "app/store/reducer/subscriptions/constants";

interface Props {
  status?: keyof typeof SUBSCRIPTION_STATUSES;
  performPageDataRefetch: () => void;
  onError: React.Dispatch<React.SetStateAction<string>>;
  product: OrderDetailsProduct;
}

export const SubscriptionStatusInfo: React.FC<Props> = ({
  status,
  performPageDataRefetch,
  onError,
  product,
}) => {
  const renderContent = useCallback(() => {
    switch (status) {
      case SUBSCRIPTION_STATUSES.APPROVED:
      case SUBSCRIPTION_STATUSES.ACTIVE:
        return (
          <RenderCustomerConfirmation
            product={product}
            performPageDataRefetch={performPageDataRefetch}
            onError={onError}
          />
        );
      case SUBSCRIPTION_STATUSES.REQUIRES_PHARMACIST_APPROVAL:
        return <RenderPharmacistApproval />;
      case SUBSCRIPTION_STATUSES.PAUSED_FAILED_PAYMENT:
        return <RenderPaymentIssue />;
      case SUBSCRIPTION_STATUSES.CANCELLED:
        return <RenderCancelled />;
      case SUBSCRIPTION_STATUSES.PHARMACIST_DECLINED:
        return <RenderDeclined />;
      default:
        return null;
    }
  }, [status, performPageDataRefetch, onError, product]);

  return <Box marginBottom={3}>{renderContent()}</Box>;
};

export default SubscriptionStatusInfo;
