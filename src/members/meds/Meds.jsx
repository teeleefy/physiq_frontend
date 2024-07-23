
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import Loading from "../../navigation/Loading";
import Med from './Med.jsx';
import '../styles/Med.css'

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
                    
                </ListGroup>
                <Button className="Meds-btn btn-dark m-3">
                    <NavLink className="Meds-navlink" to={`add`}>Add Meds</NavLink>
                </Button>
            </section>
    </>
     )
}

export default Meds;
