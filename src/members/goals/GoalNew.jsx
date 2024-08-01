import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useNavigate } from "react-router-dom";
import '../styles/Goal.css'
import { toast } from 'react-toastify';

function GoalNew(){
    let navigate = useNavigate();
    const { currentMember } = useContext(MemberContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({goalName: "", goalDetails: ""});

    async function addGoal() {
        try {
          let newGoal= await PhysiqApi.addMemberGoal(currentMember.id, formData);
          return { success: true };
        } catch (errors) {
          console.error("Add Goal failed", errors);
          return { success: false, errors };
        }
      }

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await addGoal();
        
        if(result.success){
            toast.success('Goal Added!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
           setFormMessages(['Goal Added!'])
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
            <Form className="GoalNew-Form m-4" >
            <h1 className="Goal-h1">Add Goal:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Goal-label" for="goalName" >
                    <b>Goal Name </b><span className="text-danger">*</span>
                </Label>
                <Input
                id="goalName"
                name="goalName"
                maxLength={100}
                value={formData.goalName}
                placeholder="Enter goal name..."
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Goal-label" for="goalDetails">
                    <b>Details</b>
                </Label>
                <Input
                id="goalDetails"
                name="goalDetails"
                value={formData.goalDetails}
                placeholder="Enter goal details..."
                maxLength={250}
                type="textarea"
                onChange={handleChange}
                />
                </FormGroup>
                <p className="text-secondary">{formData.goalDetails.length}/250 Characters</p>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                
                <Button className="btn-dark" onClick={handleSubmit}>Add Goal</Button>
            </Form>
        </>
    )}
    
export default GoalNew;