// hooks/useCryptoToFiat.ts
import { useEffect, useState } from "react";
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { useActiveWalletChain } from "thirdweb/react";
import { convertCryptoToFiat } from "thirdweb/pay";
import type { ThirdwebClient } from "thirdweb";
import { client as defaultClient } from "@/app/client";

interface UseCryptoToFiatProps {
  client?: ThirdwebClient;
  fromAmount: number;
  fromTokenAddress?: string;
  toCurrency?: "USD";
}

export const useCryptoToFiat = ({
  client = defaultClient,
  fromAmount,
  fromTokenAddress = NATIVE_TOKEN_ADDRESS,
  toCurrency = "USD",
}: UseCryptoToFiatProps) => {
  const chain = useActiveWalletChain(); 
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversion = async () => {
      if (!chain) {
        setError("Wallet not connected to a chain.");
        return;
      }

      setLoading(true);
      try {
        const res = await convertCryptoToFiat({
          chain,
          client,
          fromAmount,
          fromTokenAddress,
          to: toCurrency,
        });
        setResult(res.result);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to convert crypto to fiat.");
      } finally {
        setLoading(false);
      }
    };

    if (fromAmount > 0 && chain) {
      fetchConversion();
    }
  }, [chain, client, fromAmount, fromTokenAddress, toCurrency]);

  return { result, loading, error };
};
