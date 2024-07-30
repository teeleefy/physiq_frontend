import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Insurance.css'

function InsuranceUpdate({getDate}){
    let navigate = useNavigate();
    let { insuranceId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({companyName: "", insuredName: "", type: "", startDate:"", endDate:"", groupNum:"", contractNum:"", notes: ""});
    const todaysDate = getDate();

    useEffect(function loadInsuranceInfo() {
        async function getCurrentInsurance() {
            if(currentMember && insuranceId){
                try{
                    let insurance = await PhysiqApi.getMemberSingleInsurance(currentMember.id, insuranceId);
                    if(!insurance.insuredName){
                      insurance.insuredName = "";
                    }
                    if(!insurance.startDate){
                      insurance.startDate = "";
                    }
                    if(!insurance.endDate){
                      insurance.endDate = "";
                    }
                    if(!insurance.groupNum){
                      insurance.groupNum = "";
                    }
                    if(!insurance.contractNum){
                      insurance.contractNum = "";
                    }
                    if(!insurance.notes){
                      insurance.notes = "";
                    }
                    setFormData({companyName: insurance.companyName, insuredName: insurance.insuredName, type: insurance.type, startDate: insurance.startDate, endDate: insurance.endDate, groupNum: insurance.groupNum, contractNum: insurance.contractNum, notes: insurance.notes})
                }catch (err) {
                console.error("App loadInsuranceInfo: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentInsurance();
      }, [insuranceId]);



    //SET FORM DATA WITH INSURANCE INFO 
    
    async function updateInsurance() {
        try {
            // let updateInfo = formData; 

            // if(!updateInfo.startDate){
            //     updateInfo.startDate = null;
            //   }
            // if(!updateInfo.endDate){
            //     updateInfo.endDate = null;
            //   }
            
          let updatedInsurance= await PhysiqApi.updateInsurance(currentMember.id, insuranceId, formData);
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateInsurance();
        
        if(result.success){
           setFormMessages(['Insurance Updated!'])
           setUpdateSuccess(true);
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteInsurance() {
        try {
          let deletedInsurance= await PhysiqApi.deleteInsurance(currentMember.id, insuranceId);
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
            let result = await deleteInsurance();
            if(result.success){
            //    alert("Saved Changes!") 
            setFormMessages(['Insurance Deleted!'])
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
            <Form className="Insurance-Form m-4" >
            <h1 className="Insurance-h1">Update Insurance:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            
            <FormGroup>
                <Label className="Insurance-label" for="companyName" >
                    <b>Company Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
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
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE INSURANCE</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default InsuranceUpdate;