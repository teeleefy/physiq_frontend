import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
// import '../styles/Allergy.css'


function Doctor({doctor, memberId}){

    return(
        <>
            <ListGroupItem>
            <Card className="Doctor-card">
                <CardBody>
                    <CardText>
                        <p><b>Doctor Name:</b> <NavLink className="Doctor-name" to={`/member/${memberId}/doctors/${doctor.id}`} key={doctor.id}>
                            {doctor.name}
                        </NavLink></p>
                        <p><b>Specialty:</b> {doctor.specialty}</p>
                        <p><b>Clinic:</b> {doctor.clinic}</p>
                        <p><b>Address:</b> {doctor.address}</p>
                        <p><b>Phone:</b> {doctor.phone}</p>
                        <p><b>Notes:</b> {doctor.notes}</p>
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Doctor;