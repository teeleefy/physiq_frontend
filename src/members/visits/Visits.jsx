
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import Loading from "../../navigation/Loading";
import Visit from './Visit.jsx';
import '../styles/Visit.css'

function Visits(){
    const [visits, setVisits] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberVisits(){
        async function getVisits() {
          let visits = await PhysiqApi.getMemberVisits(currentMember.id);
          setVisits(visits);
        }
        getVisits();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!visits) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {visits.map(visit => (<Visit visit={visit} memberId={currentMember.id} key={visit.id}/>))}
                    
                </ListGroup>
                <Button className="Visits-btn btn-dark m-3">
                    <NavLink className="Visits-navlink" to={`add`}>Add Visits</NavLink>
                </Button>
            </section>
            
    </>
     )
}

export default Visits;
