"use client"
import Link from "next/link";
import { NextResponse } from "next/server";
import { SiPhotobucket } from "react-icons/si";
import { useSession,signOut } from "next-auth/react";

export function Nav () {
  const {data:session} = useSession();

  return (
    <nav className="flex justify-between items-center bg-[#F0ECE5] py-3 px-3 md:px-12 lg:px-16">
      <Link href="/">
        <SiPhotobucket className="text-[#31304D] text-3xl"/>
      </Link>

      {
      session
      ?
      <div className="flex gap-6">
        <Link
        className="border-b-2 border-[#31304D] text-[#31304D] py-3"
        href="/dashboard">Dasshboard</Link>
        <Link
        onClick={async() => {
          await signOut()
          .then((request) => NextResponse.redirect(new URL("/auth",request.url)))
          .catch(error => console.error(error))
        }}
        className="border-b-2 border-[#31304D] text-[#31304D] py-3"
        href="#">Sign out</Link>
      </div>
      :
      <Link
      className="border-b-2 border-[#31304D] text-[#31304D] py-3"
      href="/auth">Sign in</Link>
      }
    </nav>
  )
}