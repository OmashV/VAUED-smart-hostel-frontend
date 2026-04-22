import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "12px 16px",
  marginBottom: "8px",
  textDecoration: "none",
  borderRadius: "10px",
  background: isActive ? "#dbeafe" : "transparent",
  color: isActive ? "#0f172a" : "#cbd5e1",
  fontWeight: isActive ? 700 : 500,
});

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        borderRight: "1px solid #1e293b",
        padding: "24px 20px",
        background: "#020617",
      }}
    >
      <h2 style={{ marginTop: 0, color: "#f8fafc" }}>Smart Hostel</h2>
      <nav style={{ marginTop: "24px" }}>
        <NavLink to="/owner" style={linkStyle}>
          Owner
        </NavLink>
        <NavLink to="/warden" style={linkStyle}>
          Warden
        </NavLink>
        <NavLink to="/security" style={linkStyle}>
          Security
        </NavLink>
        <NavLink to="/student" style={linkStyle}>
          Student
        </NavLink>
      </nav>
    </aside>
  );
}
