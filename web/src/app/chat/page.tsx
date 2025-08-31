"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="p-2 bg-blue-100 rounded">
            {msg}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 mt-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
}
