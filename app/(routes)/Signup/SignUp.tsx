'use client';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [name,setName] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [pass,setPass] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
          const res = await fetch("https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/add", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "user":name, "pw":password }),
          });
          const responseData: { success?: boolean; message?: string } = await res.json();
          if (responseData.success) {
            router.push('/login');
          } else {
            setError(responseData.message || 'Login failed');
          }
        } catch (err) {
          console.error('Error:', err);
          setError('An error occurred');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/name_get?user=${name}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const result = await res.json();
            
            if (res.ok) {
              
              if (result.exit) {
                setPass(false); 
              } else {
                setPass(true); 
              }
            } else {
              console.log('エラーが発生しました');
            }
          } catch (error) {
            console.error("エラー:", error);
          }
        };
      
        fetchData();
      }, [name]);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => { 
      setName(e.target.value);
    };
  
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => { 
      setPassword(e.target.value);
    };
    return (
        <>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              {pass && <div className='w-16 mx-auto text-center text-xl text-white bg-green-400 font-bold border-2 border-green-400 rounded-lg'>true</div>}
              {!pass && <div className='w-16 mx-auto text-center text-xl text-white bg-red-400 font-bold border-2 border-red-400 rounded-lg'>false</div>}
              <div className="flex flex-row">
                <label className="block text-gray-700">Name:</label>
                {!pass && <span className='text-red-500'>すでに名前が存在しています</span>}
              </div>
              
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                required
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </>
      );
}

export default Signup;