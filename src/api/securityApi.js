import api from "./axios";

export const getSecuritySummary = async (params = {}) => {
  const res = await api.get("/security/summary", { params });
  return res.data;
};

export const getSecurityEnergyTrend = async (params = {}) => {
  const res = await api.get("/security/energy-trend", { params });
  return res.data;
};

export const getSecurityFloorComparison = async (params = {}) => {
  const res = await api.get("/security/floor-comparison", { params });
  return res.data;
};

export const getSecurityWasteAnalysis = async (params = {}) => {
  const res = await api.get("/security/waste-analysis", { params });
  return res.data;
};

export const getSecurityAlertsOverview = async (params = {}) => {
  const res = await api.get("/security/alerts-overview", { params });
  return res.data;
};
