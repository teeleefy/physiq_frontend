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


  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if(month<10){
        month = `0${month}`
    }
    let date = today.getDate();
    if(date<10){
        date = `0${date}`
    }
    return `${year}-${month}-${date}`;
  }
  
  return (
    <MemberContext.Provider value={{currentMember, setCurrentMember}}>
      <div className="MemberPortal">
          
          <div id="MemberPortal-main">
            <div className="MemberPortal-navbar"><MemberNavBar/></div>
            {/* <div className="MemberPortal-portal"> */}
              <MemberRoutes update={updateMember} getDate={getDate}/>  
            {/* </div> */}
            
          </div>
      </div>
    </MemberContext.Provider>  
  )
}

export default MemberPortal;
