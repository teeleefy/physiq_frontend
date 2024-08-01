import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
import '../styles/Allergy.css'


function Allergy({allergy, memberId}){

    function renderNotes(){
        if(allergy.notes){
            return (
                <>
                 <p><b>Notes:</b> {allergy.notes}</p>
                </>
            )
        }
    }

    return(
        <>
        <ListGroupItem>
            <Card className="Allergy-card">
                <CardBody>
                    <CardText>
                        <p><b>Allergy Name:</b> <NavLink className="Allergy-name" to={`/member/${memberId}/allergies/${allergy.id}`} key={allergy.id}>
                            {allergy.name}
                        </NavLink></p>
                        <p><b>Reaction:</b> {allergy.reaction}</p>
                        {renderNotes()}
                    </CardText>
                </CardBody>
            </Card>
        </ListGroupItem>    
        </>
     )
}

export default Allergy;