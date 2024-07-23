
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import Loading from "../../navigation/Loading";
import Symptom from './Symptom.jsx';
import '../styles/Symptom.css'

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
                    
                </ListGroup>
                <Button className="Symptoms-btn btn-dark m-3">
                    <NavLink className="Symptoms-navlink" to={`add`}>Add Symptoms</NavLink>
                </Button>
            </section>
    </>
     )
}

export default Symptoms;
