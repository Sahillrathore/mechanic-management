import { Link, Outlet } from "react-router-dom";
import LogoutBtn from "../../components/LogoutBtn";

export default function MechanicLayout() {
    return (
        <div className="flex min-h-screen bg-gray-950 text-white">

            <aside className="w-64 bg-gray-900 p-6 space-y-4 border-r border-gray-800">
                <h2 className="text-xl font-bold">Mechanic Panel</h2>

                <nav className="flex flex-col gap-3">
                    <Link to="tools">Available Tools</Link>
                    <Link to="my-tools">My Issued Tools</Link>
                </nav>

                <LogoutBtn />
            </aside>

            <main className="flex-1 p-8">
                <Outlet />
            </main>

        </div>
    );
}
