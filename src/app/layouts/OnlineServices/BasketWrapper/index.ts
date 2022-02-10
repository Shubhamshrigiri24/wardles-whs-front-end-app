import { connect } from "react-redux";
import { RootState } from "app/store/types";
import BasketWrapper, { BasketWrapperStateProps } from "./BasketWrapper";
import {
  getSelectedPack,
  getSelectedProduct,
  getSelectedOnlineService,
} from "../../../store/selectors";

function mapStateToProps(
  state: RootState,
  ownProps: any
): BasketWrapperStateProps {
  return {
    selectedOnlineService: getSelectedOnlineService(state),
    product: getSelectedProduct(state),
    basketItem: getSelectedPack(state),
    ...ownProps,
  };
}

export default connect(mapStateToProps)(BasketWrapper);
