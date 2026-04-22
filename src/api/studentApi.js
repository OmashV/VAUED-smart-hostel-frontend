import api from "./axios";

export const getStudentSummary = async (params = {}) => {
  const res = await api.get("/student/summary", { params });
  return res.data;
};

export const getStudentEnergyTrend = async (params = {}) => {
  const res = await api.get("/student/energy-trend", { params });
  return res.data;
};

export const getStudentFloorComparison = async (params = {}) => {
  const res = await api.get("/student/floor-comparison", { params });
  return res.data;
};

export const getStudentWasteAnalysis = async (params = {}) => {
  const res = await api.get("/student/waste-analysis", { params });
  return res.data;
};

export const getStudentAlertsOverview = async (params = {}) => {
  const res = await api.get("/student/alerts-overview", { params });
  return res.data;
};
