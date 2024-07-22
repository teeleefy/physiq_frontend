
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import '../styles/Allergies.css'
import Loading from "../../navigation/Loading";
import Symptom from './Symptom.jsx';


function Symptoms(){
    const [symptoms, setSymptoms] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberSymptoms(){
        async function getSymptoms() {
          let symptoms = await PhysiqApi.getMemberSymptoms(currentMember.id);
          setSymptoms(symptoms);
        }
        getSymptoms();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!symptoms) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {symptoms.map(symptom => (<Symptom symptom={symptom} memberId={currentMember.id} key={symptom.id}/>))}
                    <Button className="Symptoms-btn btn-dark">
                        <NavLink className="Symptoms-navlink" to={`add`}>Add Symptoms</NavLink>
                    </Button>
                </ListGroup>
            </section>
    </>
     )
}

export default Symptoms;
