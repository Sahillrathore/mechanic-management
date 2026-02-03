import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { BiLoaderCircle } from "react-icons/bi";

export default function IssueTool() {

    const [tools, setTools] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingbtn, setLoadingbtn] = useState(false);

    const [data, setData] = useState({
        toolId: "",
        mechanicId: "",
        qty: ""
    });

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const t = await api.get("/admin/tools");
                const u = await api.get("/admin/users");
                setTools(t.data);
                setUsers(u.data);
                setLoading(false);
            } catch {
                setLoading(false);
                toast.error("Failed to load data");
            }
        };

        load();
    }, []);

    if (loading) {
        return <Loading />
    }

    // ---------- submit ----------
    const issue = async () => {

        if (!data.toolId)
            return toast.error("Select a tool");

        if (!data.mechanicId)
            return toast.error("Select a mechanic");

        if (!data.qty || Number(data.qty) <= 0)
            return toast.error("Quantity must be greater than 0");

        try {
            setLoadingbtn(true);
            await api.post("/admin/issue", {
                ...data,
                qty: Number(data.qty)
            });

            toast.success("Tool issued successfully");

            setData({
                toolId: "",
                mechanicId: "",
                qty: ""
            });
            setLoadingbtn(false);

        } catch (e) {
            setLoadingbtn(false);
            toast.error(
                e?.response?.data?.msg || "Issue failed"
            );
        }
    };


    return (
        <div className="card w-xl space-y-5">

            <h2 className="text-xl font-bold">
                Issue Tool To Mechanic
            </h2>


            {/* TOOL SELECT */}
            <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                    Select Tool
                </label>

                <select
                    className="input"
                    value={data.toolId}
                    onChange={e =>
                        setData({ ...data, toolId: e.target.value })
                    }
                >
                    <option value="">Choose tool</option>

                    {tools.map(t => (
                        <option key={t._id} value={t._id}>
                            {t.title} — Available: {t.availableQty}
                        </option>
                    ))}
                </select>
            </div>


            <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                    Select Mechanic
                </label>

                <select
                    className="input"
                    value={data.mechanicId}
                    onChange={e =>
                        setData({ ...data, mechanicId: e.target.value })
                    }
                >
                    <option value="">Choose mechanic</option>

                    {users.map(u => (
                        <option key={u._id} value={u._id}>
                            {u.name} — {u.level}
                        </option>
                    ))}
                </select>
            </div>


            <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity To Issue
                </label>

                <input
                    type="number"
                    min={1}
                    className="input"
                    value={data.qty}
                    onChange={e =>
                        setData({ ...data, qty: e.target.value })
                    }
                />
            </div>


            <button className="btn w-full text-center flex justify-center" onClick={issue} disabled={loadingbtn}>
                {loadingbtn ? <BiLoaderCircle size={24} className="animate-spin" /> : 'Issue Tool'}
            </button>

        </div>
    );
}
