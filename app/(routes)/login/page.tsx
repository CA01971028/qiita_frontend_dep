import Login from './components/Login';
import Link from "next/link";

const page = () => {
    
    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <Login/>
            </div>
            <div className=" mt-3 md:mt-0 md:ml-24 text-center bg-white shadow-md rounded-lg p-8 max-w-sm w-auto">
                <div className='text-xl'>アカウント作成がまだお済ではない方はこちら！</div>
                <Link href="/Signup">
                    <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-600'>Sign Up</button>
                </Link>
                
            </div>
        </div>
    );
}

export default page;