// components/CryptoToFiatConverter.tsx
import React, { useState } from "react";
import { useCryptoToFiat } from "@/hooks/useCryptoToFiat";
import { useActiveWalletChain } from "thirdweb/react";

const CryptoToFiatConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const { result, loading, error } = useCryptoToFiat({ fromAmount: amount });
  const chain = useActiveWalletChain();

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 400,
        margin: "auto",
        fontFamily: "sans-serif",
      }}
      className="flex flex-col"
    >
      <h2>Crypto ➜ USD Converter</h2>
      Amount ({chain?.nativeCurrency?.symbol ?? "Native Token"}):
      <div className="flex">
        <label className="flex flex-col">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min={0}
            step={0.01}
            style={{
              display: "block",
              marginTop: 8,
              padding: 10,
              fontSize: 16,
              width: "50%",
              boxSizing: "border-box",
              borderColor: "black",
            }}
          />
        </label>

        <div style={{ marginTop: 20 }}>
          {loading && <p>Converting...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {!loading && result !== null && (
            <p>
              ≈ <strong>${result.toFixed(2)}</strong> USD
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoToFiatConverter;
