import { Form, FormGroup, Input, Button, Label, Alert} from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Visit.css'
import Loading from "../../navigation/Loading.jsx"

function VisitNew(){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({title: "", date:"", doctorId:"", description: ""});
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

    async function addVisit() {
        try {
            formData.doctorId = +formData.doctorId;
          let newVisit= await PhysiqApi.addMemberVisit(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Visit failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addVisit();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Visit Added!'])
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
            <Form className="VisitNew-Form m-4 pt-1" >
            <h1 className="Visit-h1">Add Visit:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Visit-label" for="title" >
                    <b>Visit Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="title"
                name="title"
                value={formData.title}
                placeholder="Enter reason for visit..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup className="Visit-date-input">
                <Label className="Visit-label" for="date">
                    <b>Date</b>
                </Label>
                <Input
                id="date"
                name="date"
                value={formData.date}
                placeholder="Enter date of visit..."
                type="date"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label className="Visit-label" for="doctorId">
                    <b>Doctor Seen:</b>
                </Label>
                <Input
                    id="doctorId"
                    name="doctorId"
                    onChange={handleChange}
                type="select"
                >
                    <option value={null}>---Select Prescriber---</option>
                    {doctors.map(dr => (<option value={dr.id} key={dr.id}>{dr.name}</option>))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label className="Visit-label" for="description">
                    <b>Notes</b>
                </Label>
                <Input
                id="description"
                name="description"
                value={formData.description}
                placeholder="Enter notes..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Visit</Button>
            </Form>
        </>
    )}
    
export default VisitNew;