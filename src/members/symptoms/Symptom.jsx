import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
  import '../styles/Symptom.css'


function Symptom({symptom, memberId}){

    function renderStartDate(){
        if(symptom.startDate){
            return (
                <>
                 <p><b>Start Date:</b> {symptom.startDate}</p>
                </>
            )
        }
    }

    function renderEndDate(){
        if(symptom.endDate){
            return (
                <>
                 <p><b>End Date:</b> {symptom.endDate}</p>
                </>
            )
        }
    }

    function renderNotes(){
        if(symptom.notes){
            return (
                <>
                 <p><b>Notes:</b> {symptom.notes}</p>
                </>
            )
        }
    }

    return(
        <>
            <ListGroupItem >
                <Card className="Symptom-card">
                    <CardBody>
                        <CardText>
                            <p><b>Symptom Name:</b> <NavLink className="Symptom-name" to={`/member/${memberId}/symptoms/${symptom.id}`} key={symptom.id}>
                                {symptom.name}
                            </NavLink></p>
                            {renderStartDate()}
                            {renderEndDate()}
                            {renderNotes()}
                        </CardText>
                    </CardBody>
                </Card>
            </ListGroupItem>
        </>
     )
}

export default Symptom;