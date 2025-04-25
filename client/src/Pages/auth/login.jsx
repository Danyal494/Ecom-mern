
import CommonForm from "@/components/common-component/CommonForm"
import { Button } from "@/components/ui/button"
import { loginFormControls } from "@/config/FormControls"
import { loginUserAction } from "@/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const initialState = {
    userName: "",
    email: "",
    password: "",
}

function AuthLogin() {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate= useNavigate()
    
    function onSubmit(e) {
        e.preventDefault();
        // console.log('Submitting formData:', formData);
        dispatch(loginUserAction(formData)).then((data) => {
            if (data?.payload?.success) {
                // navigate('/auth/login');
                toast.success('login successful!', {
                    className: 'bg-green-600 text-white'
                });
            } else {
                toast.error(data?.payload?.message || 'An unexpected error occurred', {
                    className: 'bg-red-600 text-white'
                });
            }
            console.log('Register Response:', data);
        });
    }

    return (
        <div>

           
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Sign in to your account</h1>
                <p className="mt-2">
                   Don't have an account
                    <Link to='/auth/register' className="font-medium text-primary hover:underline mr-2"> Register</Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={'Sign In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                />
        </div>
                </div>
    )
}

export default AuthLogin