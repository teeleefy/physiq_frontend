import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
import '../styles/Diagnosis.css'


function Diagnosis({diagnosis, memberId}){
    function renderNotes(){
        if(diagnosis.notes){
            return (
                <>
                 <p><b>Notes:</b> {diagnosis.notes}</p>
                </>
            )
        }
    }

    function renderDateReceived(){
        if(diagnosis.dateReceived){
            return (
                <>
                 <p><b>Date Received:</b> {diagnosis.dateReceived}</p>
                </>
            )
        }
    }

    return(
        <>
            <ListGroupItem>
                <Card className="Diagnosis-card">
                    <CardBody>
                        <CardText>
                            <p><b>Diagnosis Name:</b> <NavLink className="Diagnosis-name" to={`/member/${memberId}/diagnoses/${diagnosis.id}`} key={diagnosis.id}>
                                {diagnosis.name}
                            </NavLink></p>
                            {renderDateReceived()}
                            {renderNotes()}
                        </CardText>
                    </CardBody>
                </Card>
            </ListGroupItem>
        </>
     )
}

export default Diagnosis;