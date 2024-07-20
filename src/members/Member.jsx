import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
import {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import PhysiqApi from "../Api.js";
import { NavLink } from "react-router-dom";
import MemberNavBar from "../navigation/MemberNavBar.jsx";
import Loading from "../navigation/Loading";
import './styles/Member.css'
import {MemberContext} from "../auth/UserContext";

function Member(){
    let { id } = useParams();
    const { currentMember } = useContext(MemberContext);
    
    
    if(!currentMember) return <Loading />;

    return(
        <>
        
          <h1>Hello, {currentMember.firstName} {currentMember.lastName}. This is the Member Component. </h1>
        
        </>
        
     )
}

export default Member;