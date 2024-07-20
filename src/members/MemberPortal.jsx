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
                setCurrentMember(member);
            }catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentFamily(null);
            }
        }
       setIsLoading(false); 
    }
    
    getCurrentMember();
  }, [id]);

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

  if (isLoading) return <Loading/>;



  
  return (
    <MemberContext.Provider value={{currentMember, setCurrentMember}}>
      <div className="MemberPortal">
          
          <div id="MemberPortal-main">
            <MemberNavBar/>
            <MemberRoutes update={updateMember}/>
          </div>
      </div>
    </MemberContext.Provider>  
  )
}

export default MemberPortal;
