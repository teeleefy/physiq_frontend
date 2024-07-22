import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
// import '../styles/Allergy.css'


function Med({med, memberId}){

    return(
        <>
            <ListGroupItem>
            <Card className="Med-card">
                <CardBody>
                    <CardText>
                        <p><b>Medication Name:</b> <NavLink className="Med-name" to={`/member/${memberId}/meds/${med.id}`} key={med.id}>
                            {med.name}
                        </NavLink></p>
                        <p><b>Indication:</b> {med.indication}</p>
                        <p><b>Dose:</b> {med.dose}</p>
                        <p><b>Start Date:</b> {med.startDate}</p>
                        <p><b>End Date:</b> {med.endDate}</p>
                        <p><b>Prescribed By:</b> {med.prescriber}</p>
                        <p><b>Notes:</b> {med.notes}</p>
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Med;