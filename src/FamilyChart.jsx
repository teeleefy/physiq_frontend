import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {FamilyContext} from "./auth/UserContext";
import PhysiqApi from "./Api.js";
import './styles/FamilyChart.css'

function FamilyChart(){
    let { currentFamily } = useContext(FamilyContext);

    function renderFamilyChart(){
        if(currentFamily){
            return (
                <>
                 <CardTitle className="text-center">
                    <h1 className="Home-title">Welcome to fa<b className='mychart'>m</b>il<b className='mychart'>y</b> <b className='mychart'>chart</b>!</h1>
                </CardTitle>
                <CardText>
                    <h2>First off, what is fa<b className='mychart'>m</b>il<b className='mychart'>y</b> <b className='mychart'>chart</b>? 👀</h2>
                    <p>That's simple! It is an easy-to-use app that allows you to chart on yourself and your loved ones!</p>
                    <h2>...And why would you want to do that? 🧐</h2>
                    <p>When it comes to managing your family's health care, there are a <b>LOT</b> of little details to keep track of! <b>When</b> was your child's last dentist appointment? <b>Who</b> was that doctor you saw last fall before you moved states? <b>What</b> is the name of that medication that doctor prescribed you, and <b>why</b> do you even take it?  <b>It's a lot to keep up with!</b></p>
                    <h2>That's where fa<b className='mychart'>m</b>il<b className='mychart'>y</b> <b className='mychart'>chart</b> comes in to play! 💪</h2>
                    <p>Here, you can add yourself and your family members to your group, connect to each member's personal portal, and add, edit, and delete their personal health-related details.  This will be a very helpful tool for you and your family as those details pile up over the years! After all, Nurses and Doctors keep records of your health journey... <b>Why can't you?</b></p>
                    <h2>Sounds great! How do I get started?? 👏</h2> 
                    <p><b>First,</b> add a member to your group in your Home Dashboard. &nbsp;<b>Next,</b> click their name to transport to their Member Portal. <b>From there,</b> navigate through the different tabs to add allergies, diagnoses, etc.  &nbsp;<b>Later,</b> you can easily update or delete these details from their respective pages in the Member Portal!</p>
                    <NavLink to="/home" >
                <Button className="FamilyChart-btn">Let's Get Started!</Button>
            </NavLink>
                </CardText>
                </>
            )
        }
        return (
            <div className="Home-btns">
            <CardTitle className="text-center">
                <h1 className="Home-title">Welcome to fa<b className='mychart'>m</b>il<b className='mychart'>y</b> <b className='mychart'>chart</b>!</h1>
            </CardTitle>
            <CardText className="Home-text">
                Keep track of your family's health, all in one, convenient place!
            </CardText>
            <NavLink to="/login" >
                <Button className="FamilyChart-btn">Login</Button>
            </NavLink>
           <NavLink to="/signup" >
                <Button className="FamilyChart-btn justify-content-center">Sign Up</Button>
            </NavLink>
            </div>
        )
    }


 return(
    <div id="FamilyChart-main">
        <div id="FamilyChart-message">
            {renderFamilyChart()} 
        </div>  
    </div>
 )
}

export default FamilyChart;