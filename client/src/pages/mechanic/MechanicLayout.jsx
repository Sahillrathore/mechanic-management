import { Link, Outlet } from "react-router-dom";
import LogoutBtn from "../../components/LogoutBtn";
import ThemeToggle from "../../utils/themeToggle";

import {
    FiTool,
    FiClipboard,
    FiUser
} from "react-icons/fi";
import { useEffect, useState } from "react";


export default function MechanicLayout() {

    const [user, setUser] = useState("");

    useEffect(() => {
        const r = localStorage.getItem("role");
        setUser(r)
    })

    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

            <aside className="
                w-64 p-6 space-y-6 border-r
                bg-gray-100 dark:bg-gray-900
                border-gray-200 dark:border-gray-800"
            >

                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                        <FiUser size={18} />
                    </div>

                    <h2 className="text-xl font-bold">
                        Mechanic Panel
                    </h2>
                </div>


                <nav className="flex flex-col gap-2 text-sm">

                    <SidebarLink to="tools" icon={<FiTool />}>
                        Available Tools
                    </SidebarLink>

                    <SidebarLink to="my-tools" icon={<FiClipboard />}>
                        My Issued Tools
                    </SidebarLink>

                </nav>


                <div className="pt-4 border-t border-gray-300 dark:border-gray-700 space-y-3">
                    {/* <ThemeToggle /> */}
                    <LogoutBtn />
                </div>

                <p>{user.name}</p>

            </aside>


            <main className="flex-1 p-8">
                <Outlet />
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
