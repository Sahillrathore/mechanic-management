import { Routes, Route, Link } from "react-router-dom";
import LogoutBtn from "../../components/LogoutBtn";

import AddMechanic from "./AddMechanic";
import AddTool from "./AddTool";
import IssueTool from "./IssueTool";
import Report from "./Report";
import History from "./History";

import ThemeToggle from "../../utils/themeToggle";

import {
  FiUsers,
  FiTool,
  FiSend,
  FiBarChart2,
  FiClock,
  FiShield
} from "react-icons/fi";


export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      <aside className="w-64 p-6 space-y-6 border-r
        bg-gray-100 dark:bg-gray-900
        border-gray-200 dark:border-gray-800">

        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            className="w-9 h-9 border-2 border-blue-400 rounded-full"
            alt=""
          />
          <Link to="/admin" className="text-xl font-bold flex items-center gap-2">
            {/* <FiShield /> */}
            Admin Panel
          </Link>
        </div>


        <nav className="flex flex-col gap-2 text-sm">

          <SidebarLink to="/admin/mechanics" icon={<FiUsers />}>
            Add Mechanic
          </SidebarLink>

          <SidebarLink to="/admin/tools" icon={<FiTool />}>
            Add Tool
          </SidebarLink>

          <SidebarLink to="/admin/issue" icon={<FiSend />}>
            Issue Tool
          </SidebarLink>

          <SidebarLink to="/admin/report" icon={<FiBarChart2 />}>
            Issued Report
          </SidebarLink>

          <SidebarLink to="/admin/history" icon={<FiClock />}>
            History
          </SidebarLink>

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700 space-y-3">
            <LogoutBtn />
          </div>

        </nav>

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



function SidebarLink({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="
        flex items-center gap-3 px-3 py-2 rounded-lg
        hover:bg-blue-100 dark:hover:bg-gray-800
        transition
      "
    >
      <span className="text-lg">{icon}</span>
      {children}
    </Link>
  );
}
