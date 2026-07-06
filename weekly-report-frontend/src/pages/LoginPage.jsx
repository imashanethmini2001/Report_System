import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { saveAuth } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      saveAuth(res.data);

      if (res.data.role === "MANAGER") {
        navigate("/manager/dashboard");
      } else {
        navigate("/member/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="bg-red-100 text-red-600 p-2 mb-3 rounded">{error}</p>}

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
          className="w-full border p-3 rounded mb-4"
          required
        />

        <button className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800">
          Login
        </button>

        <p className="text-center mt-4">
          No account? <Link to="/register" className="text-blue-700">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;