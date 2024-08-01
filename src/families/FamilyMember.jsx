import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
  import './styles/FamilyMember.css'


function FamilyMember({familyMember}){

    function renderBirthday(){
        if(familyMember.birthday){
            return (
                <>
                 <p><b>Birthday:</b> {familyMember.birthday}</p>
                </>
            )
        }
    }

    return(
        <>
        <ListGroupItem>
            <Card className="FamilyMember-card">
                <CardBody>
                    <CardText>
                        <p><b>Name: </b>  
                            <NavLink className="FamilyMember-name" to={`/member/${familyMember.id}`} key={familyMember.id}>
                                 {familyMember.firstName} {familyMember.lastName}
                            </NavLink>
                        </p>
                        {renderBirthday()}
                    </CardText>
                </CardBody>
            </Card>
        </ListGroupItem>    
        </>
     )
}

export default FamilyMember;