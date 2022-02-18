import logo from '../Assets/logo.svg';
import Questionblack from '../Assets/Questionblack.svg';
import './Navbar.css';


function Navbar() {


  return (
    <div className="nav-container">
        <img src={logo} alt="error" className='logo' />

      <div className="help">
        <img src={Questionblack} alt="error" />
        <p className='helptext'>Help</p>
      </div>
    </div>
    
  );
}

export default Navbar;


