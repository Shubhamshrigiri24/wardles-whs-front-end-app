import Logo from '../../Assets/Logo.svg';
import './Navbar.css';
import Helpicon from "../../Assets/Helpicon.svg"


function Navbar() {


  return (

      <div className="nav-container">
              <img src={Logo} alt="error" className='logo' />

            <div className="help">
              <img src={Helpicon} alt="error" />
              <p className='helptext'>Help</p>
            </div>
          </div>
          
        );
      }


export default Navbar;


