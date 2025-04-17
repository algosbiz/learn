import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";


const nftContractAddress = "0x8c8d1C632F63505EB6F3937D2955B4B079f3f94D";
const rewardTokenContractAddress = "0xE9Cd6C8E2Ea9a29C56743865604C07b9D15729Ce";
const stakingContractAddress = "0x0047555764192c3627a854c04E0eA12ce258BcA8";

export const NFT_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: nftContractAddress,
});

export const REWARD_TOKEN_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: rewardTokenContractAddress,
});

export const STAKING_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: stakingContractAddress,
  abi: stakingABI
});
