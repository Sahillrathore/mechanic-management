import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

export default function MyIssues() {

  const [issues, setIssues] = useState([]);
  const [returnQty, setReturnQty] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState({});


  // ---------- load ----------
  const load = async () => {
    try {
      setLoading(true);
      const r = await api.get("/mechanic/issues");
      setIssues(r.data);
    } catch {
      toast.error("Failed to load issued tools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);


  // ---------- return ----------
  const returnTool = async (id) => {

    const qty = Number(returnQty[id] || 0);

    if (!qty || qty <= 0)
      return toast.error("Enter valid return quantity");

    try {
      setSubmitting(s => ({ ...s, [id]: true }));

      await api.post("/mechanic/return", {
        issueId: id,
        qty
      });

      toast.success("Tool returned successfully");

      setReturnQty(q => ({ ...q, [id]: "" }));
      load();

    } catch (e) {
      toast.error(
        e?.response?.data?.msg || "Return failed"
      );
    } finally {
      setSubmitting(s => ({ ...s, [id]: false }));
    }
  };


  if (loading)
    return <div className="text-center py-10">Loading...</div>;


  return (
    <div className="space-y-5">

      {issues.map(i => (

        <div
          key={i._id}
          className="
            card
            grid
            gap-4
            items-center

            grid-cols-1
            md:grid-cols-4
            xl:grid-cols-6
          "
        >

          {/* IMAGE */}
          <div className="flex justify-center md:justify-start">
            <img
              src={i.tool?.image}
              className="h-24 w-32 object-contain rounded"
            />
          </div>


          {/* TOOL INFO */}
          <div className="space-y-1 text-center md:text-left">
            <div className="font-semibold text-lg">
              {i.tool?.title}
            </div>

            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {i.tool?.category}
            </div>
          </div>


          {/* COUNTS */}
          <div className="text-sm text-center md:text-left">
            <div>Issued: <b>{i.qtyIssued}</b></div>
            <div>Returned: <b>{i.qtyReturned}</b></div>
          </div>


          {/* STATUS */}
          <div className="text-center md:text-left">
            <StatusBadge status={i.status} />
          </div>


          {/* RETURN ACTION */}
          {i.status !== "returned" && (
            <div className="
              flex flex-col sm:flex-row
              gap-2
              items-center
              justify-center md:justify-start
            ">

              <input
                className="input w-28"
                type="number"
                placeholder="Qty"
                value={returnQty[i._id] || ""}
                onChange={e =>
                  setReturnQty({
                    ...returnQty,
                    [i._id]: e.target.value
                  })
                }
              />

              <button
                className="btn w-full sm:w-auto"
                disabled={submitting[i._id]}
                onClick={() => returnTool(i._id)}
              >
                {submitting[i._id] ? "Returning..." : "Return"}
              </button>

            </div>
          )}

        </div>

      ))}

    </div>
  );
}



function StatusBadge({ status }) {

  const map = {
    issued: "bg-blue-600",
    partial: "bg-yellow-500",
    returned: "bg-green-600"
  };

  return (
    <span className={`
      px-3 py-1 rounded text-white text-sm
      ${map[status] || "bg-gray-600"}
    `}>
      {status}
    </span>
  );
}
