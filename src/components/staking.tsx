"use client";

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { NFT } from "thirdweb";
import { useEffect, useState } from "react";
import {
  claimTo,
  getNFTs,
  ownerOf,
  totalSupply,
} from "thirdweb/extensions/erc721";
import { NFT_CONTRACT, STAKING_CONTRACT } from "@/utils/contract";
import { NFTCard } from "./NFTCard";
import { StakedNFTCard } from "./stakeNFTCard";
import { StakeRewards } from "./stakeReward";

export const Staking = () => {
  const account = useActiveAccount();
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

  const getOwnedNFTs = async () => {
    let ownedNFTs: NFT[] = [];

    const totalNFTSupply = await totalSupply({ contract: NFT_CONTRACT });
    const nfts = await getNFTs({
      contract: NFT_CONTRACT,
      start: 0,
      count: parseInt(totalNFTSupply.toString()),
    });

    for (let nft of nfts) {
      const owner = await ownerOf({
        contract: NFT_CONTRACT,
        tokenId: nft.id,
      });
      if (owner === account?.address) {
        ownedNFTs.push(nft);
      }
    }
    setOwnedNFTs(ownedNFTs);
  };

  useEffect(() => {
    if (account) {
      getOwnedNFTs();
    }
  }, [account]);

  const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
    contract: STAKING_CONTRACT,
    method: "getStakeInfo",
    params: [account?.address || ""],
  });

  // 👉 Tambahan fallback UI ketika belum connect wallet
  if (!account) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          backgroundColor: "#f2f2f2",
          borderRadius: "12px",
          padding: "40px",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h2>Please connect your wallet to start staking</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#e6e6e6",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px 0",
          width: "100%",
        }}
      >
        <h2 style={{ marginRight: "20px" }}>Claim NFT to Stake</h2>
        <TransactionButton
          transaction={() =>
            claimTo({
              contract: NFT_CONTRACT,
              to: account?.address || "",
              quantity: BigInt(1),
            })
          }
          onTransactionConfirmed={() => {
            alert("NFT claimed!");
            getOwnedNFTs();
          }}
          style={{
            fontSize: "12px",
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Claim NFT
        </TransactionButton>
      </div>
      <hr style={{ width: "100%", border: "1px solid #333" }} />
      <div style={{ margin: "20px 0", width: "100%" }}>
        <h2>Owned NFTs</h2>
        <div className="grid grid-cols-2 gap-4">
          {ownedNFTs && ownedNFTs.length > 0 ? (
            ownedNFTs.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                refetch={getOwnedNFTs}
                refecthStakedInfo={refetchStakedInfo}
              />
            ))
          ) : (
            <p>You own 0 NFTs</p>
          )}
        </div>
      </div>
      <hr style={{ width: "100%", border: "1px solid #333" }} />
      <div style={{ width: "100%", margin: "20px 0" }}>
        <h2>Staked NFTs</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "500px",
          }}
        >
          {stakedInfo && stakedInfo[0].length > 0 ? (
            stakedInfo[0].map((nft: any, index: number) => (
              <StakedNFTCard
                key={index}
                tokenId={nft}
                refetchStakedInfo={refetchStakedInfo}
                refetchOwnedNFTs={getOwnedNFTs}
              />
            ))
          ) : (
            <p style={{ margin: "20px" }}>No NFTs staked</p>
          )}
        </div>
      </div>
      <hr style={{ width: "100%", border: "1px solid #333" }} />
      <StakeRewards />
    </div>
  );
};
