import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

const ProjectManagementPage = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
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

  const saveProject = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/projects/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/projects", form);
    }

    setForm({ name: "", description: "" });
    loadProjects();
  };

  const editProject = (project) => {
    setEditingId(project.id);
    setForm({
      name: project.name,
      description: project.description,
    });
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    loadProjects();
  };

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar role="MANAGER" />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Project Management</h1>

          <form
            onSubmit={saveProject}
            className="bg-white p-5 rounded-xl shadow mb-6 max-w-xl"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <input
              name="name"
              placeholder="Project Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-3"
              required
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-3"
            />

            <button className="bg-blue-700 text-white px-5 py-3 rounded">
              {editingId ? "Update Project" : "Create Project"}
            </button>
          </form>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-3 text-left">Project Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="p-3">{project.name}</td>
                    <td className="p-3">{project.description}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => editProject(project)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProject(project.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectManagementPage;