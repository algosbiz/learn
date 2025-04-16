
import { defineChain, getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/app/client";
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
});

export default function StakeInfo() {
  const account = useActiveAccount();
  const address = account?.address;
  const { data: stakeInfo } = useReadContract({
    contract,
    method:
      "function getStakeInfo(address staker) view returns (uint256 tokensStaked, uint256 rewards)",
    params: [address || "0x0000000000000000000000000000000000000000"],
  });
    console.log("🚀 ~ stakeInfo:", stakeInfo);
    
  return (
    <div>
      <div>Staked Tokens: {stakeInfo ? stakeInfo[0].toString() : "-"}</div>
      <div>Reward: {stakeInfo ? stakeInfo[1].toString() : "-"}</div>
    </div>
  );
}