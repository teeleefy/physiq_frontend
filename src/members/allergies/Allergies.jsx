
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import Loading from "../../navigation/Loading";
import Allergy from './Allergy.jsx';
import '../styles/Allergy.css'

function Allergies(){
    const [allergies, setAllergies] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberAllergies(){
        async function getAllergies() {
          let allergies = await PhysiqApi.getMemberAllergies(currentMember.id);
          setAllergies(allergies);
        }
        getAllergies();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!allergies) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {allergies.map(allergy => (<Allergy allergy={allergy} memberId={currentMember.id} key={allergy.id}/>))}
                    
                </ListGroup>
                <Button className="Allergies-btn btn-dark m-3">
                    <NavLink className="Allergies-navlink" to={`add`}>Add Allergy</NavLink>
                </Button>
            </section>
    </>
     )
}

export default Allergies;
