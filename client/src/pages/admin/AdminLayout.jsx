import { Routes, Route, Link } from "react-router-dom";
import LogoutBtn from "../../components/LogoutBtn";
import AddMechanic from "./AddMechanic";
import AddTool from "./AddTool";
import IssueTool from "./IssueTool";
import Report from "./Report";
import History from "./History";
import ThemeToggle from "../../utils/themeToggle";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      <aside className="w-64 bg-gray-900 p-6 space-y-4 border-r border-gray-800">
        <div className="flex gap-2 items-start justify-start mb-6">
          <img src="/logo.png" className="w-8 border-2 border-blue-200 rounded-full" alt="" />
          <Link to="/admin" className="text-xl font-bold mb-0 inline-block">Admin Panel</Link>
        </div>

        <nav className="flex flex-col gap-3">
          <Link to="/admin/mechanics">Add Mechanic</Link>
          <Link to="/admin/tools">Add Tool</Link>
          <Link to="/admin/issue">Issue Tool</Link>
          <Link to="/admin/report">Issued Report</Link>
          <Link to="/admin/history">History</Link>
        </nav>

        <LogoutBtn />

        
      </aside>

      <main className="flex-1 p-8">
        <Routes>
          <Route path="/mechanics" element={<AddMechanic />} />
          <Route path="/tools" element={<AddTool />} />
          <Route path="/issue" element={<IssueTool />} />
          <Route path="/report" element={<Report />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>

    </div>
  );
}
