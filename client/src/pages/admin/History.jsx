import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Loading from "../../components/Loading";

export default function History() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api.get("/admin/history");
        setRows(r.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  if (loading) return <Loading />;


  return (
    <div className="card w-full">

      <h2 className="text-xl font-bold mb-6">
        System History
      </h2>

      <div className="overflow-x-auto">

        <table className="
          w-full text-sm border-collapse
        ">

          {/* HEADER */}
          <thead>
            <tr className="
              bg-gray-200 dark:bg-gray-800
              text-gray-700 dark:text-gray-300
            ">
              <th className="th">Action</th>
              <th className="th">Tool</th>
              <th className="th">Mechanic</th>
              <th className="th">Quantity</th>
              <th className="th">Performed By</th>
              <th className="th">Time</th>
            </tr>
          </thead>


          {/* BODY */}
          <tbody>

            {rows.map((h, i) => (
              <tr
                key={h._id}
                className={`
                  border-b border-gray-200 dark:border-gray-800
                  ${i % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-950"}
                  hover:bg-blue-50 dark:hover:bg-gray-800
                  transition
                `}
              >

                {/* ACTION BADGE */}
                <td className="td">
                  <ActionBadge action={h.action} />
                </td>

                <td className="td">
                  {h.tool?.title || "-"}
                </td>

                <td className="td">
                  {h.mechanic?.name || "-"}
                </td>

                <td className="td">
                  {h.qty ?? "-"}
                </td>

                <td className="td">
                  {h.performedBy?.name || "-"}
                </td>

                <td className="td">
                  {new Date(h.createdAt).toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}



function ActionBadge({ action }) {

  const map = {
    ISSUE: "bg-blue-600",
    RETURN: "bg-green-600",
    CREATE_TOOL: "bg-purple-600",
    CREATE_MECHANIC: "bg-orange-600"
  };

  return (
    <span className={`
      px-2 py-1 text-xs rounded text-white
      ${map[action] || "bg-gray-600"}
    `}>
      {action}
    </span>
  );
}
