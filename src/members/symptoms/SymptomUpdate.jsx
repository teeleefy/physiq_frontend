import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Symptom.css'

function SymptomUpdate({getDate}){
    let navigate = useNavigate();
    let { symptomId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", startDate: "", endDate: "", notes: ""});
    const todaysDate = getDate();

    useEffect(function loadSymptomInfo() {
        async function getCurrentSymptom() {
            if(currentMember && symptomId){
                try{
                    let symptom = await PhysiqApi.getMemberSymptom(currentMember.id, symptomId);
                    if(!symptom.startDate){
                      symptom.startDate = "";
                    }
                    if(!symptom.endDate){
                      symptom.endDate = "";
                    }
                    if(!symptom.notes){
                      symptom.notes = "";
                    }
                    setFormData({name: symptom.name, startDate: symptom.startDate, endDate: symptom.endDate, notes: symptom.notes})
                }catch (err) {
                console.error("App loadSymptomInfo: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentSymptom();
      }, [symptomId]);



    //SET FORM DATA WITH SYMPTOM INFO 
    
    async function updateSymptom() {
        try {
          let updatedSymptom= await PhysiqApi.updateSymptom(currentMember.id, symptomId, formData);
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateSymptom();
        
        if(result.success){
           setFormMessages(['Symptom Updated!'])
           setUpdateSuccess(true);
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteSymptom() {
        try {
          let deletedSymptom= await PhysiqApi.deleteSymptom(currentMember.id, symptomId);
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
            let result = await deleteSymptom();
            if(result.success){
            //    alert("Saved Changes!") 
            setFormMessages(['Symptom Deleted!'])
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
            <Form className="Symptom-Form m-4" >
            <h1 className="Symptom-h1">Update Symptom:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            
            <FormGroup>
                <Label className="Symptom-label" for="name" >
                    <b>Symptom Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
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
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE SYMPTOM</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default SymptomUpdate;