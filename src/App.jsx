//import custom hook for accessing local storage state
import useLocalStorageState from './hooks/useLocalStorageState';
//react basic imports
import { useState, useEffect } from "react";
import './styles/App.css'
import {decodeToken} from "react-jwt";

//api and context import
import PhysiqApi from "./Api.js";
import UserContext from "./auth/UserContext";

//Route and NavBar imports
import NavBar from "./navigation/NavBar.jsx";
import AppRoutes from "./routes/Routes.jsx";
import Loading from "./navigation/Loading.jsx"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] =useState();
  const [familyMemberIds, setFamilyMemberIds] = useState([]);
  const [token, setToken] = useLocalStorageState("token");

    // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { familyId, memberIds } = decodeToken(token);
          // put the token on the Api class so it can use it to call the API.
          PhysiqApi.token = token;
          let currentUser = await PhysiqApi.getCurrentFamily(familyId);
          let familyMemberIds = new Set(memberIds);
          setCurrentUser(currentUser);
          setFamilyMemberIds(familyMemberIds);
          
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
        // setIsLoading(false);
      }
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setIsLoading(false);
    getCurrentUser();
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

  async function updateUser(updatedUserData) {
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
    setCurrentUser(null);
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
    <UserContext.Provider value={{currentUser, token, setCurrentUser}}>
      <div className="App">
          <NavBar logout={logout}/>
          <main>
            <AppRoutes login={login} signup={signup} update={updateUser}/>
          </main>
      </div>
    </UserContext.Provider>  
  )
}

export default App
