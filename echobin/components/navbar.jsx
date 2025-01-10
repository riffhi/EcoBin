"use client";
import React from "react";
import SignIn from "./auth/sign-in-button";
import { useSession } from "next-auth/react";
import SignOut from "./auth/sign-out-button";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="w-full absolute px-4  h-16 bg-[#023838] text-white flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logo.png"
              alt="EcoBin Logo"
              className="h-12 w-32 mr-3 cursor-pointer"
            />
          </Link>
        </div>
        <div className="ml-4">Welcome {session.user.email}

        </div>
        <SignOut />
      </div>
    );
  }
  return (
    <div className="px-4 w-full absolute  h-16 bg-gray-800 text-white flex justify-between items-center">
      <SignIn />
    </div>
  );
};
const NavbarWrapper = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <Navbar />
      <main className="h-full w-full pt-16">{children}</main>
    </div>
  );
};
export default NavbarWrapper;