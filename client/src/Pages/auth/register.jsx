
import CommonForm from "@/components/common-component/CommonForm"
import { registerFormControls } from "@/config/FormControls"
import { registerUserAction } from "@/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const initialState = {
    userName: "",
    email: "",
    password: "",
}

function AuthRegister() {
    const [formData, setFormData] = useState(initialState)
const dispatch = useDispatch()
const navigate= useNavigate()

function onSubmit(e) {
    e.preventDefault();
    console.log('Submitting formData:', formData);
    dispatch(registerUserAction(formData)).then((data) => {
        if (data?.payload?.success) {
            toast.success('Registration successful!');
            navigate('/auth/login');
        } else {
            toast.error(data?.payload?.message || 'An unexpected error occurred');
        }
        console.log('Register Response:', data);
    });
}   

    console.log(formData)
    return (
        <>
          
           <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Create a new account</h1>
                <p className="mt-2">
                    Already have an account? 
                    <Link to='/auth/login' className="font-medium text-primary hover:underline mr-2">Login</Link>
                </p>
            </div>
                <CommonForm
                    formControls={registerFormControls}
                    buttonText={'Sign Up'}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                />
            </div>
        </>
    );
}

export default AuthRegister;
