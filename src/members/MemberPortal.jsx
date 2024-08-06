//react basic imports
import { useState, useEffect } from "react";
import './styles/MemberPortal.css'

//api and context import
import PhysiqApi from "../Api.js";
import { MemberContext } from "../auth/UserContext";
import { useParams } from "react-router-dom";
//Route and NavBar imports
import MemberNavBar from "../navigation/MemberNavBar.jsx";
import MemberRoutes from "../routes/MemberRoutes.jsx";
import Loading from "../navigation/Loading.jsx"

function MemberPortal() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMember, setCurrentMember] =useState();
  let { id } = useParams();

  useEffect(function loadMemberInfo() {
    async function getCurrentMember() {
        if(id){
            try{
                let member = await PhysiqApi.getMember(id);
                // console.log('MEMBER PORTAL', member)
                setCurrentMember(member);
            }catch (err) {
            console.error("App loadMemberInfo: problem loading", err);
            setCurrentMember(null);
            }
        }
       setIsLoading(false); 
    }
    
    getCurrentMember();
  }, []);

  async function updateMember(updatedMemberData) {
    try {
      let updatedMember = await PhysiqApi.updateMember(currentMember.id, updatedMemberData);
      setCurrentMember(updatedMember);
      return { success: true };
    } catch (errors) {
      console.error("Save failed", errors);
      return { success: false, errors };
    }
  }

  
    if (!currentMember && isLoading) return <Loading/>;

  return (
    <MemberContext.Provider value={{currentMember, setCurrentMember}}>
      <div className="MemberPortal">
          
          <div id="MemberPortal-main">
            <div className="MemberPortal-navbar"><MemberNavBar/></div>
              <MemberRoutes updateMember={updateMember} />  
          </div>
      </div>
    </MemberContext.Provider>  
  )
}

export default MemberPortal;
