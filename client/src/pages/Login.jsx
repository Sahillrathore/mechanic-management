import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const submit = async () => {
        try {
            const { data } = await api.post("/auth/login", form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            nav(data.role === "admin" ? "/admin/mechanics" : "/mechanic/tools");
        } catch (e) {
            setErr("Invalid credentials");
        }
    };

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (role === "admin") {
            nav("/admin");
        } else if (role === "mechanic") {
            nav("/mechanic/tools");
        }
    }, []);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="card w-96 space-y-4">
                <h2 className="text-xl font-bold text-white">Login</h2>

                <input
                    className="input"
                    placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                {err && <p className="text-red-400">{err}</p>}

                <button onClick={submit} className="btn w-full">
                    Login
                </button>
            </div>
        </div>
    );
}
