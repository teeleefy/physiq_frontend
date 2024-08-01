import { useContext } from "react";
import {MemberContext} from "../auth/UserContext";
import "./styles/MemberNavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";

/** Navigation bar for individual family members. Shows up on member's page.
 *
 * 
 * Rendered by Member.jsx.
 */

function MemberNavBar() {
    const { currentMember } = useContext(MemberContext);

    function renderNavLinks(){
        if(currentMember){
            return(
                <NavItem >
                    <NavLink id="MemberNavBar-name" className={"MemberNavBar-link"} to={`/member/${currentMember.id}`} key={currentMember.id}>{currentMember.firstName}</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/allergies`}>allergies</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/diagnoses`}>diagnoses</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/doctors`}>doctors</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/goals`}>goals</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/insurance`}>insurance</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/meds`}>meds</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/symptoms`}>symptoms</NavLink>
                    <NavLink className={"MemberNavBar-link"} to={`/member/${currentMember.id}/visits`}>visits</NavLink>
                </NavItem> 
            )
        }
        return (
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
        )
    }
 

  return (
    <div>
        <Navbar id="MemberNavBar">
            <Nav >
                {renderNavLinks()} 
            </Nav>
        </Navbar>
    </div>
  );
}

export default MemberNavBar;
