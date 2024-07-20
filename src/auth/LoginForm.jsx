import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import './styles/Login.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


function LoginForm({login}){
    const INITIAL_STATE = { email: "", password: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();
    /** Send { name, description, recipe, serve } to parent
     *    & clear form. */
  
    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await login(formData);
        if(result.success){
            setFormData(INITIAL_STATE);
            navigate('/');
        } else{
            setFormErrors(result.errors);
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
            
            <Form className="Login-Form" onSubmit={handleSubmit}>
            <h1 className="Login-h1">Login</h1>
            <FormGroup>
                <Label for="email" >
                    <b>Email</b>
                </Label>
                <Input
                id="email"
                name="email"
                type="text"
                value={formData.email}
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
                value={formData.password}
                type="password"
                onChange={ handleChange }
                />
                </FormGroup>

                <Button className="Login-btn btn-dark">Submit</Button>
                {formErrors.length
                    ? formErrors.map(error => <Alert color="danger">{error}</Alert>)
                    : null
                }

                
            </Form>
        </>
     )
}

export default LoginForm;