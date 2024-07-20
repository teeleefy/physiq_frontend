import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import {FamilyContext} from "./auth/UserContext";
import './styles/Home.css'

function Home(){
    let { currentFamily } = useContext(FamilyContext);

    function renderFamilyMembers(){
        if(currentFamily.familyMembers){
            return (
                <>
                 {currentFamily.familyMembers.map(member => (
                    <Button className="Home-familymember btn-dark">
                    <NavLink className="Home-navlink" to={`member/${member.id}`}>{member.firstName} {member.lastName}</NavLink>
                    </Button>
                    ))}
                </>

            )
        }
        return (
            <>
            
            </>
        )
    }

    function renderHomeMessage(){
        if(currentFamily){
            return(
                <div>
                <CardTitle className="text-center">
                    <h2>{currentFamily.name} Dashboard</h2> 
                </CardTitle> 
                <ListGroup>
                  {renderFamilyMembers()}  
                </ListGroup>
                </div>
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
            {renderHomeMessage()}
        </CardBody>
      </Card>
    </>
 )
}

export default Home;