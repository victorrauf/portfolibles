import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { signIn } from "next-auth/react"
import { auth } from "@/auth";

export default async function Auth() {
    const session = await auth();
    console.log("get user session",session)

    return (
        <main className="min-h-screen flex justify-center mt-[108px] lg:mt-[120px] lg:pt-0 px-3 md:px-0">
            <div className="h-full w-full md:w-[320px] flex flex-col gap-8 border border-gray-400 rounded-md p-3 md:p-5">
            <p>Whether you are a new or an existing user, sign in to continue to your account</p>
                <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
                className="flex flex-col gap-3">
                    <button type="submit" className="w-full h-[56px] flex justify-center items-center gap-6 border border-gray-800 p-2 rounded-lg">
                        <FcGoogle className="text-3xl"/> 
                        <span className="text-gray-700">Google</span>
                    </button>
                    <button type="submit" className="w-full h-[56px] flex justify-center items-center gap-6 border border-gray-800 p-2 rounded-lg">
                        <FaGithub className="text-3xl"/> 
                        <span className="text-gray-700">GitHub</span>
                    </button>
                    <button type="submit" className="w-full h-[56px] flex justify-center items-center gap-6 border border-gray-800 p-2 rounded-lg">
                        <FaXTwitter className="text-3xl"/> 
                        <span className="text-gray-700">Twitter</span>
                    </button>
                </form>
            </div>
        </main>
    );
}

