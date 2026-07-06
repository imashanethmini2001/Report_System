import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { saveAuth } from "../utils/auth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "TEAM_MEMBER",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);
      saveAuth(res.data);

      if (res.data.role === "MANAGER") {
        navigate("/manager/dashboard");
      } else {
        navigate("/member/dashboard");
      }
    } catch (err) {
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {error && <p className="bg-red-100 text-red-600 p-2 mb-3 rounded">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="TEAM_MEMBER">Team Member</option>
          <option value="MANAGER">Manager</option>
        </select>

        <button className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800">
          Register
        </button>

        <p className="text-center mt-4">
          Already have account? <Link to="/login" className="text-blue-700">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;