import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
import '../styles/Visit.css'


function Visit({visit, memberId}){

    return(
        <>
            <ListGroupItem className="Visit-card">
            <Card className="Visit-card">
                <CardBody>
                    <CardText>
                        
                        <p><b>Visit Name:</b> <NavLink className="Visit-name" to={`/member/${memberId}/visits/${visit.id}`} key={visit.id}>
                            {visit.title}
                        </NavLink></p>
                        <p><b>Date:</b> {visit.date}</p>
                        <p><b>Clinic Visited:</b> {visit.clinic}</p>
                        <p><b>Doctor Seen:</b> {visit.doctor}</p>
                        <p><b>Description:</b> {visit.description}</p>
                        <p><b>Notes:</b> {visit.notes}</p>
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Visit;