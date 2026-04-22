import { useEffect, useState } from "react";
import { getFilters } from "../api/analyticsApi";
import {
  getOwnerSummary,
  getOwnerEnergyTrend,
  getOwnerFloorComparison,
  getOwnerWasteAnalysis,
  getOwnerAlertsOverview,
} from "../api/ownerApi";
import { useDashboardContext } from "../context/DashboardContext";
import FilterBar from "../components/common/FilterBar";
import KPIBox from "../components/common/KPIBox";
import EnergyTrendChart from "../components/charts/EnergyTrendChart";
import FloorComparisonChart from "../components/charts/FloorComparisonChart";
import WasteBreakdownChart from "../components/charts/WasteBreakdownChart";
import AlertsOverviewChart from "../components/charts/AlertsOverviewChart";
import SimpleTable from "../components/common/SimpleTable";

export default function OwnerDashboard() {
  const { setActiveView, filters, updateFilter, selectedChart, setSelectedChart } =
    useDashboardContext();

  const [filterOptions, setFilterOptions] = useState({});
  const [summary, setSummary] = useState(null);
  const [energyTrend, setEnergyTrend] = useState([]);
  const [floorComparison, setFloorComparison] = useState([]);
  const [wasteAnalysis, setWasteAnalysis] = useState({ summary: [], topWasteRooms: [] });
  const [alertsOverview, setAlertsOverview] = useState({
    priorityBreakdown: [],
    recentCriticalRooms: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveView("owner_dashboard");
    if (!selectedChart) {
      setSelectedChart("energy_trend");
    }
  }, [setActiveView, setSelectedChart, selectedChart]);

  const handleFilterChange = (key, value) => {
    updateFilter(key, value);
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
    <section className="owner-dashboard">
      <div className="owner-intro">
        <h2>Owner Intelligence Board</h2>
        <p>
          Strategic command view across energy usage, alerts, complaints, and waste-risk behavior.
        </p>
      </div>

      <FilterBar filters={filters} filterOptions={filterOptions} onChange={handleFilterChange} />

      {loading ? (
        <div className="panel-card">Loading owner dashboard...</div>
      ) : (
        <>
          <div className="kpi-grid">
            <KPIBox title="Total Energy Usage" value={summary?.totalEnergyUsage ?? 0} />
            <KPIBox title="Total Complaints" value={summary?.totalComplaints ?? 0} />
            <KPIBox title="Critical Alerts" value={summary?.criticalAlerts ?? 0} />
            <KPIBox title="High Waste Records" value={summary?.highWasteRecords ?? 0} />
          </div>

          <div className="owner-grid-2">
            <div
              className={`panel-card ${selectedChart === "energy_trend" ? "is-selected" : ""}`.trim()}
              onClick={() => setSelectedChart("energy_trend")}
            >
              <h3>Energy Trend</h3>
              <EnergyTrendChart data={energyTrend} />
            </div>

            <div
              className={`panel-card ${selectedChart === "floor_comparison" ? "is-selected" : ""}`.trim()}
              onClick={() => setSelectedChart("floor_comparison")}
            >
              <h3>Floor Comparison</h3>
              <FloorComparisonChart data={floorComparison} />
            </div>
          </div>

          <div className="owner-grid-even">
            <div
              className={`panel-card ${selectedChart === "waste_breakdown" ? "is-selected" : ""}`.trim()}
              onClick={() => setSelectedChart("waste_breakdown")}
            >
              <h3>Waste Breakdown</h3>
              <WasteBreakdownChart data={wasteAnalysis.summary || []} />
            </div>

            <div
              className={`panel-card ${selectedChart === "alerts_overview" ? "is-selected" : ""}`.trim()}
              onClick={() => setSelectedChart("alerts_overview")}
            >
              <h3>Alert Priority Overview</h3>
              <AlertsOverviewChart data={alertsOverview.priorityBreakdown || []} />
            </div>
          </div>

          <div className="owner-grid-even">
            <div
              className={`panel-card ${selectedChart === "top_waste_rooms" ? "is-selected" : ""}`.trim()}
              onClick={() => setSelectedChart("top_waste_rooms")}
            >
              <h3>Top Waste Rooms</h3>
              <SimpleTable
                columns={[
                  { key: "room_id", label: "Room" },
                  { key: "totalEnergyUsage", label: "Energy" },
                  { key: "highWasteRecords", label: "High Waste" },
                ]}
                data={wasteAnalysis.topWasteRooms || []}
              />
            </div>

            <div
              className={`panel-card ${selectedChart === "critical_rooms" ? "is-selected" : ""}`.trim()}
              onClick={() => setSelectedChart("critical_rooms")}
            >
              <h3>Recent Critical Rooms</h3>
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
        </>
      )}
    </section>
  );
}
