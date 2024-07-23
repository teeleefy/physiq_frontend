import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
import '../styles/Diagnosis.css'


function Diagnosis({diagnosis, memberId}){

    return(
        <>
            <ListGroupItem>
            <Card className="Allergy-card">
                <CardBody>
                    <CardText>
                        <p><b>Diagnosis Name:</b> <NavLink className="Diagnosis-name" to={`/member/${memberId}/diagnoses/${diagnosis.id}`} key={diagnosis.id}>
                            {diagnosis.name}
                        </NavLink></p>
                        <p><b>Date Received:</b> {diagnosis.dateReceived}</p>
                        <p><b>Notes:</b> {diagnosis.notes}</p>
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Diagnosis;