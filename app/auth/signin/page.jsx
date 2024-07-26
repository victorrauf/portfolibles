import Image from "next/image";
import { FaGoogle } from "react-icons/fa"

export default function Signin() {
    return (
        <main className="h-screen flex justify-center items-center py-16 px-8 bg-gradient-to-b from-slate-950 to-black">
            <div className="w-full h-full md:w-[380px] grid grid-rows-2 border border-slate-500 rounded-lg">
                <div>
                    <Image 
                    width={380} 
                    height={120} 
                    src="/portfolio.jpg" 
                    alt="financial document"
                    className="rounded-t-lg"/>
                </div>
                <div className="bg-green-50 p-4 flex flex-col justify-around">
                    <h1 className="text-xl">Signin to start managing your portfolio</h1>
                    <button className="flex justify-center items-center gap-3 border border-green-800 p-2 rounded-lg">
                        <FaGoogle className="text-green-700 text-4xl"/> 
                        <span className="text-lg uppercase">Sign in To Continue</span>
                    </button>
                </div>
            </div>
        </main>
    )
}