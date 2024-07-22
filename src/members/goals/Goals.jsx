
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import '../styles/Allergies.css'
import Loading from "../../navigation/Loading";
import Goal from './Goal.jsx';


function Goals(){
    const [goals, setGoals] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberGoals(){
        async function getGoals() {
          let goals = await PhysiqApi.getMemberGoals(currentMember.id);
          setGoals(goals);
        }
        getGoals();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!goals) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {goals.map(goal => (<Goal goal={goal} memberId={currentMember.id} key={goal.id}/>))}
                    <Button className="Goals-btn btn-dark">
                        <NavLink className="Goals-navlink" to={`add`}>Add Goals</NavLink>
                    </Button>
                </ListGroup>
            </section>
    </>
     )
}

export default Goals;
