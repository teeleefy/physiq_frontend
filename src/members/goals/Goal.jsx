import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
// import '../styles/Allergy.css'


function Goal({goal, memberId}){

    return(
        <>
            <ListGroupItem>
            <Card className="Goal-card">
                <CardBody>
                    <CardText>
                        <p><b>Goal Name:</b> <NavLink className="Goal-name" to={`/member/${memberId}/goals/${goal.id}`} key={goal.id}>
                            {goal.goalName}
                        </NavLink></p>
                        <p><b>Details:</b> {goal.goalDetails}</p>
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Goal;