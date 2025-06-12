"use client"
import React, { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitcher'
import Image from 'next/image'
import Link from 'next/link'
import { useUserContext } from '@/context/userData'
import { useRouter } from 'next/navigation'
import { LogOut } from '@/components/FetchData'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [showExtra, setShowExtra] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { userId, setUsername, username, loginStatus, setLoginStatus, getUserDataWithToken } = useUserContext()
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  // mark mounted to avoid SSR mismatch
  useEffect(() => {
    setMounted(true)
    getUserDataWithToken(localStorage.getItem('token'))
  }, [])

  const logoutUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = token ? await LogOut(token) : false
      if (response) {
        localStorage.removeItem('token')
        setLoginStatus(false)
        setUsername('')
        router.push('/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error: any) {
      console.error('Logout failed:', error.message)
    }
  }

  // choose logo based on theme
  const logoSrc = mounted
    ? resolvedTheme === 'dark'
      ? '/elancode_transparent.png'
      : '/elancode_color_logo_on_white.png'
    : '/elancode_Main_Logo.png'

  return (
    <nav className="border-b-2 border-gray-200 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowNav(!showNav)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={showNav}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when closed */}
              <svg className={`${showNav ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              {/* Icon when open */}
              <svg className={`${showNav ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo & Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/home">
                <Image
                  src={logoSrc}
                  alt="ElanCode Logo"
                  width={50}
                  height={50}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/home">
                  <span className="text-white bg-purple-500 rounded-md px-3 py-2 text-sm font-medium dark:bg-gray-900 dark:text-white">
                    Home
                  </span>
                </Link>
                <Link href="/course">
                  <span className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">
                    Course
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="mx-3 font-bold">{username.toUpperCase()}</span>
            <ThemeSwitch />
            {loginStatus ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setShowExtra(!showExtra)}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={showExtra}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User avatar"
                    width={32}
                    height={32}
                  />
                </button>
                {showExtra && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={logoutUser}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:ml-6 sm:flex">
                <Link href="/login">
                  <span className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-md font-medium dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">
                    Login
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="text-black hover:bg-purple-500 rounded-md px-3 py-2 text-md font-medium dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white">
                    Sign Up
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showNav && (
        <div className="sm:hidden px-2 pb-3 pt-2 space-y-1">
          <Link href="/home">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-600 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700">
              Home
            </span>
          </Link>
          <Link href="/course">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-600 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700">
              Course
            </span>
          </Link>
          <Link href="/login">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-600 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700">
              Login
            </span>
          </Link>
          <Link href="/signup">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-600 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700">
              Sign Up
            </span>
          </Link>
        </div>
      )}
    </nav>
  )
}
