
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import '../styles/Allergies.css'
import Loading from "../../navigation/Loading";
import Med from './Med.jsx';


function Meds(){
    const [meds, setMeds] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberMeds(){
        async function getMeds() {
          let meds = await PhysiqApi.getMemberMeds(currentMember.id);
          setMeds(meds);
        }
        getMeds();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!meds) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {meds.map(med => (<Med med={med} memberId={currentMember.id} key={med.id}/>))}
                    <Button className="Meds-btn btn-dark">
                        <NavLink className="Meds-navlink" to={`add`}>Add Meds</NavLink>
                    </Button>
                </ListGroup>
            </section>
    </>
     )
}

export default Meds;
