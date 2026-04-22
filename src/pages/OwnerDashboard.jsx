import { useEffect, useState } from "react";
import { getFilters } from "../api/analyticsApi";
import {
  getOwnerSummary,
  getOwnerEnergyTrend,
  getOwnerFloorComparison,
  getOwnerWasteAnalysis,
  getOwnerAlertsOverview,
} from "../api/ownerApi";
import FilterBar from "../components/common/FilterBar";
import KPIBox from "../components/common/KPIBox";
import EnergyTrendChart from "../components/charts/EnergyTrendChart";
import FloorComparisonChart from "../components/charts/FloorComparisonChart";
import WasteBreakdownChart from "../components/charts/WasteBreakdownChart";
import AlertsOverviewChart from "../components/charts/AlertsOverviewChart";
import SimpleTable from "../components/common/SimpleTable";
import ChatbotPanel from "../components/chatbot/ChatbotPanel";

export default function OwnerDashboard() {
  const [filterOptions, setFilterOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [summary, setSummary] = useState(null);
  const [energyTrend, setEnergyTrend] = useState([]);
  const [floorComparison, setFloorComparison] = useState([]);
  const [wasteAnalysis, setWasteAnalysis] = useState({ summary: [], topWasteRooms: [] });
  const [alertsOverview, setAlertsOverview] = useState({ priorityBreakdown: [], recentCriticalRooms: [] });
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
        const [summaryRes, trendRes, comparisonRes, wasteRes, alertsRes] = await Promise.all([
          getOwnerSummary(filters),
          getOwnerEnergyTrend(filters),
          getOwnerFloorComparison(filters),
          getOwnerWasteAnalysis(filters),
          getOwnerAlertsOverview(filters),
        ]);

        setSummary(summaryRes.data);
        setEnergyTrend(trendRes.data);
        setFloorComparison(comparisonRes.data);
        setWasteAnalysis(wasteRes.data);
        setAlertsOverview(alertsRes.data);
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
              marginBottom: "24px",
            }}
          >
            <div style={cardStyle}>
              <h3 style={cardTitle}>Energy Trend</h3>
              <EnergyTrendChart data={energyTrend} />
            </div>

            <div style={cardStyle}>
              <h3 style={cardTitle}>Floor Comparison</h3>
              <FloorComparisonChart data={floorComparison} />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.2fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <div style={cardStyle}>
              <h3 style={cardTitle}>Waste Breakdown</h3>
              <WasteBreakdownChart data={wasteAnalysis.summary || []} />
            </div>

            <div style={cardStyle}>
              <h3 style={cardTitle}>Alert Priority Overview</h3>
              <AlertsOverviewChart data={alertsOverview.priorityBreakdown || []} />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3 style={cardTitle}>Top Waste Rooms</h3>
              <SimpleTable
                columns={[
                  { key: "room_id", label: "Room" },
                  { key: "totalEnergyUsage", label: "Energy" },
                  { key: "highWasteRecords", label: "High Waste" },
                ]}
                data={wasteAnalysis.topWasteRooms || []}
              />
            </div>

            <div style={cardStyle}>
              <h3 style={cardTitle}>Recent Critical Rooms</h3>
              <SimpleTable
                columns={[
                  { key: "room_id", label: "Room" },
                  { key: "criticalCount", label: "Critical Count" },
                  { key: "latestDate", label: "Latest Date" },
                ]}
                data={(alertsOverview.recentCriticalRooms || []).map((item) => ({
                  ...item,
                  latestDate: new Date(item.latestDate).toLocaleDateString(),
                }))}
              />
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <ChatbotPanel filters={filters} activeView="owner_dashboard" />
          </div>
        </>
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #334155",
  borderRadius: "12px",
  padding: "16px",
  background: "#0f172a",
};

const cardTitle = {
  marginTop: 0,
  marginBottom: "12px",
};
