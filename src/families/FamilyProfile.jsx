import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import PhysiqApi from "../Api.js";
import Loading from "../navigation/Loading";
import './styles/FamilyMember.css'
import {FamilyContext} from "../auth/UserContext";
import { toast } from 'react-toastify';

function FamilyProfile({logout, updateFamily}){
    let { currentFamily, setCurrentFamily } = useContext(FamilyContext);
    // console.log("FAMILY PROFILE", currentFamily);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [emailFormMessages, setEmailFormMessages] = useState([]);
    const [nameFormMessages, setNameFormMessages] = useState([]);
    const [passwordFormMessages, setPasswordFormMessages] = useState([]);
    const [deleteFormMessages, setDeleteFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [emailFormData, setEmailFormData] = useState({email: currentFamily.email});
    const [nameFormData, setNameFormData] = useState({name: currentFamily.name});
    const [passwordFormData, setPasswordFormData] = useState({oldPassword: "", newPassword: ""});
    
    async function handleEmailSubmit(evt){
        evt.preventDefault();
        let result = await updateFamily(emailFormData);
        if(result.success){
            toast.success('Email Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setEmailFormMessages(['Family Updated!'])
           setUpdateSuccess(true);
           navigate("/home");
        }
        else{
            setEmailFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function handleNameSubmit(evt){
        evt.preventDefault();
        let result = await updateFamily(nameFormData);
        if(result.success){
            toast.success('Family Name Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setNameFormMessages(['Family Updated!'])
           setUpdateSuccess(true);
           navigate("/home");
        }
        else{
            setNameFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function updatePassword() {
        try {
          let result = await PhysiqApi.updatePassword(currentFamily.id, passwordFormData);
          return { success: true };
        } catch (errors) {
          console.error("Password Update failed", errors);
          return { success: false, errors };
        }
      }

    async function handlePasswordSubmit(evt){
        evt.preventDefault();
        let result = await updatePassword();
        if(result.success){
            toast.success('Password Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setPasswordFormMessages(['Password Updated!'])
           setUpdateSuccess(true);
           navigate("/home");
        }
        else{
            setPasswordFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteFamily() {
        try {
          let deletedFamily= await PhysiqApi.deleteCurrentFamily(currentFamily.id);
          return { success: true };
        } catch (errors) {
          console.error("Delete failed", errors);
          return { success: false, errors };
        }
      }

    async function handleDelete(evt){
        evt.preventDefault();
        const shouldDelete = confirm("Are you sure you want to delete? THIS CANNOT BE UNDONE!!!")

        if(shouldDelete){
            let result = await deleteFamily();
            if(result.success){
                toast.success('Family Deleted!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    }); 
                setDeleteFormMessages(['Family Deleted!'])
                setUpdateSuccess(true);
                logout();
            }
            else{
                setDeleteFormMessages(result.errors);
                setUpdateSuccess(false);
            }
        }
        
    };
  
    /** Update local state w/curr state of input elem */
  
    const handleEmailChange = evt => {
      const { name, value }= evt.target;
      setEmailFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };

    const handleNameChange = evt => {
      const { name, value }= evt.target;
      setNameFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };

    const handlePasswordChange = evt => {
      const { name, value }= evt.target;
      setPasswordFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };



    if(!currentFamily) return <Loading />;
    return(
        <div id="FamilyMember-main">
            <Form className="FamilyMember-Form m-4" >
            <FormGroup>
                <Label className="FamilyMember-label" for="email" >
                    <b>Update Email:</b>
                </Label>
                <Input
                id="email"
                name="email"
                minLength={6}
                maxLength={60}
                value={emailFormData.email}
                type="text"
                onChange={handleEmailChange}
                />
            </FormGroup>

                {emailFormMessages.length
                    ? emailFormMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-dark m-2" onClick={handleEmailSubmit}>Save Changes</Button>
            </Form>
            <br></br>
            <Form className="FamilyMember-Form m-4" >
            <FormGroup>
                <Label className="FamilyMember-label" for="name">
                    <b>Update Family Name:</b>
                </Label>
                <Input
                id="name"
                name="name"
                minLength={1}
                maxLength={75}
                value={nameFormData.name}
                type="text"
                onChange={handleNameChange}
                />
            </FormGroup>

                {nameFormMessages.length
                    ? nameFormMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                
                <Button className="btn-dark m-2" onClick={handleNameSubmit}>Save Changes</Button>
            </Form>
            <br></br>
            <Form className="FamilyMember-Form m-4" >
            <FormGroup>
                <Label className="FamilyMember-label" for="oldPassword">
                    <b>Update Password:</b>
                </Label>
                <Input
                id="oldPassword"
                name="oldPassword"
                minLength={8}
                value={passwordFormData.oldPassword}
                placeholder="Enter old password..."
                type="password"
                onChange={handlePasswordChange}
                />
                <Input
                id="newPassword"
                name="newPassword"
                minLength={8}
                placeholder="Enter new password..."
                value={nameFormData.newPassword}
                type="password"
                onChange={handlePasswordChange}
                />
            </FormGroup>

                {passwordFormMessages.length
                    ? passwordFormMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-dark m-2" onClick={handlePasswordSubmit}>Save Changes</Button>
            </Form>
            <br></br>
            <Form className="FamilyMember-Form m-4" >
            <Label className="FamilyMember-label" for="name">
                    <b>DELETE FAMILY:</b>
                </Label>
            <p className="text-secondary"><span className="text-danger">WARNING: </span>This is permanent!</p>
                {deleteFormMessages.length
                    ? deleteFormMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
               <Button className="btn-danger m-2" onClick={handleDelete}>DELETE FAMILY</Button>
            </Form>
            
            {/* <Button className="btn-danger m-2" onClick={handlePasswordChange}>CHANGE PASSWORD</Button> */}
        </div>
     )
}

export default FamilyProfile;