"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#023838] text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logo.png"
              alt="EcoBin Logo"
              className="h-12 w-32 mr-3 cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-lg font-medium items-center">
          <li>
            <Link href="/classify">Classify</Link>
          </li>
          <li>
            <Link href="/report">Report</Link>
          </li>
          {session && (<li>
              <Link href="/rewards">Reward</Link>
            </li>)}
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link href="https://forms.gle/v6LuJQdsMTzuG8iw6">Collaboration</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/news">News</Link>
          </li>

          {/* Account Dropdown */}
          <li className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none">
              {status === "loading" ? (
                <span>Loading...</span>
              ) : session ? (
                <>
                  <span className="truncate max-w-[150px]">
                    {session.user.email}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </>
              ) : (
                <>
                  <span>Account</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {status === "loading" ? (
                <li className="px-4 py-2">Loading...</li>
              ) : session ? (
                <>
                  <li className="px-4 py-2 text-gray-500">
                    Signed in as:
                    <br />
                    <span className="font-medium text-black truncate block">
                      {session.user.email}
                    </span>
                  </li>
                  <li className="border-t">
                    <button
                      onClick={() => signOut()}
                      className="px-4 py-2 w-full text-left hover:bg-gray-200 text-red-600"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => signIn("google")}
                      className="px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      Sign in with Google
                    </button>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const NavbarWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      {/* If you have a footer, you can include it here */}
    </div>
  );
};

export default NavbarWrapper;
