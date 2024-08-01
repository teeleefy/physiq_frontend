import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Visit.css'
import { toast } from 'react-toastify';

function VisitUpdate({getDate}){
    let navigate = useNavigate();
    let { visitId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({title: "", date:"", doctorId:"-1", description: ""});
    const [doctors, setDoctors] = useState(null);
    const todaysDate = getDate();

    useEffect(function loadVisitAndDoctorsOptions() {
        async function getCurrentVisitAndDoctorOptions() {
            if(currentMember && visitId){
                try{
                    let doctors = await PhysiqApi.getMemberDoctors(currentMember.id);
                    setDoctors(doctors);
                    let visit = await PhysiqApi.getMemberVisit(currentMember.id, visitId);
                    if(!visit.date){
                      visit.date = "";
                    }
                    if(!visit.doctorId){
                      visit.doctorId = "-1";
                    }
                    if(!visit.description){
                      visit.description = "";
                    }
                    setFormData({title: visit.title, date: visit.date, doctorId: visit.doctorId, description: visit.description})
                }catch (err) {
                console.error("App loadVisitAndDoctorsOptions: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentVisitAndDoctorOptions();
      }, [visitId]);



    //SET FORM DATA WITH VISIT INFO 
    
    async function updateVisit() {
        try {
          let updatedVisit= await PhysiqApi.updateVisit(currentMember.id, visitId, formData);
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        console.log('visit update formData:', formData)
        let result = await updateVisit();
        
        if(result.success){
            toast.success('Visit Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
           setFormMessages(['Visit Updated!'])
           setUpdateSuccess(true);
           navigate("..", { relative: "path"});
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteVisit() {
        try {
          let deletedVisit= await PhysiqApi.deleteVisit(currentMember.id, visitId);
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
            let result = await deleteVisit();
            if(result.success){
                toast.success('Visit Deleted!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                setFormMessages(['Visit Deleted!'])
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
            <Form className="Visit-Form m-4" >
            <h1 className="Visit-h1">Update Visit:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            
           
            <FormGroup>
                <Label className="Visit-label" for="title" >
                    <b>Visit Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="title"
                name="title"
                maxLength={100}
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
            <FormGroup className="Visit-select-input">
                <Label className="Visit-label" for="doctorId">
                    <b>Doctor Seen:</b>
                </Label>
                <Input
                    id="doctorId"
                    name="doctorId"
                    value = {formData.doctorId}
                    onChange={handleChange}
                type="select"
                >
                    <option value="-1" key={"null"}>---Select Prescriber---</option>
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
                maxLength={250}
                value={formData.description}
                placeholder="Enter notes..."
                type="textarea"
                onChange={handleChange}
                />
            </FormGroup>
            <p className="text-secondary">{formData.description.length}/250 Characters</p>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE VISIT</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default VisitUpdate;