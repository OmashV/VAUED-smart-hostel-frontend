import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617", color: "#f8fafc" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
