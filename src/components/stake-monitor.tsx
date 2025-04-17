import { getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/app/client";
import { STAKING_ABI } from "@/constant/staking";
import { chain } from "@/app/chain";
import { formatUnits } from "ethers";

const stakingContractAddress = "0x0047555764192c3627a854c04E0eA12ce258BcA8";
const contract = getContract({
  address: stakingContractAddress,
  chain: chain,
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
  
  if (!address) return <div>Connecting wallet...</div>;
  if (isLoading || stakeInfo === undefined)
    return <div>Loading staking info...</div>;
  const [stakedTokenIds, rewards] = stakeInfo;
  const formattedReward = parseFloat(formatUnits(rewards, 18)).toFixed(2);
  return (
    <div>
      <div>Staked Tokens: {stakedTokenIds.length}</div>
      <div>Reward: {formattedReward} TOKEN</div>
    </div>
  );
}
