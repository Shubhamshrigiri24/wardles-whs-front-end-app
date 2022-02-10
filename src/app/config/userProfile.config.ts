import {
  getLocationPathName,
  trimURLPath,
} from "@welldigital/ui-common/Utils/navigation";
import { UserProfileProps } from "@welldigital/ui-common/Authentication";

const pathsWithNoLoginButton = ["login-options"];

export const getUserProfileProps = (): Partial<UserProfileProps> => {
  const currentPath = trimURLPath(getLocationPathName());
  return {
    isAuthenticationRequired: false, // PrivateRoute will do it
    shouldTriggerAuthentication: true, // even for private routes it wont conflict (there is only one request)
    shouldShowLoginWhenNotIsAuthenticationRequired:
      pathsWithNoLoginButton.every((path) => !currentPath.includes(path)),
  };
};
