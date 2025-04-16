"use client";
import dynamic from "next/dynamic";
import BalanceCard from "@/components/fetching-wallet";
import Navbar from "@/components/navbar";
import ChatBox from "@/components/chatbox";
import EventFetcher from "@/components/apitesting";
import NebulaChat from "@/components/nebula";
import StakeInfo from "@/components/stake-monitor";
const CryptoToFIatConverter = dynamic(
  () => import("@/components/cryptoConverter"),
  { ssr: false }
);



export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-xl mx-auto">
      <div className="py-20">
        <Navbar />
        <div className="w-full flex flex-col gap-10 justify-center text-center">
          <h1 className="text-black">Learning</h1>
          <BalanceCard />
          <CryptoToFIatConverter />
          <NebulaChat/>
          <EventFetcher />
          <StakeInfo/>
        </div>
      </div>
    </main>
  );
}
