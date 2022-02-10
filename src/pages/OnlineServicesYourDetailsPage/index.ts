import { connect } from "react-redux";
import { RootState } from "app/store/types";
import OnlineServicesYourDetails, {
  YourDetailsPageStateProps,
  YourDetailsPageDispatchProps,
} from "./OnlineServicesYourDetails";
import {
  getCustomerDetails,
  getPostCodeLookUpAddresses,
  getSelectedOnlineService,
} from "../../app/store/selectors";
import {
  addCustomerDetails,
  fetchPostCodeAddress,
} from "../../app/store/reducer/checkout/actions";

function mapStateToProps(state: RootState): YourDetailsPageStateProps {
  return {
    customerDetails: getCustomerDetails(state),
    postCodeLookUpAddresses: getPostCodeLookUpAddresses(state),
    selectedOnlineService: getSelectedOnlineService(state),
  };
}

const mapDispatchToProps: YourDetailsPageDispatchProps = {
  fetchAddressesByPostcode: fetchPostCodeAddress,
  addCustomerDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineServicesYourDetails);
