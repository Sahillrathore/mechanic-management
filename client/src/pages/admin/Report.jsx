import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Loading from "../../components/Loading";

export default function Report() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            setLoading(true)
            api.get("/admin/report").then(r => setRows(r.data));
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
            <h2 className="text-lg font-bold mb-4">Issued Report</h2>

            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-400">
                        <th>Mechanic</th>
                        <th>Tool</th>
                        <th>Issued</th>
                        <th>Returned</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map(r => (
                        <tr key={r._id} className="border-t border-gray-800 hover:bg-gray-900">
                            <td>{r.mechanic?.name}</td>
                            <td>{r.tool?.title}</td>
                            <td>{r.qtyIssued}</td>
                            <td>{r.qtyReturned}</td>
                            <td>{r.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
