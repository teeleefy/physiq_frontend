import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
// import '../styles/Allergy.css'


function Symptom({symptom, memberId}){

    return(
        <>
            <ListGroupItem>
            <Card className="Symptom-card">
                <CardBody>
                    <CardText>
                        <p><b>Symptom Name:</b> <NavLink className="Symptom-name" to={`/member/${memberId}/symptoms/${symptom.id}`} key={symptom.id}>
                            {symptom.name}
                        </NavLink></p>
                        <p><b>Start Date:</b> {symptom.startDate}</p>
                        <p><b>End Date:</b> {symptom.endDate}</p>
                        <p><b>Notes:</b> {symptom.notes}</p>
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Symptom;