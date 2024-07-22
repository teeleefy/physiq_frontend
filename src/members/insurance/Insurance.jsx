
import {useState, useEffect, useContext} from "react";
import {MemberContext} from "../../auth/UserContext";
import { Button, Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import PhysiqApi from "../../Api.js";
import { useParams } from "react-router-dom";
import '../styles/Allergies.css'
import Loading from "../../navigation/Loading";
import InsuranceCard from './InsuranceCard.jsx';


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
                    <Button className="Insurance-btn btn-dark">
                        <NavLink className="Insurance-navlink" to={`add`}>Add Insurance</NavLink>
                    </Button>
                </ListGroup>
            </section>
    </>
     )
}

export default Insurance;
