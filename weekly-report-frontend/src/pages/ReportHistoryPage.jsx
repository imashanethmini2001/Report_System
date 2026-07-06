import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ReportCard from "../components/ReportCard";
import API from "../api/axios";

const ReportHistoryPage = () => {
  const [reports, setReports] = useState([]);

  const loadReports = async () => {
    const res = await API.get("/reports/my");
    setReports(res.data);
  };

  const submitReport = async (id) => {
    await API.post(`/reports/${id}/submit`);
    loadReports();
  };

  const deleteReport = async (id) => {
    await API.delete(`/reports/${id}`);
    loadReports();
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar role="TEAM_MEMBER" />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">My Report History</h1>

          <div className="grid gap-5">
            {reports.map((report) => (
              <div key={report.id}>
                <ReportCard report={report} />

                <div className="flex gap-3 mt-2">
                  {report.status === "DRAFT" && (
                    <button
                      onClick={() => submitReport(report.id)}
                      className="bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Submit
                    </button>
                  )}

                  <button
                    onClick={() => deleteReport(report.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {reports.length === 0 && (
              <p className="text-gray-600">No reports found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportHistoryPage;