import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

function AuthLayout(){
    const navigate = useNavigate()
    return (
        <div className="flex  min-h-screen relative w-full">
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
            <div className="max-w-md space-y-6 text-center text-primary-foreground">
                <h1 className="text-4xl font-extrabold tracking-tight">welcome to ecommerce</h1>
            </div>

            </div>
            <div className="absolute right-4 top-2">

            <Button  onClick={()=> navigate("/shop/home")}>
                Go To Home
            </Button>
            </div>
            <div className="flex flex-1  items-center justify-center bg-background px-4 py-12  sm:px-6 lg:px-8 ">
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout