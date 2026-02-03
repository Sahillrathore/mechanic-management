import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Loading from "../../components/Loading";

export default function ToolInventory() {

    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get("/mechanic/tools").then(r => setTools(r.data));
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="flex-col gap-5">

            <h2 className="mb-6 text-xl font-semibold">Tools Inventory</h2>

            <div className="grid grid-cols-3 gap-6">

                {tools.map(t => (
                    <div key={t._id} className="card space-y-3">

                        <img
                            src={t.image}
                            className="h-40 w-full object-contain rounded"
                        />

                        <div className="text-lg font-semibold capitalize">{t.title}</div>

                        <div className="text-gray-400 capitalize">Category: {t.category}</div>

                        <div className="text-green-400 font-bold">
                            Available: {t.availableQty}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}
