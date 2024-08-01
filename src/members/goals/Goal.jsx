import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
import '../styles/Goal.css'


function Goal({goal, memberId}){

    function renderDetails(){
        if(goal.goalDetails){
            return (
                <>
                 <p><b>Details:</b> {goal.goalDetails}</p>
                </>
            )
        }
    }

    return(
        <>
            <ListGroupItem >
                <Card className="Goal-card">
                    <CardBody>
                        <CardText>
                            <p><b>Goal Name:</b> <NavLink className="Goal-name" to={`/member/${memberId}/goals/${goal.id}`} key={goal.id}>
                                {goal.goalName}
                            </NavLink></p>
                            {renderDetails()}
                        </CardText>
                    </CardBody>
                </Card>
            </ListGroupItem>
        </>
     )
}

export default Goal;