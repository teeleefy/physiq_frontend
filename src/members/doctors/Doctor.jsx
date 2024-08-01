import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
  import '../styles/Doctor.css'


function Doctor({doctor, memberId}){

    function renderClinic(){
        if(doctor.clinic){
            return (
                <>
                 <p><b>Clinic:</b> {doctor.clinic}</p>
                </>
            )
        }
    }

    function renderAddress(){
        if(doctor.address){
            return (
                <>
                 <p><b>Address:</b> {doctor.address}</p>
                </>
            )
        }
    }

    function renderPhone(){
        if(doctor.phone){
            return (
                <>
                 <p><b>Phone:</b> {doctor.phone}</p>
                </>
            )
        }
    }

    function renderNotes(){
        if(doctor.notes){
            return (
                <>
                 <p><b>Notes:</b> {doctor.notes}</p>
                </>
            )
        }
    }
    

    return(
        <>
            <ListGroupItem >
            <Card className="Doctor-card">
                <CardBody>
                    <CardText>
                        <p><b>Doctor Name:</b> <NavLink className="Doctor-name" to={`/member/${memberId}/doctors/${doctor.id}`} key={doctor.id}>
                            {doctor.name}
                        </NavLink></p>
                        <p><b>Specialty:</b> {doctor.specialty}</p>
                        {renderClinic()}
                        {renderAddress()}
                        {renderPhone()}
                        {renderNotes()}
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Doctor;