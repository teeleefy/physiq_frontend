import { Form, FormGroup, Input, Button, Label, Alert} from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Med.css'
import Loading from "../../navigation/Loading.jsx"

function MedNew({getDate}){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({name: "", indication: "", dose:"", startDate:"", endDate:"",  prescriberId:"", notes: ""});
    const todaysDate = getDate();
    const [doctors, setDoctors] = useState(null);

   
    useEffect(function getMemberDoctors(){
        async function getDoctors() {
          let doctors = await PhysiqApi.getMemberDoctors(currentMember.id);
          console.log(doctors);
          setDoctors(doctors);
          setIsLoading(false); 
        }
        getDoctors();
      }, []);

    async function addMed() {
        try {
            formData.prescriberId = +formData.prescriberId;
          let newMed= await PhysiqApi.addMemberMed(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Med failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addMed();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Med Added!'])
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

    if (isLoading) return <Loading/>;

    return(
        <>
            <Form className="MedNew-Form m-4 pt-1" >
            <h1 className="Med-h1">Add Med:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Med-label" for="name" >
                    <b>Medication Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
                placeholder="Enter medication name..."
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
                placeholder="Enter purpose/indication of medicine..."
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
                placeholder="Enter dose and frequency (10mg twice a day)"
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
                placeholder="Enter start date..."
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
                placeholder="Enter end date..."
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
                type="select"
                >
                    <option value={null}>---Select Prescriber---</option>
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
                placeholder="Enter notes..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Med</Button>
            </Form>
        </>
    )}
    
export default MedNew;