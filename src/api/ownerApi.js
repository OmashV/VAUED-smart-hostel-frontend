import api from "./axios";

export const getOwnerSummary = async (params = {}) => {
  const res = await api.get("/owner/summary", { params });
  return res.data;
};

export const getOwnerEnergyTrend = async (params = {}) => {
  const res = await api.get("/owner/energy-trend", { params });
  return res.data;
};

export const getOwnerFloorComparison = async (params = {}) => {
  const res = await api.get("/owner/floor-comparison", { params });
  return res.data;
};

export const getOwnerWasteAnalysis = async (params = {}) => {
  const res = await api.get("/owner/waste-analysis", { params });
  return res.data;
};

export const getOwnerAlertsOverview = async (params = {}) => {
  const res = await api.get("/owner/alerts-overview", { params });
  return res.data;
};
