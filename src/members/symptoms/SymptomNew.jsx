import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Symptom.css'

function SymptomNew({getDate}){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", startDate: "", endDate: "", notes: ""});
    const todaysDate = getDate();

    async function addSymptom() {
        try {
          let newSymptom= await PhysiqApi.addMemberSymptom(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Symptom failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addSymptom();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Symptom Added!'])
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
            <Form className="SymptomNew-Form m-4" >
            <h1 className="Symptom-h1">Add Symptom:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Symptom-label" for="name" >
                    <b>Symptom Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
                placeholder="Enter symptom name..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup className="Symptom-date-input">
                <Label className="Symptom-label" for="startDate">
                    <b>Start Date</b>
                </Label>
                <Input
                id="startDate"
                name="startDate"
                value={formData.startDate}
                max={todaysDate}
                placeholder="Enter start date..."
                type="date"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup className="Symptom-date-input">
                <Label className="Symptom-label" for="endDate">
                    <b>End Date</b>
                </Label>
                <Input
                id="endDate"
                name="endDate"
                value={formData.endDate}
                max={todaysDate}
                placeholder="Enter end date..."
                type="date"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label className="Symptom-label" for="notes">
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
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Symptom</Button>
            </Form>
        </>
    )}
    
export default SymptomNew;