import logo from '../../Assets/logo.svg';
import Questionblack from '../../Assets/Questionblack.svg';
import './Navbar.css';


function Navbar() {


  return (
    <div className="nav-container">
        <img src={logo} alt="error" className='logo' />

      <div className="help">
        <img className='help-icon' src={Questionblack} alt="error" />
        <a href = " " className='helptext'>Help</a>
      </div>
    </div>
    
  );
}

export default Navbar;


