import Link from "next/link";
import { SiPhotobucket } from "react-icons/si";

export function Nav () {
    return (
        <nav className="flex justify-between items-center bg-[#F0ECE5] py-3 px-3 md:px-12 lg:px-16">
          {/* <button className="text-sm md:text-lg text-[#31304D] flex flex-col md:flex-row md:gap-2 border border-[#31304D] rounded-md p-3">
            <span>Yield</span>
            <span>Calculator</span>
          </button>  */}

          <Link href="/">
            <SiPhotobucket className="text-[#31304D] text-3xl"/>
          </Link>

          <Link className="border-b-2 border-[#31304D] text-[#31304D] py-3" href="/auth/signin">Sign in</Link>
        </nav>
    )
}