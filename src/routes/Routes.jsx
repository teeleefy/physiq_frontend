//import react router
import { Routes, Route } from "react-router-dom";
//Component imports
import Home from "../Home";
import Login from "../auth/LoginForm";
import Signup from "../auth/SignupForm";
import MemberPortal from "../members/MemberPortal"
import Profile from "../Profile";
import NotFound from "../NotFound";
import PrivateRoute from "./PrivateRoute";


function AppRoutes({ login, signup, update }) {
    return (
        <div className="pt-5">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login login={login}/>}/>
            <Route path="/signup" element={<Signup signup={signup}/>}/>
            <Route path="/member/:id/*" element={<MemberPortal />}/>
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
  