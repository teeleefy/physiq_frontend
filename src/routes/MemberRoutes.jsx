//import react router
import { Routes, Route } from "react-router-dom";
//Component imports
import Member from "../members/Member"
import Allergies from "../members/allergies/Allergies.jsx";
import Diagnoses from "../members/diagnoses/Diagnoses.jsx";
import Doctors from "../members/doctors/Doctors.jsx";
import Insurance from "../members/insurance/Insurance.jsx";
import Meds from "../members/meds/Meds.jsx";
import Symptoms from "../members/symptoms/Symptoms.jsx";
import Visits from "../members/visits/Visits.jsx";
import Goals from "../members/goals/Goals.jsx";
import GoalNew from "../members/goals/GoalNew.jsx";
import GoalUpdate from "../members/goals/GoalUpdate.jsx";

function MemberRoutes() {
    return (
        <div className="pt-5">
          <Routes>
                <Route path="/" element={<Member/>}/>
                <Route path="/allergies" element={<Allergies/>}/>
                <Route path="/diagnoses" element={<Diagnoses/>}/>
                <Route path="/doctors" element={<Doctors/>}/>
                <Route path="/insurance" element={<Insurance/>}/>
                <Route path="/meds" element={<Meds/>}/>
                <Route path="/symptoms" element={<Symptoms/>}/>
                <Route path="/visits" element={<Visits/>}/>
                <Route path="/goals" element={<Goals/>}/>
                <Route path="/goals/add" element={<GoalNew/>}/>
                <Route path="/goals/:goalId" element={<GoalUpdate/>}/>
            </Routes>
        </div>
    );
  }
  
  export default MemberRoutes;
  