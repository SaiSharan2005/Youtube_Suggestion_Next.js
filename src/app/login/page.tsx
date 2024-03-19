"use client"
import React, { useState,useEffect } from 'react';
import Link from "next/link"
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useUserContext } from '@/context/userData';
import { useRouter } from 'next/navigation'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [LoginFail, setLoginFail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const {loginStatus,setLoginStatus} = useUserContext();
  const router = useRouter()
  // useEffect(()=>{
  //   if(loginStatus){
  //     router.push("/home");
  //     alert("You are already logged in");
  //   }
  // })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitLogin = async () => {
    try {
      console.log(username, password)
      const token = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password }),
      });

      if (!token.ok) {
        // Handle non-successful response (e.g., show an error message)
        setLoginFail(true);
        setLoginStatus(false);
        throw new Error('Login failed');
      }

      const response = await token.json();
      localStorage.setItem('token', response.token);
      setLoginStatus(true)
      router.push("/home")
    } catch (error: any) {
      console.error('Error during login:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };


  return (
    <>
      <div className='max-w-[400px] mx-auto h-[80vh] flex flex-col items-center justify-center  '>
        <h1 className='font-semibold text-2xl m-5'>Login to Programmer Hub</h1>

        <div className="bg-gray-200 px-6 py-4 w-full rounded-lg border-gray-300 border-2 dark:bg-gray-900 dark:border-none">
          <div className="my-3 ">
            <label htmlFor="" className='text-sm font-semibold  '>Username:</label>
            <input type="text" className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 rounded dark:border-purple-900" value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='my-3'>
            <label htmlFor="" className='text-sm font-semibold'>Password:</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 pr-10 rounded dark:border-purple-900" value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
              </span>
            </div>
          </div>
          {LoginFail?
          <div className='bg-red-100 border-red-500 p-2 text-red-500 w-full rounded-xl'>
          <p>
            username or password didnt match
          </p>
        </div>:<></>
          
        }
          <button className="my-3 w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded" onClick={submitLogin}>
            Login
          </button>
          <div className="flex justify-center ">
            <p className="mr-2 text-sm">Already have an account ? </p>
            <Link href="/signup" className="text-purple-700 text-sm font-semibold">
              Log in
            </Link>
          </div>

        </div>
      </div>
    </>


  );

};

export default Login;
