import { defineChain, getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/app/client";
import { STAKING_ABI } from "@/constant/staking";

const binanceChain = defineChain({
  id: 56,
  rpc: "https://bsc-dataseed.binance.org/",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
      decimals: 18,
    
  },
});

const stakingContractAddress = "0x8492D8E17F3e520e171682D792B0eb79dC126B4E";
const contract = getContract({
  address: stakingContractAddress,
  chain: binanceChain,
  client,
  abi: STAKING_ABI
});

export default function StakeInfo() {
  const account = useActiveAccount();
  const address = account?.address;
  const { data: stakeInfo, isLoading } = useReadContract({
    contract,
    method: "getStakeInfo",
    params: [
      "0xB2FE805A538E05a79a5a37AEc093D0b2a79233e9",
    ],
  });
  console.log("🚀 ~ stakeInfo:", stakeInfo);
  
  if (!address) return <div>Connecting wallet...</div>;
  if (isLoading || stakeInfo === undefined)
    return <div>Loading staking info...</div>;

  return (
    <div>
      {/* <div>Staked Tokens: {tokensStaked.toString()}</div>
      <div>Reward: {rewards.toString()}</div> */}
    </div>
  );
}
