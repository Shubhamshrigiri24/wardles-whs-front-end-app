import { connect } from "react-redux";
import { RootState } from "../../app/store/types";
import ProductSelectionPage, {
  ProductSelectionStateProps,
  ProductSelectionDispatchProps,
} from "./ProductSelectionPage";
import {
  setProduct,
  setPack,
  fetchProducts,
  setOnlineService,
  checkProductToken,
  setProductToken,
  makeSetConsultation,
} from "../../app/store/reducer/online/actions";
import {
  getProducts,
  getProductsFetching,
  getOnlineServices,
  makeGetEligiblePacks,
  getSelectedOnlineService,
  getProductTokenValid,
  getProductToken,
} from "../../app/store/selectors";
import {
  getConsultationResponses,
  getSelectedProduct,
} from "app/store/reducer/online/selectors";
import { Action, Dispatch } from "redux";

function mapStateToProps(state: RootState): ProductSelectionStateProps {
  return {
    products: getProducts(state),
    productToken: getProductToken(state),
    productTokenValid: getProductTokenValid(state),
    selectedProduct: getSelectedProduct(state.online),
    getEligiblePacks: makeGetEligiblePacks(state),
    fetching: getProductsFetching(state),
    services: getOnlineServices(state),
    selectedService: getSelectedOnlineService(state),
    consultation: getConsultationResponses(state.online),
  };
}

const mapDispatchToProps: (
  dispatch: Dispatch<Action>
) => ProductSelectionDispatchProps = (dispatch: Dispatch<Action>) => ({
  setPack: (...args) => dispatch(setPack(...args)),
  fetchProducts: (...args) => dispatch(fetchProducts(...args)),
  setProductToken: (...args) => dispatch(setProductToken(...args)),
  checkProductToken: (...args) => dispatch(checkProductToken(...args)),
  setProduct: (...args) => dispatch(setProduct(...args)),
  setOnlineService: (...args) => dispatch(setOnlineService(...args)),
  setConsultation: makeSetConsultation(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSelectionPage);
