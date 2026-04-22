import api from "./axios";

export const getSecuritySummary = async (params = {}) => {
  const res = await api.get("/security/summary", { params });
  return res.data;
};

export const getSecurityIncidentsTrend = async (params = {}) => {
  const res = await api.get("/security/incidents-trend", { params });
  return res.data;
};

export const getSecurityHighRiskRooms = async (params = {}) => {
  const res = await api.get("/security/high-risk-rooms", { params });
  return res.data;
};

export const getSecurityAlertTimeline = async (params = {}) => {
  const res = await api.get("/security/alert-timeline", { params });
  return res.data;
};