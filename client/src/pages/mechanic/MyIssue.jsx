import { useEffect, useState } from "react";
import { api } from "../../utils/api";

export default function MyIssues() {

    const [issues, setIssues] = useState([]);
    const [returnQty, setReturnQty] = useState({});

    const load = () =>
        api.get("/mechanic/issues").then(r => setIssues(r.data));

    useEffect(() => {
        load();
    }, []);

    const returnTool = async (id) => {
        await api.post("/mechanic/return", {
            issueId: id,
            qty: Number(returnQty[id] || 0)
        });
        load();
    };

    return (
        <div className="space-y-6">

            {issues.map(i => (

                <div key={i._id} className="card grid grid-cols-5 gap-4 items-center">

                    <img src={i.tool?.image}
                        className="h-24 w-full object-contain rounded" />

                    <div>
                        <div className="font-bold">{i.tool?.title}</div>
                        <div className="text-gray-400">{i.tool?.category}</div>
                    </div>

                    <div>
                        Issued: {i.qtyIssued}
                        <br />
                        Returned: {i.qtyReturned}
                    </div>

                    <div>
                        Status:
                        <span className="ml-2 px-2 py-1 bg-blue-700 rounded">
                            {i.status}
                        </span>
                    </div>

                    {i.status !== "returned" && (
                        <div className="flex gap-2">

                            <input
                                className="input w-24"
                                type="number"
                                placeholder="Qty"
                                onChange={e =>
                                    setReturnQty({
                                        ...returnQty,
                                        [i._id]: e.target.value
                                    })
                                }
                            />

                            <button
                                className="btn"
                                onClick={() => returnTool(i._id)}
                            >
                                Return
                            </button>

                        </div>
                    )}

                </div>

            ))}

        </div>
    );
}
