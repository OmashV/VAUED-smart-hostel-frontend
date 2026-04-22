import { useEffect, useState } from "react";
import { getFilters } from "../api/analyticsApi";
import {
  getOwnerSummary,
  getOwnerEnergyTrend,
  getOwnerFloorComparison,
} from "../api/ownerApi";
import FilterBar from "../components/common/FilterBar";
import KPIBox from "../components/common/KPIBox";
import EnergyTrendChart from "../components/charts/EnergyTrendChart";
import FloorComparisonChart from "../components/charts/FloorComparisonChart";

export default function OwnerDashboard() {
  const [filterOptions, setFilterOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [summary, setSummary] = useState(null);
  const [energyTrend, setEnergyTrend] = useState([]);
  const [floorComparison, setFloorComparison] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const data = await getFilters();
        setFilterOptions(data.data);
      } catch (error) {
        console.error("Failed to load filter options:", error);
      }
    };

    loadFilterOptions();
  }, []);

  useEffect(() => {
    const loadOwnerData = async () => {
      setLoading(true);
      try {
        const [summaryRes, trendRes, comparisonRes] = await Promise.all([
          getOwnerSummary(filters),
          getOwnerEnergyTrend(filters),
          getOwnerFloorComparison(filters),
        ]);

        setSummary(summaryRes.data);
        setEnergyTrend(trendRes.data);
        setFloorComparison(comparisonRes.data);
      } catch (error) {
        console.error("Failed to load owner dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOwnerData();
  }, [filters]);

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "32px", lineHeight: 1.2 }}>
          Owner Dashboard
        </h2>
        <p style={{ marginTop: "8px", color: "#94a3b8" }}>
          Strategic overview of energy usage, complaints, alerts, and waste risk
        </p>
      </div>

      <FilterBar
        filters={filters}
        filterOptions={filterOptions}
        onChange={handleFilterChange}
      />

      {loading ? (
        <p>Loading owner dashboard...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <KPIBox title="Total Energy Usage" value={summary?.totalEnergyUsage ?? 0} />
            <KPIBox title="Total Complaints" value={summary?.totalComplaints ?? 0} />
            <KPIBox title="Critical Alerts" value={summary?.criticalAlerts ?? 0} />
            <KPIBox title="High Waste Records" value={summary?.highWasteRecords ?? 0} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "16px",
                background: "#0f172a",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Energy Trend</h3>
              <EnergyTrendChart data={energyTrend} />
            </div>

            <div
              style={{
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "16px",
                background: "#0f172a",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Floor Comparison</h3>
              <FloorComparisonChart data={floorComparison} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
