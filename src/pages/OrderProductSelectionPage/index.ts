import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState, AppActions } from "../../app/store/types";
import {
  OrderProductSelectionPage,
  OrderProductSelectionDispatchProps,
} from "./OrderProductSelectionPage";

import {
  setPack,
  setOnlineService,
} from "../../app/store/reducer/online/actions";

import { SetProductAction } from "app/store/reducer/order/actions";

import {
  getOnlineServices,
  getSelectedOnlineService,
} from "../../app/store/selectors";

import { getConsultationResponses } from "app/store/reducer/online/selectors";

function mapStateToProps(state: RootState) {
  return {
    services: getOnlineServices(state),
    selectedService: getSelectedOnlineService(state),
    consultation: getConsultationResponses(state.online),
  };
}

const mapDispatchToProps: (
  dispatch: Dispatch<AppActions>
) => OrderProductSelectionDispatchProps = (dispatch: Dispatch<AppActions>) => ({
  setPack: (...args) => dispatch(setPack(...args)),
  setProduct: (...args) => dispatch(SetProductAction(...args)),
  setOnlineService: (...args) => dispatch(setOnlineService(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderProductSelectionPage);
