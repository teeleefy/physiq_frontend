import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
  import '../styles/Med.css'


function Med({med, memberId}){

    function renderIndication(){
        if(med.indication){
            return (
                <>
                 <p><b>Indication:</b> {med.indication}</p>
                </>
            )
        }
    }

    function renderDose(){
        if(med.dose){
            return (
                <>
                 <p><b>Dose:</b> {med.dose}</p>
                </>
            )
        }
    }

    function renderStartDate(){
        if(med.startDate){
            return (
                <>
                 <p><b>Start Date:</b> {med.startDate}</p>
                </>
            )
        }
    }

    function renderEndDate(){
        if(med.endDate){
            return (
                <>
                 <p><b>End Date:</b> {med.endDate}</p>
                </>
            )
        }
    }

    function renderPrescriber(){
            if(med.prescriber){
                return (
                    <>
                    <p><b>Prescribed By:</b> {med.prescriber}</p>
                    </>
                )
            }
        }

    function renderNotes(){
        if(med.notes){
            return (
                <>
                 <p><b>Notes:</b> {med.notes}</p>
                </>
            )
        }
    }

    return(
        <>
            <ListGroupItem >
                <Card className="Med-card">
                    <CardBody>
                        <CardText>
                            <p><b>Medication Name:</b> <NavLink className="Med-name" to={`/member/${memberId}/meds/${med.id}`} key={med.id}>
                                {med.name}
                            </NavLink></p>
                            {renderIndication()}
                            {renderDose()}
                            {renderStartDate()}
                            {renderEndDate()}
                            {renderPrescriber()}
                            {renderNotes()}
                        </CardText>
                    </CardBody>
                </Card>
            </ListGroupItem>
        </>
     )
}

export default Med;