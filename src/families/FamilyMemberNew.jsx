import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext } from "react";
import {FamilyContext} from "../auth/UserContext.js";
import PhysiqApi from "../Api.js";
import { useNavigate } from "react-router-dom";
import './styles/FamilyMember.css'
import { toast } from 'react-toastify';

function FamilyMemberNew(){
    let navigate = useNavigate();
    const { currentFamily } = useContext(FamilyContext);
    // console.log(currentFamily);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({firstName: "", lastName: "", birthday: ""});

    async function addFamilyMember() {
        try {
          let newFamilyMember= await PhysiqApi.addFamilyMember(currentFamily.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add FamilyMember failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addFamilyMember();
        
        if(result.success){
            toast.success('Member Added!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setFormMessages(['Family Member Added!'])
           setUpdateSuccess(true);
           navigate("/home");
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
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

    return(
        <div id="FamilyMember-main">
            <Form className="FamilyMember-Form m-4" >
            <h1 className="FamilyMember-h1">Add Family Member:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="FamilyMember-label" for="firstName" >
                    <b>First Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="firstName"
                name="firstName"
                minLength={2}
                maxLength={35}
                value={formData.firstName}
                placeholder="Enter first name..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="FamilyMember-label" for="lastName" >
                    <b>Last Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="lastName"
                name="lastName"
                minLength={2}
                maxLength={50}
                value={formData.lastName}
                placeholder="Enter last name..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
           
            <FormGroup className="FamilyMember-date-input">
                <Label className="FamilyMember-label" for="birthday">
                    <b>Birthday</b>
                </Label>
                <Input
                id="birthday"
                name="birthday"
                value={formData.birthday}
                placeholder="Enter birthday..."
                type="date"
                onChange={handleChange}
                />
            </FormGroup>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Family Member</Button>
            </Form>
        </div>
    )}
    
export default FamilyMemberNew;