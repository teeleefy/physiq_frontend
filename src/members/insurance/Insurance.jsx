
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import '../styles/Allergies.css'
import Loading from "../../navigation/Loading";



function Insurance(){
    // const [allergies, setAllergies] = useState(null);
    // const { currentMember } = useContext(MemberContext);
   
    // useEffect(function getMemberAllergies(){
    //     async function getAllergies() {
    //       let allergies = await PhysiqApi.getMemberAllergies(currentMember.id);
    //       setAllergies(allergies);
    //     }
    //     getAllergies();
    //   }, []);
    
    // if(!currentMember) return <Loading />;
    // if(!allergies) return <Loading />;


    return(
    <>
            <section>
                <h1>This is the Insurance page</h1>
                {/* <ListGroup>
                    {allergies.map(allergy => (<Allergy allergy={allergy} memberId={currentMember.id} key={allergy.id}/>))}
                    <Button className="Allergies-btn btn-dark">
                        <NavLink className="Allergies-navlink" to={`add`}>Add Allergy</NavLink>
                    </Button>
                </ListGroup> */}
            </section>
    </>
     )
}

export default Insurance;
