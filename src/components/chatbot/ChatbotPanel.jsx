import { useState } from "react";
import { askChatbot, suggestInsights } from "../../api/chatbotApi";

export default function ChatbotPanel({ filters, activeView }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await askChatbot({
        question,
        filters,
        chartContext: {
          activeView,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.answer,
        },
      ]);
      setQuestion("");
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to get response from chatbot.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestInsights = async () => {
    setLoading(true);
    try {
      const res = await suggestInsights({ filters });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to generate insights.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #334155",
        borderRadius: "12px",
        background: "#0f172a",
        padding: "16px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Analytics Assistant</h3>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "12px",
          border: "1px solid #1e293b",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            Ask about energy usage, alerts, waste patterns, or request insights.
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                textAlign: msg.role === "user" ? "right" : "left",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: msg.role === "user" ? "#1d4ed8" : "#1e293b",
                  color: "#fff",
                  maxWidth: "85%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleSuggestInsights}
        style={{
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Suggest Insights
      </button>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#020617",
            color: "#fff",
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
