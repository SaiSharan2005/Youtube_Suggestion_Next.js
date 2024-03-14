"use client"
import React, { useState } from 'react';
import Link from "next/link"
const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async () => {
        try {
            const token = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!token.ok) {
                // Handle non-successful response (e.g., show an error message)
                throw new Error('Login failed');
            }

            const response = await token.json();
            localStorage.setItem('token', response.token);
        } catch (error: any) {
            console.error('Error during login:', error.message);
            // Handle error (e.g., show an error message to the user)
        }
    };

    const draftMode = async () => {
        console.log(process.env.BACKEND_URL + "/api/login")
        const data = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "iamdevil",
                password: "Lucifer@2005",
            }),
        });
        // const responseText = await data.text();

        console.log("data:", await data.text())

    }
    return (
        <div className="bg-gray-200 p-3 w-full rounded-lg border-gray-300 border-2 ">
            <div className="my-3 ">
                <label htmlFor="" className='text-sm font-semibold  '>Username:</label>
                <input type="text" className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 rounded " />
            </div>
            <div className='my-3'>
                <label htmlFor="" className='text-sm font-semibold'>Password:</label>
                <input type="password" className="w-full border border-gray-300 focus:border-purple-500 focus:border-2 outline-none mt-2 py-2 px-4 rounded " />

            </div>
            <button className="my-3 w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
            <div className="flex justify-center ">
                <p className="mr-2 text-sm">New to Programmerhub ? </p>
                <Link href="/signup" className="text-purple-700 text-sm font-semibold">
                    Create an account
                </Link>
            </div>

        </div>
    );

};

export default Login;
