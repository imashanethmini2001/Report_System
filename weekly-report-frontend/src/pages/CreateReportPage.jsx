import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

const CreateReportPage = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    projectId: "",
    weekStart: "",
    weekEnd: "",
    tasksCompleted: "",
    tasksPlanned: "",
    blockers: "",
    hoursWorked: "",
    notes: "",
  });

  const loadProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createReport = async (submitNow = false) => {
    try {
      const res = await API.post("/reports", {
        ...form,
        projectId: Number(form.projectId),
        hoursWorked: Number(form.hoursWorked),
      });

      if (submitNow) {
        await API.post(`/reports/${res.data.id}/submit`);
        setMessage("Report submitted successfully.");
      } else {
        setMessage("Report saved as draft.");
      }

      setForm({
        projectId: "",
        weekStart: "",
        weekEnd: "",
        tasksCompleted: "",
        tasksPlanned: "",
        blockers: "",
        hoursWorked: "",
        notes: "",
      });
    } catch (err) {
      setMessage("Failed to save report.");
    }
  };

  const handleDraft = (e) => {
    e.preventDefault();
    createReport(false);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    createReport(true);
  };

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar role="TEAM_MEMBER" />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Create Weekly Report</h1>

          {message && (
            <p className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</p>
          )}

          <form className="bg-white p-6 rounded-xl shadow max-w-3xl">
            <label>Project / Category</label>
            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Week Start</label>
                <input
                  name="weekStart"
                  type="date"
                  value={form.weekStart}
                  onChange={handleChange}
                  className="w-full border p-3 rounded mb-4"
                  required
                />
              </div>

              <div>
                <label>Week End</label>
                <input
                  name="weekEnd"
                  type="date"
                  value={form.weekEnd}
                  onChange={handleChange}
                  className="w-full border p-3 rounded mb-4"
                  required
                />
              </div>
            </div>

            <label>Tasks Completed</label>
            <textarea
              name="tasksCompleted"
              value={form.tasksCompleted}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
              rows="3"
              required
            />

            <label>Tasks Planned for Next Week</label>
            <textarea
              name="tasksPlanned"
              value={form.tasksPlanned}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
              rows="3"
              required
            />

            <label>Blockers / Challenges</label>
            <textarea
              name="blockers"
              value={form.blockers}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
              rows="2"
            />

            <label>Hours Worked</label>
            <input
              name="hoursWorked"
              type="number"
              value={form.hoursWorked}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <label>Notes / Links</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
              rows="2"
            />

            <div className="flex gap-3">
              <button
                onClick={handleDraft}
                className="bg-yellow-500 text-white px-5 py-3 rounded hover:bg-yellow-600"
              >
                Save as Draft
              </button>

              <button
                onClick={handleSubmitReport}
                className="bg-blue-700 text-white px-5 py-3 rounded hover:bg-blue-800"
              >
                Submit Report
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateReportPage;