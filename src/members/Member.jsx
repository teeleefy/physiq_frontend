import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import PhysiqApi from "../Api.js";
import { NavLink } from "react-router-dom";
import MemberNavBar from "../navigation/MemberNavBar.jsx";
import Loading from "../navigation/Loading";
import './styles/Member.css'
import {MemberContext} from "../auth/UserContext";
import { toast } from 'react-toastify';

function Member({updateMember, getDate}){
    const { currentMember } = useContext(MemberContext);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({firstName: currentMember.firstName, lastName: currentMember.lastName, birthday: currentMember.birthday});
    const todaysDate = getDate();

    useEffect(function loadMemberInfo() {
        async function getCurrentMemberInfo() {
            if(currentMember){
                try{
                    let member = await PhysiqApi.getMember(currentMember.id);
                    if(!member.birthday){
                        member.birthday = "";
                      }
                    setFormData({firstName: member.firstName, lastName: member.lastName, birthday: member.birthday})
                }catch (err) {
                console.error("App loadDoctorInfo: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentMemberInfo();
      }, []);


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateMember(formData);
        if(result.success){
            toast.success('Member Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setFormMessages(['Member Updated!'])
           setUpdateSuccess(true);
           navigate("/home");
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteMember() {
        try {
          let deletedMember= await PhysiqApi.deleteMember(currentMember.id);
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
            let result = await deleteMember();
            if(result.success){
                toast.success('Member Deleted!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    }); 
                setFormMessages(['Member Deleted!'])
                setUpdateSuccess(true);
                navigate("/home");
            }
            else{
                setFormMessages(result.errors);
                setUpdateSuccess(false);
            }
        }
        
    };
  
    /** Update local state w/curr state of input elem */
  
    const handleChange = evt => {
      const { name, value }= evt.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };



    if(!currentMember && isLoading) return <Loading />;
    return(
        <>
            <Form className="Member-Form m-4" >
            <h1 className="Member-h1">Update Member:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Member-label" for="firstName" >
                    <b>First Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="firstName"
                name="firstName"
                minLength={2}
                maxLength={35}
                value={formData.firstName}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Member-label" for="lastName">
                    <b>Last Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="lastName"
                name="lastName"
                minLength={2}
                maxLength={50}
                value={formData.lastName}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup className="Member-date-input">
                <Label className="Member-label" for="birthday">
                    <b>Birthday</b>
                </Label>
                <Input
                id="birthday"
                name="birthday"
                value={formData.birthday}
                max={todaysDate}
                type="date"
                onChange={handleChange}
                />
                </FormGroup>

                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE MEMBER</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
     )
}

export default Member;