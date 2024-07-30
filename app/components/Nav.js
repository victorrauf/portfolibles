"use client"
import { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiPhotobucket } from "react-icons/si";
import { signOut, useSession } from "next-auth/react";

export function Nav () {
  const {data:session} = useSession();

  // useEffect(() => {
  //   if 
  // },[session])

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
          onClick={() => {
            signOut
          }}
          className="border-b-2 border-[#31304D] text-[#31304D] py-3"
          href="#">Sign out</Link>
          </div>
          :
          <Link
          className="border-b-2 border-[#31304D] text-[#31304D] py-3"
          href="/auth/signin">Sign in</Link>
          }
        </nav>
    )
}