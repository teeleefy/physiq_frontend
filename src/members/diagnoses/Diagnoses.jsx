
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import Loading from "../../navigation/Loading";
import Diagnosis from './Diagnosis.jsx';
import '../styles/Diagnosis.css'

function Diagnoses(){
    const [diagnoses, setDiagnoses] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberDiagnoses(){
        async function getDiagnoses() {
          let diagnoses = await PhysiqApi.getMemberDiagnoses(currentMember.id);
          setDiagnoses(diagnoses);
        }
        getDiagnoses();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!diagnoses) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {diagnoses.map(diagnosis => (<Diagnosis diagnosis={diagnosis} memberId={currentMember.id} key={diagnosis.id}/>))}
                    
                </ListGroup>
                <Button className="Diagnoses-btn btn-dark m-3">
                    <NavLink className="Diagnoses-navlink" to={`add`}>Add Diagnosis</NavLink>
                </Button>
            </section>
    </>
     )
}

export default Diagnoses;
