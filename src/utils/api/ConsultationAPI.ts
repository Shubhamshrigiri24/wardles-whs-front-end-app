import ApiHandler from "./ApiHandler";
import { CONSULTATION_ROUTES } from "./const";

const ConsultationAPI = {
  sendInfoToReferral: (body: Object) =>
    ApiHandler.post({
      url: `${CONSULTATION_ROUTES.referral()}`,
      credentials: "include",
      body,
    }),
  validate: (token: string, email: string) =>
    ApiHandler.post({
      url: CONSULTATION_ROUTES.validate(),
      body: { token, email },
      credentials: "include",
    }),
};

export default ConsultationAPI;
