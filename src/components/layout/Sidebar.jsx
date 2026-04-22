import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/owner", label: "Owner", token: "OW" },
  { to: "/warden", label: "Warden", token: "WD" },
  { to: "/security", label: "Security", token: "SC" },
  { to: "/student", label: "Student", token: "ST" },
];

export default function Sidebar({ isOpen, onToggle }) {
  return (
    <aside className={`sidebar ${isOpen ? "" : "sidebar--collapsed"}`.trim()}>
      <div className="sidebar-top">
        {isOpen ? <h2 className="sidebar-brand">Smart Hostel</h2> : <span className="sidebar-brand">SH</span>}
        <button className="sidebar-toggle" onClick={onToggle}>
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {isOpen && <div className="sidebar-badge">Live command center for hostel operations and risk monitoring.</div>}

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `side-link ${isActive ? "is-active" : ""}`.trim()}
          >
            <span className="side-link-token">{isOpen ? item.token : item.label.charAt(0)}</span>
            {isOpen && item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
