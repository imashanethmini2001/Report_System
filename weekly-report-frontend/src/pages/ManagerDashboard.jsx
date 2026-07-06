import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ManagerDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [reports, setReports] = useState([]);

  const loadData = async () => {
    const summaryRes = await API.get("/manager/summary");
    const reportsRes = await API.get("/manager/reports");

    setSummary(summaryRes.data);
    setReports(reportsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const projectData = Object.values(
    reports.reduce((acc, report) => {
      const project = report.project?.name || "Unknown";

      if (!acc[project]) {
        acc[project] = { name: project, count: 0 };
      }

      acc[project].count += 1;
      return acc;
    }, {})
  );

  const statusData = [
    {
      name: "Submitted",
      value: reports.filter((r) => r.status === "SUBMITTED").length,
    },
    {
      name: "Draft",
      value: reports.filter((r) => r.status === "DRAFT").length,
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar role="MANAGER" />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

          {summary && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
              <SummaryCard title="Total Reports" value={summary.totalReports} />
              <SummaryCard title="Submitted" value={summary.submittedReports} />
              <SummaryCard title="Pending" value={summary.pendingReports} />
              <SummaryCard
                title="Compliance Rate"
                value={`${summary.complianceRate.toFixed(1)}%`}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-4">Workload by Project</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-4">Submission Status</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={index === 0 ? "#16a34a" : "#facc15"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="font-bold text-xl mb-4">Recent Reports</h2>

            {reports.slice(0, 5).map((report) => (
              <div key={report.id} className="border-b py-3">
                <p>
                  <strong>{report.user?.name}</strong> submitted report for{" "}
                  <strong>{report.project?.name}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Week: {report.weekStart} - {report.weekEnd}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;