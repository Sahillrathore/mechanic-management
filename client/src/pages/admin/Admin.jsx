import { Routes, Route, Link } from "react-router-dom";
import AddMechanic from "./AddMechanic";
import AddTool from "./AddTool";
import IssueTool from "./IssueTool";
import Report from "./admin/Report";

export default function Admin() {
    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <nav className="flex gap-4 mb-6">
                <Link to="mechanic">Add Mechanic</Link>
                <Link to="tool">Add Tool</Link>
                <Link to="issue">Issue Tool</Link>
                <Link to="report">Report</Link>
            </nav>
            <Routes>
                <Route path="mechanic" element={<AddMechanic />} />
                <Route path="tool" element={<AddTool />} />
                <Route path="issue" element={<IssueTool />} />
                <Route path="report" element={<Report />} />
            </Routes>
        </div>
    );
}