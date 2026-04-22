import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FloatingChatbot from "../chatbot/FloatingChatbot";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />

      <main className="app-main">
        <div className="app-content">
          <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
          <Outlet />
        </div>
      </main>

      <FloatingChatbot />
    </div>
  );
}
