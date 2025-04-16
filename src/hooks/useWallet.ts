import {
  useActiveWallet,
  useActiveWalletChain,
  useWalletBalance,
} from "thirdweb/react";
import { useEffect, useState } from "react";
import type { ThirdwebClient } from "thirdweb";
import type { Wallet } from "thirdweb/wallets";

export const useConnectedWalletBalance = (client: ThirdwebClient) => {
  const wallet: Wallet | undefined = useActiveWallet();
  console.log("🚀 ~ wallet:", wallet);
  
  const chain = useActiveWalletChain();
  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    const fetchAddress = async () => {
      const acc = await wallet?.getAccount();
      acc?.address && setAddress(acc.address);
    };
    fetchAddress();
  }, [wallet]);

  const {
    data: balance,
    isLoading,
    isError,
  } = useWalletBalance({
    client,
    address,
    chain,
  });

  return {
    wallet,
    address,
    balance,
    displayValue: balance?.displayValue,
    symbol: balance?.symbol,
    isLoading,
    isError,
  };
};
