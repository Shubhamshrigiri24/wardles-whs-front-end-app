import { connect } from "react-redux";
import { RootState } from "../../app/store/types";
import OrderConfirmationPage, {
  OrderConfirmationStateProps,
  OrderConfirmationDispatchProps,
} from "./OrderConfirmation";
import {
  getOnlineOrderNumber,
  getSelectedProduct,
  getSelectedOnlineService,
  getSelectedPack,
  getOnlineConsultation,
} from "../../app/store/selectors";

function mapStateToProps(state: RootState): OrderConfirmationStateProps {
  return {
    selectedOnlineService: getSelectedOnlineService(state),
    selectedProduct: getSelectedProduct(state),
    selectedPack: getSelectedPack(state),
    orderNumber: getOnlineOrderNumber(state),
    onlineConsultation: getOnlineConsultation(state),
  };
}

const mapDispatchToProps: OrderConfirmationDispatchProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderConfirmationPage);
