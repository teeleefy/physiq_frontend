
import "./styles/Footer.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";


/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Footer() {
  return (
    <div>
        
                    <NavLink id="Footer-linkedin" className="Footer-navlink" to="https://tammypainter.carrd.co/"><i className="fa-solid fa-user"></i></NavLink>
                    <NavLink id="Footer-linkedin" className="Footer-navlink" to="https://www.linkedin.com/in/tammy-painter-73416b282/"><i className="fa-brands fa-linkedin"></i></NavLink>
                    <NavLink  id="Footer-github" className="Footer-navlink" to="https://github.com/teeleefy"><i className="fa-brands fa-github"></i></NavLink>
                    <NavLink id="Footer-envelope" className="Footer-navlink" to="mailto:tammypainter.codes@gmail.com"><i className="fa-regular fa-envelope"></i></NavLink>
    </div>
  );
}

export default Footer;
