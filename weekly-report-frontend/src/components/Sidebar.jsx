import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      <div className="flex flex-col gap-3">
        {role === "TEAM_MEMBER" && (
          <>
            <Link to="/member/dashboard" className="hover:bg-blue-700 p-2 rounded">
              Member Dashboard
            </Link>
            <Link to="/member/reports/create" className="hover:bg-blue-700 p-2 rounded">
              Create Report
            </Link>
            <Link to="/member/reports/history" className="hover:bg-blue-700 p-2 rounded">
              Report History
            </Link>
          </>
        )}

        {role === "MANAGER" && (
          <>
            <Link to="/manager/dashboard" className="hover:bg-blue-700 p-2 rounded">
              Manager Dashboard
            </Link>
            <Link to="/manager/reports" className="hover:bg-blue-700 p-2 rounded">
              All Reports
            </Link>
            <Link to="/manager/projects" className="hover:bg-blue-700 p-2 rounded">
              Projects
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;