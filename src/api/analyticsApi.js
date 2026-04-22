import api from "./axios";

export const getFilters = async () => {
  const res = await api.get("/analytics/filters");
  return res.data;
};

export const getRooms = async () => {
  const res = await api.get("/analytics/rooms");
  return res.data;
};

export const getFloors = async () => {
  const res = await api.get("/analytics/floors");
  return res.data;
};

export const getDateRange = async () => {
  const res = await api.get("/analytics/date-range");
  return res.data;
};
