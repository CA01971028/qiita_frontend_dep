'use client';
import { useState, FormEvent, ChangeEvent } from 'react'; 
import { useRouter } from 'next/navigation';

const Login = () => {
  const [name, setName] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
        credentials: 'include',
      });

      const responseData: { success?: boolean; message?: string } = await response.json();
      if (responseData.success) {
        router.push('/');
      } else {
        setError(responseData.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred');
    }
  };

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
          <label className="block text-gray-700">Name:</label>
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
};

export default Login;

