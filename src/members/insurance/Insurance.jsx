
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import Loading from "../../navigation/Loading";
import InsuranceCard from './InsuranceCard.jsx';
import '../styles/Insurance.css'

function Insurance(){
    const [insurance, setInsurance] = useState(null);
    const { currentMember } = useContext(MemberContext);
   
    useEffect(function getMemberInsurance(){
        async function getInsurance() {
          let insurance = await PhysiqApi.getMemberInsurance(currentMember.id);
          setInsurance(insurance);
        }
        getInsurance();
      }, []);
    
    if(!currentMember) return <Loading />;
    if(!insurance) return <Loading />;


    return(
    <>
            <section>
                <ListGroup>
                    {insurance.map(ins => (<InsuranceCard insurance={ins} memberId={currentMember.id} key={ins.id}/>))}
                    
                </ListGroup>
                <Button className="Insurance-btn btn-dark m-3">
                    <NavLink className="Insurance-navlink" to={`add`}>Add Insurance</NavLink>
                </Button>
            </section>
    </>
     )
}

export default Insurance;
