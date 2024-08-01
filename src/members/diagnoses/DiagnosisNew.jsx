import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Diagnosis.css'
import { toast } from 'react-toastify';

function DiagnosisNew({getDate}){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", dateReceived: "", notes: ""});
    const todaysDate = getDate();

    async function addDiagnosis() {
        try {
          let newDiagnosis= await PhysiqApi.addMemberDiagnosis(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Diagnosis failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await addDiagnosis();
        
        if(result.success){
            toast.success('Diagnosis Added!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setFormMessages(['Diagnosis Added!'])
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
            <Form className="DiagnosisNew-Form m-4" >
            <h1 className="Diagnosis-h1">Add Diagnosis:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Diagnosis-label" for="name" >
                    <b>Diagnosis Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                maxLength={125}
                value={formData.name}
                placeholder="Enter diagnosis name..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup className="Diagnosis-date-input">
                <Label className="Diagnosis-label" for="dateReceived">
                    <b>Date Received</b>
                </Label>
                <Input
                id="dateReceived"
                name="dateReceived"
                value={formData.dateReceived}
                max={todaysDate}
                placeholder="Enter date received..."
                type="date"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label className="Diagnosis-label" for="notes">
                    <b>Notes</b>
                </Label>
                <Input
                id="notes"
                name="notes"
                maxLength={250}
                value={formData.notes}
                placeholder="Enter notes..."
                type="textarea"
                onChange={handleChange}
                />
            </FormGroup>
            <p className="text-secondary">{formData.notes.length}/250 Characters</p>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Diagnosis</Button>
            </Form>
        </>
    )}
    
export default DiagnosisNew;