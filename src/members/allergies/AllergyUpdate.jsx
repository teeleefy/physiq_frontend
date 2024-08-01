import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import {MemberContext} from "../../auth/UserContext.js";
import PhysiqApi from "../../Api.js";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../navigation/Loading.jsx";
import '../styles/Allergy.css'
import { toast } from 'react-toastify';


function AllergyUpdate(){
    let navigate = useNavigate();
    let { allergyId } = useParams();
    const { currentMember } = useContext(MemberContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();
    const [formData, setFormData] = useState({name: "", reaction: "", notes: ""});
    

    useEffect(function loadAllergyInfo() {
        async function getCurrentAllergy() {
            if(currentMember && allergyId){
                try{
                    let allergy = await PhysiqApi.getMemberAllergy(currentMember.id, allergyId);
                    if(!allergy.notes){
                        allergy.notes = "";
                      }
                    setFormData({name: allergy.name, reaction: allergy.reaction, notes: allergy.notes})
                }catch (err) {
                console.error("App loadAllergyInfo: problem loading", err);
                }
            }
           setIsLoading(false); 
        }
        getCurrentAllergy();
      }, [allergyId]);



    //SET FORM DATA WITH GOAL INFO 
    
    async function updateAllergy() {
        try {
          let updatedAllergy= await PhysiqApi.updateAllergy(currentMember.id, allergyId, formData);
          return { success: true };
        } catch (errors) {
          console.error("Save failed", errors);
          return { success: false, errors };
        }
      }


    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await updateAllergy();
        
        if(result.success){
            toast.success('Allergy Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
           setFormMessages(['Allergy Updated!'])
           setUpdateSuccess(true);
           navigate("..", { relative: "path"})
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };

    async function deleteAllergy() {
        try {
          let deletedAllergy= await PhysiqApi.deleteAllergy(currentMember.id, allergyId);
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
            let result = await deleteAllergy();
            if(result.success){
            // toast.success('Allergy Deleted!')
            toast.success('Allergy Deleted!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setFormMessages(['Allergy Deleted!'])
            setUpdateSuccess(true);
            navigate("..", { relative: "path"})
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
            <Form className="Allergy-Form m-4" >
            <h1 className="Allergy-h1">Update Allergy:</h1>
            <p className="text-secondary">Fields marked with <span className="text-danger">*</span> are required.</p>
            <FormGroup>
                <Label className="Allergy-label" for="name" >
                    <b>Allergy Name</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="name"
                name="name"
                maxLength={50}
                value={formData.name}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className="Allergy-label" for="reaction">
                    <b>Reaction</b><span className="text-danger">*</span>
                </Label>
                <Input
                id="reaction"
                name="reaction"
                maxLength={100}
                value={formData.reaction}
                type="text"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label className="Allergy-label" for="notes">
                    <b>Notes</b>
                </Label>
                <Input
                id="notes"
                name="notes"
                maxLength={250}
                value={formData.notes}
                type="textarea"
                onChange={handleChange}
                />
            </FormGroup>
            <p className="text-secondary">{formData.notes.length}/250 Characters</p>
                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }
                <Button className="btn-danger m-2" onClick={handleDelete}>DELETE ALLERGY</Button>
                <Button className="btn-dark m-2" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default AllergyUpdate;