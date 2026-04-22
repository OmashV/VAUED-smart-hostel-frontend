import api from "./axios";

export const sendChatbotMessage = async (payload) => {
  const res = await api.post("/chatbot/message", payload);
  return res.data;
};

export const getChatbotSuggestedPrompts = async () => {
  const res = await api.get("/chatbot/suggested-prompts");
  return res.data;
};

export const getChatbotHistory = async (params = {}) => {
  const res = await api.get("/chatbot/history", { params });
  return res.data;
};
