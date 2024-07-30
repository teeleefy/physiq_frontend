import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import PhysiqApi from "../Api.js";
import { NavLink } from "react-router-dom";
import MemberNavBar from "../navigation/MemberNavBar.jsx";
import Loading from "../navigation/Loading";
import './styles/Member.css'
import {MemberContext} from "../auth/UserContext";

function Member({updateMember, getDate}){
    const { currentMember } = useContext(MemberContext);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({firstName: currentMember.firstName, lastName: currentMember.lastName, birthday: currentMember.birthday});
    const todaysDate = getDate();

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateMember(formData);
        if(result.success){
           setFormMessages(['Member Updated!'])
           setUpdateSuccess(true);
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
            //    alert("Saved Changes!") 
            setFormMessages(['Member Deleted!'])
            setUpdateSuccess(true);
            navigate("..", { relative: "path"});
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



    if(!currentMember) return <Loading />;
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
                {/* <Button className="btn-danger m-2" onClick={handleDelete}>DELETE MEMBER</Button> */}
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
     )
}

export default Member;