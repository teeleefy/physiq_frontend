import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Diagnosis.css'

function DiagnosisUpdate({getDate}){
    let navigate = useNavigate();
    let { diagnosisId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", dateReceived: "", notes: ""});
    const todaysDate = getDate();

    useEffect(function loadDiagnosisInfo() {
        async function getCurrentDiagnosis() {
            if(currentMember && diagnosisId){
                try{
                    let diagnosis = await PhysiqApi.getMemberDiagnosis(currentMember.id, diagnosisId);
                    if(!diagnosis.dateReceived){
                      diagnosis.dateReceived = "";
                    }
                    if(!diagnosis.notes){
                      diagnosis.notes = "";
                    }
                    setFormData({name: diagnosis.name, dateReceived: diagnosis.dateReceived, notes: diagnosis.notes})
                }catch (err) {
                console.error("App loadDiagnosisInfo: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentDiagnosis();
      }, [diagnosisId]);



    //SET FORM DATA WITH DIAGNOSIS INFO 
    
    async function updateDiagnosis() {
        try {
            
          let updatedDiagnosis= await PhysiqApi.updateDiagnosis(currentMember.id, diagnosisId, formData);
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateDiagnosis();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Diagnosis Updated!'])
           setUpdateSuccess(true);
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteDiagnosis() {
        try {
          let deletedDiagnosis= await PhysiqApi.deleteDiagnosis(currentMember.id,diagnosisId);
          return { success: true };
        } catch (errors) {
          console.error("Delete failed", errors);
          return { success: false, errors };
        }
      }

    async function handleDelete(evt){
        evt.preventDefault();
        const shouldDelete = confirm("Are you sure you want to delete?")

        if(shouldDelete){
            let result = await deleteDiagnosis();
            if(result.success){
            //    alert("Saved Changes!") 
            setFormMessages(['Diagnosis Deleted!'])
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

    if(isLoading) return <Loading />;

    return(
        <>
            <Form className="Diagnosis-Form m-4" >
            <h1 className="Diagnosis-h1">Update Diagnosis:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Diagnosis-label" for="name" >
                    <b>Diagnosis Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
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
                value={formData.notes}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>

                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE DIAGNOSIS</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default DiagnosisUpdate;