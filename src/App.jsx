//import custom hook for accessing local storage state
import useLocalStorageState from './hooks/useLocalStorageState';
//react basic imports
import { useState, useEffect } from "react";
import './styles/App.css'
import {decodeToken} from "react-jwt";

//api and context import
import PhysiqApi from "./Api.js";
import {FamilyContext} from "./auth/UserContext";
import { useParams } from "react-router-dom";
//Route and NavBar imports
import NavBar from "./navigation/NavBar.jsx";
import Footer from "./navigation/Footer.jsx";
import AppRoutes from "./routes/Routes.jsx";
import Loading from "./navigation/Loading.jsx"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFamily, setCurrentFamily] =useState();
  const [familyMemberIds, setFamilyMemberIds] = useState([]);
  const [token, setToken] = useLocalStorageState("token");

    // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadFamilyInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentFamily() {
      if (token) {
        try {
          let { familyId, memberIds } = decodeToken(token);
          console.log("memberIds from Token",memberIds);
          // put the token on the Api class so it can use it to call the API.
          PhysiqApi.token = token;
          let currentFamily = await PhysiqApi.getCurrentFamily(familyId);
          let familyMemberIds = memberIds;
          console.log("familyMemberIds",familyMemberIds);
          setCurrentFamily(currentFamily);
          setFamilyMemberIds(familyMemberIds);
          
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentFamily(null);
        }
        // setIsLoading(false);
      }
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
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

  async function updateFamily(updatedUserData) {
    try {
      let updatedUser = await PhysiqApi.updateCurrentFamily(currentUser.id, updatedUserData);
      setCurrentUser(updatedUser);
      return { success: true };
    } catch (errors) {
      console.error("Save failed", errors);
      return { success: false, errors };
    }
  }


  /** Handles site-wide logout. */
  function logout() {
    setCurrentFamily(null);
    setToken(null);
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
    <FamilyContext.Provider value={{currentFamily, token, setCurrentFamily, familyMemberIds}}>
      <div className="App">
        <div id="main-navbar"><NavBar logout={logout}/></div>
          
          
          <main>
            <AppRoutes login={login} signup={signup} update={updateFamily}/>
            
          </main>
         <div id="footer"><Footer /></div> 
      </div>
      
    </FamilyContext.Provider>  
  )
}

export default App
