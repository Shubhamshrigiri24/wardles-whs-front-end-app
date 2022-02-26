import { AccessComplete } from "../../API/userOps";
import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../Components/Navbar/Navbar";

function Login() {
  const { rnd, token } = useParams();
  let navigate = useNavigate();
  function completeRegistration(rnd, token) {
    AccessComplete(rnd, token);
    setTimeout(
      function () {
        //Start the timer
        if (localStorage.getItem("accessToken") !== undefined) {
          navigate(" * ");
        }
      }.bind(this),
      500
    );
  }
  return (
    <div>
      
      {completeRegistration(rnd, token)}
    </div>
  );
}

export default Login;
