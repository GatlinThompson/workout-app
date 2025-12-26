"use client";

import { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { wsSender } from "@/utils/utils";

export default function WebSocketPage() {
  const wsRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "connecting" | "open" | "closed" | "error"
  >("connecting");
  const [received, setReceived] = useState<string[]>([]);

  useEffect(() => {
    // Create WS connection when component mounts
    const ws = new WebSocket("ws://localhost:8080/websocket");
    wsRef.current = ws;

    ws.onopen = () => setStatus("open");
    ws.onclose = () => setStatus("closed");
    ws.onerror = () => setStatus("error");

    ws.onmessage = (event) => {
      setReceived((prev) => [...prev, event.data]);
    };

    // Cleanup when component unmounts / route changes
    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ws = wsRef.current;
    if (!ws) return;

    // If already open, send right now
    if (ws.readyState === WebSocket.OPEN) {
      const payload = { msg: message, sender: "Bill" };
      ws.send(wsSender("message", payload));
      setMessage("");
      return;
    }

    // If still connecting, send once it opens
    if (ws.readyState === WebSocket.CONNECTING) {
      const payload = { msg: message, sender: "Bill" };

      ws.onopen = () => {
        ws.send(JSON.stringify(payload));
      };

      setMessage("");
      return;
    }
  };

  return (
    <div>
      <div>
        <h1>Discussion</h1>
        <p>Status: {status}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          title="message"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <Button type="submit" className="mt-4" disabled={status !== "open"}>
          Send Message
        </Button>
      </form>

      <div style={{ marginTop: 16 }}>
        <h2>Incoming</h2>
        <ul>
          {received.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
