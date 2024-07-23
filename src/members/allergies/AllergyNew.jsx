import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Allergy.css'

function AllergyNew(){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", reaction: "", notes: ""});

    async function addAllergy() {
        try {
          let newAllergy= await PhysiqApi.addMemberAllergy(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Allergy failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addAllergy();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Allergy Added!'])
           setUpdateSuccess(true);
           navigate("..", { relative: "path"});
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
        <>
            <Form className="AllergyNew-Form m-4" >
            <h1 className="Allergy-h1">Add Allergy:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Allergy-label" for="name" >
                    <b>Allergy Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
                placeholder="Enter allergy name..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Allergy-label" for="reaction">
                    <b>Reaction</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="reaction"
                name="reaction"
                value={formData.reaction}
                placeholder="Enter reaction..."
                type="text"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label className="Allergy-label" for="notes">
                    <b>Notes</b>
                </Label>
                <Input
                id="notes"
                name="notes"
                value={formData.notes}
                placeholder="Enter notes..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Allergy</Button>
            </Form>
        </>
    )}
    
export default AllergyNew;