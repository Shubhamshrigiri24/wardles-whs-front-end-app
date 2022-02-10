import { connect } from "react-redux";
import {
  OnlineServicesConsultation,
  OnlineServicesConsultationDispatchProps,
} from "./OnlineServicesConsultation";
import {
  startTripetto,
  makeSetConsultation,
  setIsConsultationValidForOrder,
  sendHana1315Email,
} from "app/store/reducer/online/actions";

const mapDispatchToProps: (
  dispatch: any
) => OnlineServicesConsultationDispatchProps = (dispatch) => ({
  runTripetto: (...args) => dispatch(startTripetto(...args)),
  setConsultation: makeSetConsultation(dispatch),
  setIsConsultationValidForOrder: (...args) =>
    dispatch(setIsConsultationValidForOrder(...args)),
  sendHana1315Email: (...args) => dispatch(sendHana1315Email(...args)),
});

export default connect(null, mapDispatchToProps)(OnlineServicesConsultation);
