"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
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
          <li>
            <Link href="/rewards">Reward</Link>
          </li>
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
              <span>Account</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {/* Dropdown Menu */}
            <ul className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/login">Login</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/signup">Signup</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
