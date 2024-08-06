import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './styles/Signup.css'
import { toast } from 'react-toastify';

function SignupForm({signup}){
    const INITIAL_STATE = { email:"", password: "", name: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();
    
    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await signup(formData);
        if(result.success){
            toast.success('Registation Successful!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setFormData(INITIAL_STATE);
            navigate('/');
        } else{
            setFormErrors(result.errors);
        }
    };

    const handleChange = evt => {
        const { name, value }= evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
      };

    return(
        <>
            
            <Form className="Signup-Form" onSubmit={handleSubmit}>
            <h1 className="Signup-h1">Sign Up</h1>
            <FormGroup>
                <Label for="email">
                    <b>Email</b>
                </Label>
                <Input
                id="email"
                name="email"
                value={formData.email}
                minLength={6}
                maxLength={60}
                placeholder="Enter email..."
                type="email"
                onChange={ handleChange }
                />
                </FormGroup>
                <FormGroup>
                <Label for="password">
                    <b>Password</b>
                </Label>
                <Input
                id="password"
                name="password"
                placeholder="Enter password..."
                value={formData.password}
                minLength={8}
                type="password"
                onChange={ handleChange }
                />
                </FormGroup>
                <FormGroup>
                <Label for="name" >
                    <b>Family Name</b>
                </Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
                placeholder="Example: The Smith Family"
                minLength={1}
                maxLength={75}
                type="text"
                onChange={ handleChange }
                />
            </FormGroup>
            
            

                {formErrors.length
                    ? formErrors.map(error => <Alert color="danger">{error}</Alert>)
                    : null
                }

                <Button className="btn" type="submit">Submit</Button>
            </Form>
        </>
     )
}

export default SignupForm;