import { useConnectedWalletBalance } from "@/hooks/useWallet";
import { client } from "@/app/client";


export default function BalanceCard() {

  const { wallet, address,displayValue, symbol, isLoading, isError } =
    useConnectedWalletBalance(client);
  if (!wallet) return <p>🔌 Wallet belum connect</p>;
  if (isLoading) return <p>⏳ Mengambil balance...</p>;
  if (isError) return <p>❌ Gagal mengambil balance</p>;

  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h2 className="font-bold text-lg mb-2">💼 Wallet Info</h2>
      <p>Address: {address}</p>
      <p className="text-xl mt-2">
        💰 {displayValue} {symbol}
      </p>
    </div>
  );
}
