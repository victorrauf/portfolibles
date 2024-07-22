import Link from "next/link";
import { GrMoney } from "react-icons/gr";
import { TbTrack } from "react-icons/tb";
import { GiProfit } from "react-icons/gi";
import { FaNoteSticky } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="px-3 md:px-12 lg:px-16 py-12 bg-gradient-to-b from-[#F0ECE5] via-white to-[#B6BBC4]">
      <section className="min:h-screen md:h-screen flex flex-col justify-between gap-16 md:gap-0">
        <div className="row-span-5 flex justify-center items-center">
          <blockquote className="w-full md:w-[480px] lg:w-[720px]">
            <h1 className="text-5xl md:text-6xl text-[#31304D] text-center font-bold">
              <span className="text-[#A91D3A]">Track</span> All Your Stocks and Crypto Investments All One Place
            </h1>
          </blockquote>
        </div>

        <article className="row-span-4 grid md:grid-cols-3 gap-4">
          <ul className="flex flex-col gap-4 border border-[#A91D3A] rounded-lg p-4">
            <li className="flex items-center gap-2">
              <GrMoney className="text-[#A91D3A] text-2xl md:text-4xl"/>
              <span className="text-[#31304D] text-2xl">Yield Potential</span>
            </li>
            <li className="flex items-center gap-2">
              <TbTrack className="text-[#A91D3A] text-2xl md:text-4xl"/>
              <span className="text-[#31304D] text-2xl">Track Investments</span>
            </li>
            <li className="flex items-center gap-2">
              <GiProfit className="text-[#A91D3A] text-2xl md:text-4xl"/>
              <span className="text-[#31304D] text-2xl">Profit Calculator</span>
            </li>
            <li className="flex items-center gap-2">
              <FaNoteSticky className="text-[#A91D3A] text-2xl md:text-4xl"/>
              <span className="text-[#31304D] text-2xl">Keep Notes</span>
            </li>
          </ul>

          <div className="flex flex-col justify-around bg-[#A91D3A] rounded-lg p-4">
            <p className="text-4xl text-[#F0ECE5]">Use Quick Yield Calculator</p>
            <button className="bg-[#F0ECE5] rounded-lg w-full py-3 uppercase text-2xl text-[#161A30]">Calculate</button>
          </div>

          <div className="flex flex-col justify-around bg-[#A91D3A] rounded-lg p-4">
            <p className="text-4xl text-[#F0ECE5]">Start tracking your investment now</p>
            <Link href="#" className="bg-[#F0ECE5] rounded-lg w-full py-3 uppercase text-2xl text-[#161A30] text-center">Get Started</Link>
          </div>
        </article>
      </section>
    </main>
  );
}