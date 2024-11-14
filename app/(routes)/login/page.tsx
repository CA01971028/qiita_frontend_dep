import Login from './components/Login'
const page = () => {
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Login/>
    </div>
</div>
    );
}

export default page;