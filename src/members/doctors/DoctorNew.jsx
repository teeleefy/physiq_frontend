import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Doctor.css'
import { toast } from 'react-toastify';

function DoctorNew(){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", specialty: "", clinic: "", address:"", phone:"", notes: ""});

    async function addDoctor() {
        try {
          let newDoctor= await PhysiqApi.addMemberDoctor(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Doctor failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addDoctor();
        
        if(result.success){
            toast.success('Doctor Added!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setFormMessages(['Doctor Added!'])
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
            <Form className="DoctorNew-Form m-4 pt-1" >
            <h1 className="Doctor-h1">Add Doctor:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Doctor-label" for="name" >
                    <b>Doctor Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                maxLength={100}
                value={formData.name}
                placeholder="Enter doctor name..."
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
                maxLength={100}
                value={formData.specialty}
                placeholder="Enter specialty..."
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
                maxLength={100}
                value={formData.clinic}
                placeholder="Enter clinic..."
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
                maxLength={100}
                value={formData.address}
                placeholder="Enter address..."
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
                maxLength={25}
                value={formData.phone}
                placeholder="Enter phone..."
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
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Doctor</Button>
            </Form>
        </>
    )}
    
export default DoctorNew;