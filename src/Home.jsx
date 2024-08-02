import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {FamilyContext} from "./auth/UserContext";
import FamilyMember from "./families/FamilyMember";
import PhysiqApi from "./Api.js";
import './styles/Home.css'

function Home(){
    let { currentFamily, setCurrentFamily, setToken } = useContext(FamilyContext);
    const [isLoading, setIsLoading] = useState(true);
      
        useEffect(function loadFamilyInfo() {
          async function getCurrentFamily() {
                try{
                    let family = await PhysiqApi.getCurrentFamily(currentFamily.id);
                    console.log(family);
                    setCurrentFamily(family);
                }catch (err) {
                console.error("App loadUserInfo: problem loading", err);
                // setCurrentMember(null);
                
              }
             setIsLoading(false); 
          }
          getCurrentFamily();
        }, []);

    function renderFamilyMembers(){
        if(currentFamily.familyMembers){
            return (
                <>
                 {currentFamily.familyMembers.map(member => 
                    (<FamilyMember familyMember={member} key={member.id}/>))}
                </>
            )
        }
    }

    function renderHomeMessage(){
        if(currentFamily){
            return(
                <div>
                    <h1 className="Home-title text-center">{currentFamily.name} Dashboard</h1> 
                <ListGroup>
                  {renderFamilyMembers()}  
                </ListGroup>
                <NavLink to={`/add`}>
                    <Button className="Home-addMember btn-dark m-3">Add Member</Button>
                </NavLink>
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

            <NavLink to="/login" >
                <Button className="Home-btn">Login</Button>
            </NavLink>
                      
           <NavLink to="/signup" >
                <Button className="Home-btn justify-content-center">Sign Up</Button>
            </NavLink>
            </div>
        )
    }

 return(
    <div id="Home-main">
        <div id="Home-message">

            {renderHomeMessage()} 
        </div>
           
    </div>
 )
}

export default Home;