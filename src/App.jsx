//import custom hook for accessing local storage state
import useLocalStorageState from './hooks/useLocalStorageState';
//react basic imports
import { useState, useEffect } from "react";
import './styles/App.css'
import {decodeToken} from "react-jwt";

//api and context import
import PhysiqApi from "./Api.js";
import {FamilyContext} from "./auth/UserContext";
import { useNavigate } from "react-router-dom";
//Route and NavBar imports
import NavBar from "./navigation/NavBar.jsx";
import Footer from "./navigation/Footer.jsx";
import AppRoutes from "./routes/Routes.jsx";
import Loading from "./navigation/Loading.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFamily, setCurrentFamily] =useState();
  const [token, setToken] = useLocalStorageState("token");
  let navigate = useNavigate();
    // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadFamilyInfo() {
    async function getCurrentFamily() {
      if (token) {
        try {
          let { familyId} = decodeToken(token);
          // put the token on the Api class so it can use it to call the API.
          PhysiqApi.token = token;
          let currentFamily = await PhysiqApi.getCurrentFamily(familyId);
          setCurrentFamily(currentFamily);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentFamily(null);
        }
      }
    }
    // set infoLoaded to false while async getCurrentFamily runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the Loading Component.
    setIsLoading(false);
    getCurrentFamily();
  }, [token]);

   

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await PhysiqApi.loginUser(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function updateFamily(updatedFamilyData) {
    try {
      let updatedFamily = await PhysiqApi.updateCurrentFamily(currentFamily.id, updatedFamilyData);
      setCurrentFamily(updatedFamily);
      return { success: true };
    } catch (errors) {
      console.error("Save failed", errors);
      return { success: false, errors };
    }
  }


  /** Handles site-wide logout. */
  function logout() {
    toast.success('Logged Out!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      }); 
    setCurrentFamily(null);
    setToken(null);
    navigate("/");
  }

   /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
   async function signup(signupData) {
    try {
      let token = await PhysiqApi.signupUser(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }



  if (isLoading) return <Loading/>;

  return (
    <FamilyContext.Provider value={{currentFamily, token, setToken, setCurrentFamily}}>
      <div className="App">
        <div id="main-navbar"><NavBar logout={logout}/></div>
          
          
          <main id="App-main">
            <AppRoutes login={login} logout={logout} signup={signup} updateFamily={updateFamily}/>
            
          </main>
         <div id="footer"><Footer /></div> 
         <ToastContainer />
      </div>
      
    </FamilyContext.Provider>  
  )
}

export default App
