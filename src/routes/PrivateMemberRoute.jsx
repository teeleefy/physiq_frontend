import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FamilyContext } from "../auth/UserContext";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateMemberRoute({ children }) {
    const { token, currentFamily } = useContext(FamilyContext);
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        if (!token || !currentFamily) {
            navigate('/');
        }
        if(currentFamily){
           let memberBelongsToCurrentFamily = currentFamily.memberIds.includes(+id);
            if(!memberBelongsToCurrentFamily){
                navigate('/');
            } 
        }
    },[token, currentFamily])

    if (!token || !currentFamily) {
        return null;
    }

  return children;
}

export default PrivateMemberRoute;
