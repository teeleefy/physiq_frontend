import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Insurance.css'

function InsuranceNew({getDate}){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({companyName: "", insuredName: "", type: "", startDate:"", endDate:"", groupNum:"", contractNum:"", notes: ""});
    const todaysDate = getDate();

    async function addInsurance() {
        try {
          let newInsurance= await PhysiqApi.addMemberInsurance(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Insurance failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addInsurance();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Insurance Added!'])
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
            <Form className="InsuranceNew-Form m-4 pt-1" >
            <h1 className="Insurance-h1">Add Insurance:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Insurance-label" for="companyName" >
                    <b>Company Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                placeholder="Enter insurance company name..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Insurance-label" for="type">
                    <b>Type of Insurance</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="type"
                name="type"
                value={formData.type}
                placeholder="Enter type of insurance (medical, dental, etc.)..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Insurance-label" for="insuredName">
                    <b>Insured Name</b>
                </Label>
                <Input
                id="insuredName"
                name="insuredName"
                value={formData.insuredName}
                placeholder="Enter name of person listed on card..."
                type="text"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup className="Insurance-date-input">
                <Label className="Insurance-label" for="startDate">
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
                <FormGroup className="Insurance-date-input">
                <Label className="Insurance-label" for="endDate">
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
                <Label className="Insurance-label" for="groupNum">
                    <b>Group Number</b>
                </Label>
                <Input
                id="groupNum"
                name="groupNum"
                value={formData.groupNum}
                placeholder="Enter group number..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Insurance-label" for="contractNum">
                    <b>Contract Number</b>
                </Label>
                <Input
                id="contractNum"
                name="contractNum"
                value={formData.contractNum}
                placeholder="Enter contract number..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Insurance-label" for="notes">
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
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Insurance</Button>
            </Form>
        </>
    )}
    
export default InsuranceNew;