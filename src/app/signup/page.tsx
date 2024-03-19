"use client"
import React, { useState } from 'react';
import Link from "next/link"
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { redirect } from 'react-router-dom';
import { useUserContext } from '@/context/userData';
import { useRouter } from 'next/navigation'

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showPassword2, setShowPassword2] = useState(false); // State to toggle confirm password visibility
    const [passwordError, setPasswordError] = useState('');
    const {setLoginStatus} = useUserContext();
    const router = useRouter()
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const validatePassword = (password: string): boolean => {
        // Password must be at least 7 characters long
        if (password.length < 7) {
            setPasswordError('Password must be at least 7 characters long');
            return false;
        }
        // Password must contain at least one letter, one special character, and one number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!password.match(passwordRegex)) {
            setPasswordError('Password must contain at least one letter, one special character, and one number');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        if (password2) {
            validatePassword(password);
        }
    };

    const handlePassword2Change = (password: string) => {
        setPassword2(password);
        if (password) {
            validatePassword(password);
        }
    };

    const submitSignup = async () => {
        try {
            if (!validatePassword(password)) {
                return;
            }
            if (password !== password2) {
                setPasswordError('Passwords do not match');
                return;
            }


            const token = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "username": username,
                  "email": email,
                  "password": password,
                  "password2": password2
              }),    });
          
            if (!token.ok) {
                // Handle non-successful response (e.g., show an error message)
                setLoginStatus(false)
                throw new Error('Signup failed');
            }

            const response = await token.json();
            localStorage.setItem('token', response.token.access);
            localStorage.setItem('refresh', response.token.refresh);
            setLoginStatus(true);
            router.push("/home")

        }
        catch (error: any) {
            console.error('Error during signup:', error.message);
            // Handle error (e.g., show an error message to the user)
        }
    };



    return (
        <>
            <div className='max-w-[400px] mx-auto h-[80vh] flex flex-col items-center justify-center  '>

                <h1 className='font-semibold text-2xl m-5'>Sign Up for Programmer Hub</h1>
                <div className="bg-gray-200 px-6 py-4 w-full rounded-lg border-gray-300 border-2 dark:bg-gray-900 dark:border-none">
                    <div className="my-3 ">
                        <label htmlFor="" className='text-sm font-semibold'>Username:</label>
                        <input type="text" className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 rounded dark:border-purple-900" value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="my-3 ">
                        <label htmlFor="" className='text-sm font-semibold'>Email:</label>
                        <input type="email" className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 rounded dark:border-purple-900" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="" className='text-sm font-semibold'>Password:</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 pr-10 rounded dark:border-purple-900" value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)} />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
                            </span>
                        </div>
                        {/* {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>} */}
                    </div>
                    <div className='my-3'>
                        <label htmlFor="" className='text-sm font-semibold'>Confirm Password:</label>
                        <div className="relative">
                            <input type={showPassword2 ? "text" : "password"} className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 pr-10 rounded dark:border-purple-900" value={password2}
                                onChange={(e) => handlePassword2Change(e.target.value)} />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {showPassword2 ? <FaEyeSlash onClick={togglePasswordVisibility2} /> : <FaEye onClick={togglePasswordVisibility2} />}
                            </span>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    <button className="my-3 w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded" onClick={submitSignup}>
                        Sign Up
                    </button>
                    <div className="flex justify-center ">
                        <p className="mr-2 text-sm">Already have an account ? </p>
                        <Link href="/login" className="text-purple-700 text-sm font-semibold">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </>


    );

};

export default Signup;
