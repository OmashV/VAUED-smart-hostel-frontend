import api from "./axios";

export const askChatbot = async (payload) => {
  const res = await api.post("/chatbot/ask", payload);
  return res.data;
};

export const explainChart = async (payload) => {
  const res = await api.post("/chatbot/explain-chart", payload);
  return res.data;
};

export const suggestInsights = async (payload) => {
  const res = await api.post("/chatbot/suggest-insights", payload);
  return res.data;
};
