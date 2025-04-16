"use client";

import React, { useState, useEffect, useRef } from "react";

const NebulaChat: React.FC = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<
    { role: "user" | "bot"; message: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Ambil session ID dari localStorage jika ada
  useEffect(() => {
    const stored = localStorage.getItem("nebula_session_id");
    if (stored) setSessionId(stored);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setChatLog((prev) => [...prev, { role: "user", message: input }]);
    setLoading(true);

    try {
      const res = await fetch("/api/nebula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          stream: false,
          session_id: sessionId || undefined, // hanya kirim kalau sudah ada
        }),
      });

      const text = await res.text();
      let botMessage = "🤖 No response";

      try {
        const data = JSON.parse(text);
        botMessage = data?.message || botMessage;

        // ✅ Simpan session_id dari response kalau belum ada
        if (!sessionId && data?.session_id) {
          setSessionId(data.session_id);
          localStorage.setItem("nebula_session_id", data.session_id);
        }
      } catch (err) {
        console.warn("⚠️ Failed to parse JSON:", text);
        botMessage = text;
      }

      setChatLog((prev) => [...prev, { role: "bot", message: botMessage }]);
    } catch (err) {
      console.error("❌ Error:", err);
      setChatLog((prev) => [
        ...prev,
        { role: "bot", message: "❌ Error fetching response" },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const renderMessage = (
    entry: { role: "user" | "bot"; message: string },
    idx: number
  ) => {
    const { role, message } = entry;
    const isCodeBlock = message.includes("```");

    if (!isCodeBlock) {
      return (
        <div
          key={idx}
          style={{ textAlign: role === "user" ? "right" : "left" }}
        >
          <p>
            <strong>{role === "user" ? "🧍 You" : "🤖 Nebula"}:</strong> {message}
          </p>
        </div>
      );
    }

    const parts = message.split(/(```[\s\S]*?```)/g).filter(Boolean);

    return (
      <div key={idx} style={{ textAlign: role === "user" ? "right" : "left" }}>
        <p>
          <strong>{role === "user" ? "🧍 You" : "🤖 Nebula"}:</strong>
        </p>
        {parts.map((part, i) =>
          part.startsWith("```") ? (
            <pre
              key={i}
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                padding: "12px",
                borderRadius: "8px",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                marginTop: "8px",
              }}
            >
              <code>
                {part.replace(/```[a-z]*\n?/, "").replace(/```$/, "")}
              </code>
            </pre>
          ) : (
            <p key={i}>{part}</p>
          )
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>🧠 Nebula Chat (Thirdweb AI)</h2>

      <div
        style={{
          width: "800px",
          minHeight: "300px",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
          overflowY: "auto",
          maxHeight: "400px",
        }}
      >
        {chatLog.map((entry, idx) => renderMessage(entry, idx))}
        {loading && <p>⏳ Bot is thinking...</p>}
        <div ref={bottomRef} />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        style={{ width: "70%", padding: "8px", backgroundColor: "#e6e6e6" }}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{ padding: "8px 12px", marginLeft: "8px" }}
      >
        Send
      </button>
    </div>
  );
};

export default NebulaChat;
