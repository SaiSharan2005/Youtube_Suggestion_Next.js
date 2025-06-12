"use client"
import React, { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitcher'
import Image from 'next/image';
import Link from "next/link";
import { useUserContext } from '@/context/userData';
import { useRouter } from 'next/navigation'
import { LogOut } from '@/components/FetchData';

function Navbar() {
  const [showExtra, setShowExtra] = useState<boolean>(false)
  const [showNav, setShowNav] = useState<boolean>(false)
  const { userId, setUsername, username, loginStatus, setLoginStatus, getUserDataWithToken } = useUserContext();
  const router = useRouter()
  useEffect(() => {
    getUserDataWithToken(localStorage.getItem("token"))
  })
  const logoutUser = async () => {
    try {
      const response = await LogOut(await localStorage.getItem('token'))

      if (response) {
        localStorage.removeItem('token');
        setLoginStatus(false)
        setUsername("")
        router.push('/login')
      } else {
        console.error('Logout failed:',);
      }
    } catch (error: any) {
      console.error('Logout failed:', error.message);
      // Handle logout failure
    }


  }
  return (
    <>
      <nav className=" border-b-2 border-gray-200 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" onClick={() => setShowNav(!showNav)} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                {/* LOGO HERE */}
                <Link legacyBehavior href="/home">
                  <a>
                    <Image
                      src="/elancode_transparent.png"       // path in public/
                      alt="ElanCode Logo"
                      width={55}    // ← was 32
                      height={55}   // ← was 32
                      priority             // optional: for critical images
                    />
                  </a>
                </Link>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link href={"/home"}>
                    <p className="text-white bg-purple-500 rounded-md px-3 py-2 text-sm font-medium dark:bg-gray-900 dark:text-white" aria-current="page">Home</p>
                  </Link>
                  <Link href="/course">
                    <p className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-sm font-medium  dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">Course</p>

                  </Link>
                  {/* <p className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-sm font-medium  dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">Projects</p>
                  <p className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-sm font-medium  dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">Calendar</p> */}
                </div>
              </div>

            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <p className='mx-3 font-bold'>{username.toUpperCase()}</p>
              <ThemeSwitch />
              {loginStatus ?
                <div className="relative ml-3">
                  <div>
                    <button onClick={() => setShowExtra(!showExtra)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <Image className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={100} height={100} />
                    </button>
                  </div>

                  {showExtra ? <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Your Profile</a> */}
                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">Settings</a> */}

                    <p onClick={logoutUser} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Log out</p>


                  </div> : <></>}

                </div>
                : <div className='hidden sm:ml-6 sm:flex '>

                  <Link href="/login">
                    <p className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-md font-medium  dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">Login</p>

                  </Link>
                  <Link href="/signup">
                    <p className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-md font-medium  dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">SignUp</p>

                  </Link>
                </div>
              }
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          {showNav ?
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link href={"/home"}>
                <p className=" text-gray-700 hover:bg-purple-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" aria-current="page">Home</p>
              </Link>
              <Link href={"/course"}>
                <p className=" text-gray-700 hover:bg-purple-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Course</p>
              </Link>
              <Link href={"/login"}>
                <p className=" text-gray-700 hover:bg-purple-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Login</p>
              </Link>
              <Link href={"/signup"}>
                <p className=" text-gray-700 hover:bg-purple-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Signup</p>
              </Link>
              {/* <Link href={"/home"}>
                <p className=" text-gray-700 hover:bg-purple-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Projects</p>
              </Link>
              <Link href={"/home"}>
                <p className=" text-gray-700 hover:bg-purple-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Calendar</p>
              </Link> */}
            </div>


            : <></>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar
