//import react router
import { Routes, Route } from "react-router-dom";
//Component imports
import FamilyChart from "../FamilyChart";
import Home from "../Home";
import Login from "../auth/LoginForm";
import Signup from "../auth/SignupForm";
import MemberPortal from "../members/MemberPortal"
import FamilyProfile from "../families/FamilyProfile";
import NotFound from "../navigation/NotFound";
import PrivateFamilyRoute from "./PrivateFamilyRoute";
import PrivateMemberRoute from "./PrivateMemberRoute";
import FamilyMemberNew from "../families/FamilyMemberNew";


function AppRoutes({ login, logout, signup, updateFamily }) {
    return (
        <div>
          <Routes>
            <Route path="/" element={<FamilyChart/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/add" element={<PrivateFamilyRoute><FamilyMemberNew/></PrivateFamilyRoute>}/>
            <Route path="/profile" element={<PrivateFamilyRoute><FamilyProfile logout={logout} updateFamily={updateFamily}/></PrivateFamilyRoute>}/>
            <Route path="/login" element={<Login login={login}/>}/>
            <Route path="/signup" element={<Signup signup={signup}/>}/>
            <Route path="/member/:id/*" element={<PrivateMemberRoute><MemberPortal /></PrivateMemberRoute>}/>
            <Route path="*" element={<NotFound/>}/>
            {/* <Route path="/companies" element={<PrivateRoute><Companies/></PrivateRoute>}/>
            <Route path="/jobs" element={<PrivateRoute><Jobs/></PrivateRoute>}/>
            <Route path="/profile" element={<PrivateRoute><Profile update={update}/></PrivateRoute>}/>
            <Route path="/companies/:handle" element={<PrivateRoute><CompanyJobs/></PrivateRoute>}/>
            
            <Route path="*" element={<NotFound/>}/>  */}
        //   </Routes>
        </div>
    );
  }
  
  export default AppRoutes;
  