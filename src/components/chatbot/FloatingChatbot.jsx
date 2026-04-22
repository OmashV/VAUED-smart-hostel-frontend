import { useState } from "react";
import { askChatbot, explainChart, suggestInsights } from "../../api/chatbotApi";
import { useDashboardContext } from "../../context/DashboardContext";

const suggestedQuestionsByView = {
  owner_dashboard: [
    "Which rooms have the highest waste risk?",
    "Explain the energy trend",
    "What should the owner focus on next?",
  ],
  warden_dashboard: [
    "Which rooms should the warden prioritize today?",
    "Where are the complaint hotspots?",
    "What should be checked first?",
  ],
  security_dashboard: [
    "Which rooms are highest risk?",
    "Explain the alert pattern",
    "What incidents need attention first?",
  ],
  student_dashboard: [
    "Explain my energy usage",
    "Why are alerts appearing for this room?",
    "What should I improve?",
  ],
};

export default function FloatingChatbot() {
  const { activeView, filters, selectedChart } = useDashboardContext();

  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi. I'm your analytics assistant. Ask about trends, waste, alerts, comparisons, or what to do next.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const suggestions =
    suggestedQuestionsByView[activeView] || [
      "Explain this dashboard",
      "What should I check first?",
      "Give me useful insights",
    ];

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

      appendMessage({ role: "assistant", content: res.data.answer });
      setQuestion("");
    } catch (error) {
      appendMessage({ role: "assistant", content: "I couldn't generate an answer right now." });
      console.error(error);
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

      appendMessage({ role: "assistant", content: res.data.answer });
    } catch (error) {
      appendMessage({ role: "assistant", content: "I couldn't generate insights right now." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExplainChart = async () => {
    if (!selectedChart || selectedChart === "overview") {
      appendMessage({
        role: "assistant",
        content: "No chart is selected right now. Click a chart first.",
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

      appendMessage({ role: "assistant", content: res.data.answer });
    } catch (error) {
      appendMessage({
        role: "assistant",
        content: "I couldn't explain the current chart right now.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-head">
            <div>
              <strong>Analytics Assistant</strong>
              <br />
              <small>
                {activeView}
                {selectedChart ? ` | ${selectedChart}` : ""}
              </small>
            </div>
            <button className="ui-btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>

          <div className="chatbot-quick">
            {suggestions.map((item) => (
              <button key={item} onClick={() => handleAsk(item)} className="chatbot-pill">
                {item}
              </button>
            ))}
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.role}`}>
                <div className="bubble">{msg.content}</div>
              </div>
            ))}
          </div>

          <div className="chatbot-foot">
            <div className="chatbot-actions">
              <button onClick={handleSuggestInsights} disabled={loading} className="chatbot-action">
                Suggest Insights
              </button>
              <button onClick={handleExplainChart} disabled={loading} className="chatbot-action">
                Explain Chart
              </button>
            </div>

            <div className="chatbot-input-row">
              <input
                className="chatbot-input"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAsk();
                }}
              />
              <button onClick={() => handleAsk()} disabled={loading} className="chatbot-send">
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen((prev) => !prev)} className="chatbot-fab" title="Open Analytics Assistant">
        AI
      </button>
    </>
  );
}
