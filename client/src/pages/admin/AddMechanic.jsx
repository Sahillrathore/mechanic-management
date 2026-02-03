import { useState } from "react";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

export default function AddMechanic() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    level: "Expert"
  });

  const [file, setFile] = useState(null);
  const [passValid, setPassValid] = useState(true);


  const handlePassword = (val) => {
    setForm({ ...form, password: val });
    setPassValid(passRegex.test(val));
  };


  const submit = async () => {

    if (!form.name || !form.email || !form.mobile || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (!file) {
      toast.error("Profile picture is required");
      return;
    }

    if (!passRegex.test(form.password)) {
      toast.error("Password is too weak");
      return;
    }

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k,v));
      fd.append("picture", file);

      await api.post("/admin/mechanic", fd);

      toast.success("Mechanic created successfully");

      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
        level: "Expert"
      });
      setFile(null);

    } catch (e) {
      toast.error(
        e?.response?.data?.msg || "Failed to create mechanic"
      );
    }
  };


  return (
    <div className="card max-w-xl space-y-5">

      <h2 className="text-xl font-bold">Create Mechanic</h2>


      <div>
        <label className="text-sm text-gray-400">Name</label>
        <input
          className="input"
          value={form.name}
          onChange={e=>setForm({...form,name:e.target.value})}
        />
      </div>


      <div>
        <label className="text-sm text-gray-400">Email</label>
        <input
          className="input"
          type="email"
          value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})}
        />
      </div>


      <div>
        <label className="text-sm text-gray-400">Mobile (10 digits)</label>
        <input
          className="input"
          maxLength={10}
          value={form.mobile}
          onChange={e=>setForm({...form,mobile:e.target.value})}
        />
      </div>


      <div>
        <label className="text-sm text-gray-400">Password</label>
        <input
          className={`input ${!passValid ? "border-red-500" : ""}`}
          type="password"
          value={form.password}
          onChange={e=>handlePassword(e.target.value)}
        />

        {!passValid && (
          <p className="text-red-400 text-sm mt-1">
            Must be 8+ chars, include letter, number, special character
          </p>
        )}
      </div>


      <div>
        <label className="text-sm text-gray-400">Mechanic Level</label>
        <select
          className="input"
          value={form.level}
          onChange={e=>setForm({...form,level:e.target.value})}
        >
          <option>Expert</option>
          <option>Medium</option>
          <option>New Recruit</option>
          <option>Trainee</option>
        </select>
      </div>


      <div className="flex flex-col">
        <label className="text-sm text-gray-400">
          Profile Picture (Required)
        </label>

        <input
          type="file"
          onChange={e=>setFile(e.target.files[0])}
        />
      </div>


      <button className="btn w-full" onClick={submit}>
        Create Mechanic
      </button>

    </div>
  );
}
