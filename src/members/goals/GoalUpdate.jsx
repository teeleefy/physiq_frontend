import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Goal.css'

function GoalUpdate(){
    let navigate = useNavigate();
    let { goalId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({goalName: "", goalDetails: ""});
    

    useEffect(function loadGoalInfo() {
        async function getCurrentGoal() {
            if(currentMember && goalId){
                try{
                    let goal = await PhysiqApi.getMemberGoal(currentMember.id, goalId);
                    if(!goal.goalDetails){
                      goal.goalDetails = "";
                    }
                    setFormData({goalName: goal.goalName, goalDetails: goal.goalDetails})
                }catch (err) {
                console.error("App loadGoalInfo: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentGoal();
      }, [goalId]);



    //SET FORM DATA WITH GOAL INFO 
    
    async function updateGoal() {
        try {
          let updatedGoal= await PhysiqApi.updateGoal(currentMember.id, goalId, formData);
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateGoal();
        
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Goal Updated!'])
           setUpdateSuccess(true);
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteGoal() {
        try {
          let deletedGoal= await PhysiqApi.deleteGoal(currentMember.id,goalId);
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
            let result = await deleteGoal();
            if(result.success){
            //    alert("Saved Changes!") 
            setFormMessages(['Goal Deleted!'])
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
            <Form className="Goal-Form m-4" >
            <h1 className="Goal-h1">Update Goal:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Goal-label" for="goalName" >
                    <b>Goal Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="goalName"
                name="goalName"
                value={formData.goalName}
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
                type="text"
                onChange={handleChange}
                />
                </FormGroup>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE GOAL</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default GoalUpdate;