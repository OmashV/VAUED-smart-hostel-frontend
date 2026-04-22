export default function Header({ onToggleSidebar }) {
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="top-header">
      <div>
        <h1>Smart Hostel Analytics</h1>
        <p>Decision-grade intelligence for energy, complaints, alerts, and waste patterns.</p>
      </div>

      <div className="header-actions">
        <button className="ui-btn" onClick={onToggleSidebar}>
          Toggle Menu
        </button>
        <button className="ui-btn ui-btn--primary">{currentDate}</button>
      </div>
    </header>
  );
}
