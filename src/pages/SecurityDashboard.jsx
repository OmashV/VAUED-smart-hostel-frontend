import { useEffect, useState } from "react";
import { getFilters } from "../api/analyticsApi";
import {
  getSecuritySummary,
  getSecurityIncidentsTrend,
  getSecurityHighRiskRooms,
  getSecurityAlertTimeline,
} from "../api/securityApi";
import { useDashboardContext } from "../context/DashboardContext";
import FilterBar from "../components/common/FilterBar";
import KPIBox from "../components/common/KPIBox";
import SimpleTable from "../components/common/SimpleTable";
import SecurityIncidentsTrendChart from "../components/charts/SecurityIncidentsTrendChart";
import HighRiskRoomsChart from "../components/charts/HighRiskRoomsChart";
import AlertTimelineChart from "../components/charts/AlertTimelineChart";

export default function SecurityDashboard() {
  const {
    setActiveView,
    filters,
    updateFilter,
    selectedChart,
    setSelectedChart,
  } = useDashboardContext();

  const [filterOptions, setFilterOptions] = useState({});
  const [summary, setSummary] = useState(null);
  const [incidentsTrend, setIncidentsTrend] = useState([]);
  const [highRiskRooms, setHighRiskRooms] = useState([]);
  const [alertTimeline, setAlertTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveView("security_dashboard");
    setSelectedChart("security_incidents_trend");
  }, [setActiveView, setSelectedChart]);

  const handleFilterChange = (key, value) => {
    updateFilter(key, value);
  };

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const data = await getFilters();
        setFilterOptions(data.data);
      } catch (error) {
        console.error("Failed to load security filter options:", error);
      }
    };

    loadFilterOptions();
  }, []);

  useEffect(() => {
    const loadSecurityData = async () => {
      setLoading(true);

      try {
        const [summaryRes, trendRes, riskRes, timelineRes] = await Promise.all([
          getSecuritySummary(filters),
          getSecurityIncidentsTrend(filters),
          getSecurityHighRiskRooms(filters),
          getSecurityAlertTimeline(filters),
        ]);

        setSummary(summaryRes.data);
        setIncidentsTrend(trendRes.data);
        setHighRiskRooms(riskRes.data);
        setAlertTimeline(timelineRes.data);
      } catch (error) {
        console.error("Failed to load security dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSecurityData();
  }, [filters]);

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "32px", lineHeight: 1.2 }}>
          Security Dashboard
        </h2>
        <p style={{ marginTop: "8px", color: "#64748b" }}>
          Monitor incidents, alert patterns, and high-risk rooms across the hostel
        </p>
      </div>

      <FilterBar
        filters={filters}
        filterOptions={filterOptions}
        onChange={handleFilterChange}
      />

      {loading ? (
        <p>Loading security dashboard...</p>
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
            <KPIBox
              title="Security Incidents"
              value={summary?.totalSecurityIncidents ?? 0}
            />
            <KPIBox
              title="Critical Alerts"
              value={summary?.criticalAlerts ?? 0}
            />
            <KPIBox
              title="Warning Alerts"
              value={summary?.warningAlerts ?? 0}
            />
            <KPIBox
              title="Affected Rooms"
              value={summary?.affectedRoomsCount ?? 0}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <div
              style={getCardStyle(selectedChart === "security_incidents_trend")}
              onClick={() => setSelectedChart("security_incidents_trend")}
            >
              <h3 style={cardTitle}>Incidents Trend</h3>
              <SecurityIncidentsTrendChart data={incidentsTrend} />
            </div>

            <div
              style={getCardStyle(selectedChart === "high_risk_rooms")}
              onClick={() => setSelectedChart("high_risk_rooms")}
            >
              <h3 style={cardTitle}>High-Risk Rooms</h3>
              <HighRiskRoomsChart data={highRiskRooms} />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={getCardStyle(selectedChart === "alert_timeline")}
              onClick={() => setSelectedChart("alert_timeline")}
            >
              <h3 style={cardTitle}>Alert Timeline</h3>
              <AlertTimelineChart data={alertTimeline} />
            </div>

            <div
              style={getCardStyle(selectedChart === "high_risk_rooms_table")}
              onClick={() => setSelectedChart("high_risk_rooms_table")}
            >
              <h3 style={cardTitle}>Top High-Risk Rooms</h3>
              <SimpleTable
                columns={[
                  { key: "room_id", label: "Room" },
                  { key: "floor_no", label: "Floor" },
                  { key: "riskScore", label: "Risk Score" },
                  { key: "criticalAlerts", label: "Critical Alerts" },
                ]}
                data={highRiskRooms}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const cardTitle = {
  marginTop: 0,
  marginBottom: "12px",
};

function getCardStyle(isSelected) {
  return {
    border: isSelected ? "2px solid #3b82f6" : "1px solid #dbe2ea",
    borderRadius: "12px",
    padding: "16px",
    background: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: isSelected
      ? "0 0 0 3px rgba(59,130,246,0.12)"
      : "0 1px 3px rgba(15,23,42,0.06)",
  };
}