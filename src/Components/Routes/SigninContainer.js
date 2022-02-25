import Signin from "../../pages/Signin/Signin";
import {Route, Navigate} from 'react-router-dom' ;
import { useNavigate } from 'react-router-dom';

function SigninContainer  () {
  let navigate = useNavigate();
    return(
    <>
      <Route exact path="/"  render={() => {navigate("/signin");}} />
      <Route path="/signin" component={Signin} />
    </>
  )
}

export default SigninContainer;