import api from "./axios";

export const getWardenSummary = async (params = {}) => {
  const res = await api.get("/warden/summary", { params });
  return res.data;
};

export const getWardenEnergyTrend = async (params = {}) => {
  const res = await api.get("/warden/energy-trend", { params });
  return res.data;
};

export const getWardenFloorComparison = async (params = {}) => {
  const res = await api.get("/warden/floor-comparison", { params });
  return res.data;
};

export const getWardenWasteAnalysis = async (params = {}) => {
  const res = await api.get("/warden/waste-analysis", { params });
  return res.data;
};

export const getWardenAlertsOverview = async (params = {}) => {
  const res = await api.get("/warden/alerts-overview", { params });
  return res.data;
};
