import Signup from "./SignUp";



const page = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
                <Signup />
            </div>
        </div>
    );
}

export default page;