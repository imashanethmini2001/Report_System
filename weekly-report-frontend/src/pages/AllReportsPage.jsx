import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

const AllReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [filters, setFilters] = useState({
    userId: "",
    projectId: "",
    weekStart: "",
    weekEnd: "",
  });

  const loadData = async () => {
    const reportsRes = await API.get("/manager/reports");
    const usersRes = await API.get("/manager/users");
    const projectsRes = await API.get("/projects");

    setReports(reportsRes.data);
    setUsers(usersRes.data);
    setProjects(projectsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchUser =
      !filters.userId || report.user?.id === Number(filters.userId);

    const matchProject =
      !filters.projectId || report.project?.id === Number(filters.projectId);

    const matchWeekStart =
      !filters.weekStart || report.weekStart >= filters.weekStart;

    const matchWeekEnd =
      !filters.weekEnd || report.weekEnd <= filters.weekEnd;

    return matchUser && matchProject && matchWeekStart && matchWeekEnd;
  });

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar role="MANAGER" />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">All Team Reports</h1>

          <div className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              className="border p-3 rounded"
              value={filters.userId}
              onChange={(e) =>
                setFilters({ ...filters, userId: e.target.value })
              }
            >
              <option value="">All Members</option>
              {users
                .filter((u) => u.role === "TEAM_MEMBER")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>

            <select
              className="border p-3 rounded"
              value={filters.projectId}
              onChange={(e) =>
                setFilters({ ...filters, projectId: e.target.value })
              }
            >
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="border p-3 rounded"
              value={filters.weekStart}
              onChange={(e) =>
                setFilters({ ...filters, weekStart: e.target.value })
              }
            />

            <input
              type="date"
              className="border p-3 rounded"
              value={filters.weekEnd}
              onChange={(e) =>
                setFilters({ ...filters, weekEnd: e.target.value })
              }
            />
          </div>

          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-3 text-left">Member</th>
                  <th className="p-3 text-left">Project</th>
                  <th className="p-3 text-left">Week</th>
                  <th className="p-3 text-left">Completed</th>
                  <th className="p-3 text-left">Blockers</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="p-3">{report.user?.name}</td>
                    <td className="p-3">{report.project?.name}</td>
                    <td className="p-3">
                      {report.weekStart} to {report.weekEnd}
                    </td>
                    <td className="p-3">{report.tasksCompleted}</td>
                    <td className="p-3">{report.blockers || "None"} </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-sm ${
                          report.status === "SUBMITTED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredReports.length === 0 && (
              <p className="p-5 text-gray-600">No reports found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllReportsPage;