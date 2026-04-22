import { createContext, useContext, useMemo, useState } from "react";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [activeView, setActiveView] = useState("owner_dashboard");
  const [filters, setFilters] = useState({});
  const [selectedChart, setSelectedChart] = useState("overview");

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const replaceFilters = (nextFilters = {}) => {
    setFilters(nextFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const value = useMemo(
    () => ({
      activeView,
      setActiveView,
      filters,
      setFilters,
      updateFilter,
      replaceFilters,
      clearFilters,
      selectedChart,
      setSelectedChart,
    }),
    [activeView, filters, selectedChart]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboardContext must be used inside DashboardProvider");
  }

  return context;
}
