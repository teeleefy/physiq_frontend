
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import '../styles/Allergies.css'
import Loading from "../../navigation/Loading";
import Doctor from './Doctor.jsx';


function Doctors(){
    const [doctors, setDoctors] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberDoctors(){
        async function getDoctors() {
          let doctors = await PhysiqApi.getMemberDoctors(currentMember.id);
          setDoctors(doctors);
        }
        getDoctors();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!doctors) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {doctors.map(doctor => (<Doctor doctor={doctor} memberId={currentMember.id} key={doctor.id}/>))}
                    <Button className="Doctors-btn btn-dark">
                        <NavLink className="Doctors-navlink" to={`add`}>Add Doctor</NavLink>
                    </Button>
                </ListGroup>
            </section>
    </>
     )
}

export default Doctors;
