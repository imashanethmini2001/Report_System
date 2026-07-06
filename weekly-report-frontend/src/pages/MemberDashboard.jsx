import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import API from "../api/axios";

const MemberDashboard = () => {
  const [reports, setReports] = useState([]);

  const loadReports = async () => {
    const res = await API.get("/reports/my");
    setReports(res.data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const submitted = reports.filter((r) => r.status === "SUBMITTED").length;
  const drafts = reports.filter((r) => r.status === "DRAFT").length;

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar role="TEAM_MEMBER" />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Member Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SummaryCard title="Total Reports" value={reports.length} />
            <SummaryCard title="Submitted Reports" value={submitted} />
            <SummaryCard title="Draft Reports" value={drafts} />
          </div>

          <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="text-xl font-bold mb-3">Latest Report</h2>

            {reports.length > 0 ? (
              <p>
                Last report week: {reports[0].weekStart} to {reports[0].weekEnd}
              </p>
            ) : (
              <p>No reports created yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;