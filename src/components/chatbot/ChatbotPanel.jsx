import { useState } from "react";
import { askChatbot, suggestInsights, explainChart } from "../../api/chatbotApi";

const suggestedQuestions = [
  "Which rooms have the highest waste risk?",
  "Explain the energy trend",
  "What should the owner focus on next?",
];

export default function ChatbotPanel({ filters, activeView, selectedChart }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ask about trends, waste, alerts, comparisons, or decision support. I can also explain the current chart.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const appendMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleAsk = async (customQuestion = null) => {
    const q = (customQuestion ?? question).trim();
    if (!q) return;

    appendMessage({ role: "user", content: q });
    setLoading(true);

    try {
      const res = await askChatbot({
        question: q,
        filters,
        chartContext: {
          activeView,
          selectedChart,
        },
      });

      appendMessage({
        role: "assistant",
        content: res.data.answer,
      });

      setQuestion("");
    } catch (error) {
      appendMessage({
        role: "assistant",
        content: "I couldn't generate an answer right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestInsights = async () => {
    setLoading(true);

    try {
      const res = await suggestInsights({
        filters,
        chartContext: {
          activeView,
          selectedChart,
        },
      });

      appendMessage({
        role: "assistant",
        content: res.data.answer,
      });
    } catch (error) {
      appendMessage({
        role: "assistant",
        content: "I couldn't generate insights right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExplainChart = async () => {
    if (!selectedChart) {
      appendMessage({
        role: "assistant",
        content: "No chart is selected right now. Select a chart first.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await explainChart({
        filters,
        chartContext: {
          activeView,
          selectedChart,
        },
      });

      appendMessage({
        role: "assistant",
        content: res.data.answer,
      });
    } catch (error) {
      appendMessage({
        role: "assistant",
        content: "I couldn't explain the current chart right now.",
      });
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
        display: "flex",
        flexDirection: "column",
        minHeight: "560px",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "12px" }}>Analytics Assistant</h3>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
        {suggestedQuestions.map((item) => (
          <button
            key={item}
            onClick={() => handleAsk(item)}
            style={{
              padding: "8px 12px",
              borderRadius: "999px",
              border: "1px solid #334155",
              background: "#1e293b",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "12px",
          border: "1px solid #1e293b",
          borderRadius: "8px",
          padding: "12px",
          background: "#0b1220",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "12px",
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 12px",
                borderRadius: "10px",
                background: msg.role === "user" ? "#2563eb" : "#1e293b",
                color: "#fff",
                maxWidth: "90%",
                whiteSpace: "pre-wrap",
                lineHeight: 1.5,
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button onClick={handleSuggestInsights} disabled={loading} style={actionButtonStyle}>
          Suggest Insights
        </button>

        <button onClick={handleExplainChart} disabled={loading} style={actionButtonStyle}>
          Explain Current Chart
        </button>
      </div>

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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
        />
        <button
          onClick={() => handleAsk()}
          disabled={loading}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#e5e7eb",
            color: "#111827",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

const actionButtonStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "#fff",
  cursor: "pointer",
};
