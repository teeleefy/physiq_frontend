//import react router
import { Routes, Route } from "react-router-dom";
//Component imports
import Member from "../members/Member"
//allergies
import Allergies from "../members/allergies/Allergies.jsx";
import AllergyNew from "../members/allergies/AllergyNew.jsx";
import AllergyUpdate from "../members/allergies/AllergyUpdate.jsx";
//diagnoses
import Diagnoses from "../members/diagnoses/Diagnoses.jsx";
import DiagnosisNew from "../members/diagnoses/DiagnosisNew.jsx";
import DiagnosisUpdate from "../members/diagnoses/DiagnosisUpdate.jsx";
//doctors
import Doctors from "../members/doctors/Doctors.jsx";
import DoctorNew from "../members/doctors/DoctorNew.jsx";
import DoctorUpdate from "../members/doctors/DoctorUpdate.jsx";
//insurance
import Insurance from "../members/insurance/Insurance.jsx";
import InsuranceNew from "../members/insurance/InsuranceNew.jsx";
import InsuranceUpdate from "../members/insurance/InsuranceUpdate.jsx";
//meds
import Meds from "../members/meds/Meds.jsx";
import MedNew from "../members/meds/MedNew.jsx";
import MedUpdate from "../members/meds/MedUpdate.jsx";
//symptoms
import Symptoms from "../members/symptoms/Symptoms.jsx";
import SymptomNew from "../members/symptoms/SymptomNew.jsx";
import SymptomUpdate from "../members/symptoms/SymptomUpdate.jsx";
//visits
import Visits from "../members/visits/Visits.jsx";
import VisitNew from "../members/visits/VisitNew.jsx";
import VisitUpdate from "../members/visits/VisitUpdate.jsx";
//goals
import Goals from "../members/goals/Goals.jsx";
import GoalNew from "../members/goals/GoalNew.jsx";
import GoalUpdate from "../members/goals/GoalUpdate.jsx";
//other
import NotFound from "../navigation/NotFound.jsx";
//import getDate
import getDate from "../helpers/getDate"

function MemberRoutes({updateMember}) {
    return (
        <div className="pt-3">
          <Routes>
                <Route path="/" element={<Member updateMember={updateMember} getDate={getDate}/>}/>
                <Route path="/allergies" element={<Allergies/>}/>
                <Route path="/allergies/add" element={<AllergyNew/>}/>
                <Route path="/allergies/:allergyId" element={<AllergyUpdate/>}/>
                <Route path="/diagnoses" element={<Diagnoses/>}/>
                <Route path="/diagnoses/add" element={<DiagnosisNew getDate={getDate}/>}/>
                <Route path="/diagnoses/:diagnosisId" element={<DiagnosisUpdate getDate={getDate}/>}/>
                <Route path="/doctors" element={<Doctors/>}/>
                <Route path="/doctors/add" element={<DoctorNew/>}/>
                <Route path="/doctors/:doctorId" element={<DoctorUpdate/>}/>
                <Route path="/insurance" element={<Insurance/>}/>
                <Route path="/insurance/add" element={<InsuranceNew getDate={getDate}/>}/>
                <Route path="/insurance/:insuranceId" element={<InsuranceUpdate getDate={getDate}/>}/>
                <Route path="/meds" element={<Meds/>}/>
                <Route path="/meds/add" element={<MedNew getDate={getDate}/>}/>
                <Route path="/meds/:medId" element={<MedUpdate getDate={getDate}/>}/>
                <Route path="/symptoms" element={<Symptoms/>}/>
                <Route path="/symptoms/add" element={<SymptomNew getDate={getDate}/>}/>
                <Route path="/symptoms/:symptomId" element={<SymptomUpdate getDate={getDate}/>}/>
                <Route path="/visits" element={<Visits/>}/>
                 <Route path="/visits/add" element={<VisitNew />}/>
                <Route path="/visits/:visitId" element={<VisitUpdate getDate={getDate}/>}/>
                <Route path="/goals" element={<Goals/>}/>
                <Route path="/goals/add" element={<GoalNew/>}/>
                <Route path="/goals/:goalId" element={<GoalUpdate/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
  }
  
  export default MemberRoutes;
  