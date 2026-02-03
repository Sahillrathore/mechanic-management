import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import MechanicLayout from "./pages/mechanic/MechanicLayout";
import Notfound from "./pages/Notfound";
import ToolInventory from "./pages/mechanic/ToolInventory";
import MyIssues from "./pages/mechanic/MyIssue";

function RequireAuth({ role, children }) {
  const r = localStorage.getItem("role");
  if (!r) return <Navigate to="/" />;
  if (role && r !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin/*"
        element={
          <RequireAuth role="admin">
            <AdminLayout />
          </RequireAuth>
        }
      />

      <Route
        path="/mechanic"
        element={
          <RequireAuth role="mechanic">
            <MechanicLayout />
          </RequireAuth>
        }
      >
        <Route path="tools" element={<ToolInventory />} />
        <Route path="my-tools" element={<MyIssues />} />
      </Route>

      <Route path="*" element={<Notfound />} />

    </Routes>
  );
}
