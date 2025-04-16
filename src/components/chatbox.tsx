"use client";

import { useState } from "react";
import { askNebula } from "../utils/nebula";
import { useActiveWalletChain, useActiveWallet } from "thirdweb/react";
import { client } from "@/app/client";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
    const wallet = useActiveWallet();
    console.log("🚀 ~ wallet:", wallet);
    
    const chain = useActiveWalletChain();
    console.log("🚀 ~ chain:", chain);
    

  const sendMessage = async () => {
    if (!input) return;

    // 🚨 Cek dulu apakah chain tersedia
    if (!chain) {
      alert(
        "❌ Wallet belum terhubung ke jaringan! Silakan connect wallet dan pilih jaringan."
      );
      return;
    }

    const newMessages = [
      ...messages,
      { role: "user" as const, content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await askNebula(client,input, chain);
      const assistantReply = {
        role: "assistant" as const,
        content: response.message,
      };
      setMessages([...newMessages, assistantReply]);

      if (response.transactions.length > 0) {
        console.log("🚀 Transaksi yang tersedia:", response.transactions);
      }
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>🤖 Nebula Chat</h2>
      <p>🌐 Chain Aktif: {chain?.name ?? "Tidak terhubung"}</p>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: 8,
            }}
          >
            <strong>{msg.role === "user" ? "Kamu" : "Nebula"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        placeholder="Tanya sesuatu ke Nebula..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{ width: "100%", padding: 10 }}
      >
        {loading ? "Menjawab..." : "Kirim"}
      </button>
    </div>
  );
}
