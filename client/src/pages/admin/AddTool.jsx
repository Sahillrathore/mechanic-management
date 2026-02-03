import { useState } from "react";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";

export default function AddTool() {

  const [form, setForm] = useState({
    title: "",
    category: "",
    customCategory: "",
    availableQty: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const submit = async () => {

    const finalCategory =
      form.category === "Other"
        ? form.customCategory.trim()
        : form.category;

    if (!form.title.trim())
      return toast.error("Tool title required");

    if (!finalCategory)
      return toast.error("Category required");

    if (!form.availableQty || Number(form.availableQty) <= 0)
      return toast.error("Quantity must be greater than 0");

    if (!file)
      return toast.error("Tool image is required");

    try {
      setLoading(true);
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("category", finalCategory);
      fd.append("availableQty", form.availableQty);
      fd.append("image", file);

      await api.post("/admin/tool", fd);

      toast.success("Tool added successfully");

      setForm({
        title: "",
        category: "",
        customCategory: "",
        availableQty: ""
      });
      setFile(null);
      setLoading(false);

    } catch (e) {
      setLoading(false);
      toast.error(
        e?.response?.data?.msg || "Failed to add tool"
      );
    }
  };


  return (
    <div className="card max-w-xl space-y-5">

      <h2 className="text-xl font-bold">Add Tool</h2>


      {/* TITLE */}
      <div>
        <label className="text-sm text-gray-400">
          Tool Title
        </label>

        <input
          className="input"
          value={form.title}
          onChange={e =>
            setForm({ ...form, title: e.target.value })
          }
        />
      </div>


      {/* CATEGORY */}
      <div>
        <label className="text-sm text-gray-400">
          Category
        </label>

        <select
          className="input"
          value={form.category}
          onChange={e =>
            setForm({
              ...form,
              category: e.target.value,
              customCategory: ""
            })
          }
        >
          <option value="">Select category</option>
          <option>Screw Driver</option>
          <option>Wrench</option>
          <option>Plier</option>
          <option>Hammer</option>
          <option>Drill</option>
          <option>Other</option>
        </select>
      </div>


      {/* CUSTOM CATEGORY — conditional */}
      {form.category === "Other" && (
        <div>
          <label className="text-sm text-gray-400">
            Custom Category
          </label>

          <input
            className="input"
            placeholder="Enter custom category"
            value={form.customCategory}
            onChange={e =>
              setForm({
                ...form,
                customCategory: e.target.value
              })
            }
          />
        </div>
      )}


      {/* QUANTITY */}
      <div>
        <label className="text-sm text-gray-400">
          Available Quantity
        </label>

        <input
          type="number"
          min={1}
          className="input"
          value={form.availableQty}
          onChange={e =>
            setForm({ ...form, availableQty: e.target.value })
          }
        />
      </div>


      {/* IMAGE */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-400">
          Tool Image (Required)
        </label>

        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />
      </div>


      <button className="btn w-full text-center flex justify-center" onClick={submit} disabled={loading}>
        {loading ? <BiLoaderCircle size={24} className="animate-spin" /> : 'Add Tool'}
      </button>

    </div>
  );
}
