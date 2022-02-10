import { connect } from "react-redux";

import DeliveryDetailsPage, {
  DeliveryDetailsPageStateProps,
  DeliveryDetailsPageDispatchProps,
} from "./DeliveryDetailsPage";
import { RootState } from "../../app/store/types";
import {
  getCustomerDetails,
  getPostCodeLookUpAddresses,
  getSelectedOnlineService,
} from "../../app/store/selectors";
import {
  addDeliveryDetails,
  fetchPostCodeAddress,
} from "../../app/store/reducer/checkout/actions";

function mapStateToProps(state: RootState): DeliveryDetailsPageStateProps {
  return {
    customerDetails: getCustomerDetails(state),
    postCodeLookUpAddresses: getPostCodeLookUpAddresses(state),
    selectedService: getSelectedOnlineService(state),
  };
}

const mapDispatchToProps: DeliveryDetailsPageDispatchProps = {
  addDeliveryDetails,
  fetchPostCodeAddress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryDetailsPage);
