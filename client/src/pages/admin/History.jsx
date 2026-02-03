import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Loading from "../../components/Loading";

export default function History() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            api.get("/admin/history").then(r => setRows(r.data));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }, []);

    if(loading) {
        return <Loading/>
    }

    return (
        <div className="card">
            <h2 className="text-lg font-bold mb-4">System History</h2>

            {rows.map(h => (
                <div key={h._id} className="border-b border-gray-800 py-2">
                    {h.action} — {h.tool?.title} — qty:{h.qty}
                </div>
            ))}
        </div>
    );
}
