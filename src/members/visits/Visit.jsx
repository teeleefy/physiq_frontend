import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
import '../styles/Visit.css'


function Visit({visit, memberId}){

    function renderDate(){
        if(visit.date){
            return (
                <>
                <p><b>Date:</b> {visit.date}</p>
                </>
            )
        }
    }
    function renderDoctor(){
        if(visit.doctor){
            return (
                <>
                <p><b>Doctor Seen:</b> {visit.doctor}</p>
                </>
            )
        }
    }

    function renderClinic(){
        if(visit.clinic){
            return (
                <>
                <p><b>Clinic Visited:</b> {visit.clinic}</p>
                </>
            )
        }
    }

    function renderNotes(){
        if(visit.notes){
            return (
                <>
                <p><b>Notes:</b> {visit.notes}</p>
                </>
            )
        }
    }

    return(
        <>
            <ListGroupItem >
                <Card className="Visit-card">
                    <CardBody>
                        <CardText>
                            
                            <p><b>Visit Name:</b> <NavLink className="Visit-name" to={`/member/${memberId}/visits/${visit.id}`} key={visit.id}>
                                {visit.title}
                            </NavLink></p>
                            {renderDate()}
                            {renderDoctor()}
                            {renderClinic()}
                            {renderNotes()}
                        </CardText>
                    </CardBody>
                </Card>
            </ListGroupItem>
        </>
     )
}

export default Visit;