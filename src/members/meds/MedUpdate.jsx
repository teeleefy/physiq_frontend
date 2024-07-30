import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Med.css'

function MedUpdate({getDate}){
    let navigate = useNavigate();
    let { medId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", indication: "", dose:"", startDate:"", endDate:"",  prescriberId:"", notes: ""});
    const [doctors, setDoctors] = useState(null);
    const todaysDate = getDate();

    useEffect(function loadMedAndDoctorsOptions() {
        async function getCurrentMedAndDoctorOptions() {
            if(currentMember && medId){
                try{
                    let doctors = await PhysiqApi.getMemberDoctors(currentMember.id);
                    setDoctors(doctors);
                    let med = await PhysiqApi.getMemberMed(currentMember.id, medId);
                    if(!med.indication){
                      med.indication = "";
                    }
                    if(!med.startDate){
                      med.startDate = "";
                    }
                    if(!med.endDate){
                      med.endDate = "";
                    }
                    if(!med.dose){
                      med.dose = "";
                    }
                    if(!med.prescriberId){
                      med.prescriberId = "";
                    }
                    if(!med.notes){
                      med.notes = "";
                    }
                    setFormData({name: med.name, indication: med.indication, dose: med.dose, startDate: med.startDate, endDate: med.endDate, prescriberId: med.prescriberId, notes: med.notes})
                }catch (err) {
                console.error("App loadMedAndDoctorsOptions: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentMedAndDoctorOptions();
      }, [medId]);



    //SET FORM DATA WITH MED INFO 
    
    async function updateMed() {
        try {
          let updatedMed= await PhysiqApi.updateMed(currentMember.id, medId, formData);
          console.log('after updatedMed runs')
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateMed();

        if(result.success){
           setFormMessages(['Med Updated!'])
           setUpdateSuccess(true);
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteMed() {
        try {
          let deletedMed= await PhysiqApi.deleteMed(currentMember.id, medId);
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
            let result = await deleteMed();
            if(result.success){
            //    alert("Saved Changes!") 
            setFormMessages(['Med Deleted!'])
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
            <Form className="Med-Form m-4" >
            <h1 className="Med-h1">Update Med:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            
            <FormGroup>
                <Label className="Med-label" for="name" >
                    <b>Medication Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Med-label" for="indication">
                    <b>Indication</b>
                </Label>
                <Input
                id="indication"
                name="indication"
                value={formData.indication}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Med-label" for="dose">
                    <b>Dose</b>
                </Label>
                <Input
                id="dose"
                name="dose"
                value={formData.dose}
                type="text"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup className="Med-date-input">
                <Label className="Med-label" for="startDate">
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
                <FormGroup className="Med-date-input">
                <Label className="Med-label" for="endDate">
                    <b>End Date</b>
                </Label>
                <Input
                id="endDate"
                name="endDate"
                value={formData.endDate}
                min={todaysDate}
                type="date"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label className="Med-label" for="prescriberId">
                    <b>Prescribed By:</b>
                </Label>
                <Input
                    id="prescriberId"
                    name="prescriberId"
                    onChange={handleChange}
                    value = {formData.prescriberId}
                type="select"
                >
                    <option value={-1}>---Select Prescriber---</option>
                    {doctors.map(dr => (<option value={dr.id} key={dr.id}>{dr.name}</option>))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label className="Med-label" for="notes">
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
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE MED</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default MedUpdate;