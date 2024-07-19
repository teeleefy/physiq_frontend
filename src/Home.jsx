import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "./auth/UserContext";
import './styles/Home.css'

function Home(){
    let { currentUser } = useContext(UserContext);
    function renderHomeMessage(){
        if(currentUser){
            return(
                <div>
                  <h2>Welcome Back, {currentUser.name}!</h2>   
                </div>
            )
        }
        return (
            <div className="Home-btns">
            <Button className="Home-btn justify-content-center btn-dark">
                <NavLink className="Home-navlink" to="/login" >Login</NavLink>         
            </Button>
            <Button className="Home-btn justify-content-center btn-dark">
                <NavLink className="Home-navlink" to="/signup" >Sign Up</NavLink>
            </Button>
            </div>
        )
    }

 return(
    <>
        <Card>
        <CardBody>
          <CardTitle className="text-center">
            <h1 className="Home-title">Welcome to fa<b className='mychart'>m</b>il<b className='mychart'>y</b> <b className='mychart'>chart</b>!</h1>
          </CardTitle>
          <CardText className="Home-text">
            Keep track of your family's health, all in one, convenient place!
          </CardText>
            {renderHomeMessage()}
        </CardBody>
      </Card>
    </>
 )
}

export default Home;