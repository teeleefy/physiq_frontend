import { useContext } from "react";
import {FamilyContext} from "../auth/UserContext";
import "./styles/NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";


/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentFamily } = useContext(FamilyContext);

  function renderNavLinks(){
    if(currentFamily){
        return(
            <Nav className="ml-auto" navbar>
                <NavItem>
                <NavLink to="/home">home</NavLink>
                <NavLink to="/profile">profile</NavLink>
                <NavLink to="/" onClick={logout} id="Navbar-logout">log out</NavLink>
                </NavItem>
            </Nav> 
        )
    }
    return (
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </NavItem>
        </Nav>
    )
}

  return (
    <div>
        <Navbar expand="md">
            <NavLink to="/" className="navbar-brand">
            fa<b className='mychart'>m</b>il<b className='mychart'>y</b> <b className='mychart'>chart</b>
            </NavLink>
            {renderNavLinks()}
        </Navbar>
    </div>
  );
}

export default NavBar;
