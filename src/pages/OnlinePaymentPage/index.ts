import { connect } from "react-redux";
import { RootState } from "../../app/store/types";
import OnlinePayment, {
  OnlinePaymentPageStateProps,
  OnlinePaymentPageDispatchProps,
} from "./OnlinePaymentPage";
import {
  getOnlineBraintreeToken,
  getCustomerDetails,
  getDeliveryDetails,
  getOnlineConsultation,
  getOnlineOrderErrorMessage,
  getOnlineSuccessfulOrder,
  getSelectedOnlineService,
  getSelectedPack,
  getProductToken,
} from "../../app/store/selectors";
import {
  clearOrderFailureError,
  fetchToken,
  invalidateProductToken,
  onOrder,
} from "app/store/reducer/online/actions";

function mapStateToProps(state: RootState): OnlinePaymentPageStateProps {
  return {
    braintreeToken: getOnlineBraintreeToken(state),
    successfulOrder: getOnlineSuccessfulOrder(state),
    orderErrorMessage: getOnlineOrderErrorMessage(state),
    basket: getSelectedPack(state),
    consultation: getOnlineConsultation(state),
    customerDetails: getCustomerDetails(state),
    deliveryDetails: getDeliveryDetails(state),
    selectedService: getSelectedOnlineService(state),
    productToken: getProductToken(state),
  };
}

const mapDispatchToProps: OnlinePaymentPageDispatchProps = {
  onOrder: onOrder,
  invalidateProductToken,
  fetchBraintreeToken: fetchToken,
  clearOrderFailureError: clearOrderFailureError,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePayment);
