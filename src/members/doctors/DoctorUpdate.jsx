import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Doctor.css'

function DoctorUpdate(){
    let navigate = useNavigate();
    let { doctorId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", specialty: "", clinic: "", address:"", phone:"", notes: ""});
    

    useEffect(function loadDoctorInfo() {
        async function getCurrentDoctor() {
            if(currentMember && doctorId){
                try{
                    let doctor = await PhysiqApi.getMemberDoctor(currentMember.id, doctorId);
                    if(!doctor.clinic){
                        doctor.clinic = "";
                      }
                    if(!doctor.address){
                        doctor.address = "";
                      }
                    if(!doctor.phone){
                        doctor.phone = "";
                      }
                    if(!doctor.notes){
                        doctor.notes = "";
                      }
                    setFormData({name: doctor.name, specialty: doctor.specialty, clinic: doctor.clinic, address: doctor.address, phone: doctor.phone, notes: doctor.notes})
                }catch (err) {
                console.error("App loadDoctorInfo: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentDoctor();
      }, [doctorId]);



    //SET FORM DATA WITH DOCTOR INFO 
    
    async function updateDoctor() {
        try {
          let updatedDoctor= await PhysiqApi.updateDoctor(currentMember.id, doctorId, formData);
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateDoctor();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Doctor Updated!'])
           setUpdateSuccess(true);
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteDoctor() {
        try {
          let deletedDoctor= await PhysiqApi.deleteDoctor(currentMember.id,doctorId);
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
            let result = await deleteDoctor();
            if(result.success){
            //    alert("Saved Changes!") 
            setFormMessages(['Doctor Deleted!'])
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
            <Form className="Doctor-Form m-4" >
            <h1 className="Doctor-h1">Update Doctor:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            
            <FormGroup>
                <Label className="Doctor-label" for="name" >
                    <b>Doctor Name</b><span className="text-danger">*</span>
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
                <Label className="Doctor-label" for="specialty">
                    <b>Specialty</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                type="text"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label className="Doctor-label" for="clinic">
                    <b>Clinic</b>
                </Label>
                <Input
                id="clinic"
                name="clinic"
                value={formData.clinic}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Doctor-label" for="address">
                    <b>Address</b>
                </Label>
                <Input
                id="address"
                name="address"
                value={formData.address}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Doctor-label" for="phone">
                    <b>Phone</b>
                </Label>
                <Input
                id="phone"
                name="phone"
                value={formData.phone}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Doctor-label" for="notes">
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
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE DOCTOR</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default DoctorUpdate;