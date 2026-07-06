import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import MemberDashboard from "./pages/MemberDashboard";
import CreateReportPage from "./pages/CreateReportPage";
import ReportHistoryPage from "./pages/ReportHistoryPage";

import ManagerDashboard from "./pages/ManagerDashboard";
import AllReportsPage from "./pages/AllReportsPage";
import ProjectManagementPage from "./pages/ProjectManagementPage";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/member/dashboard"
          element={
            <ProtectedRoute allowedRoles={["TEAM_MEMBER"]}>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/reports/create"
          element={
            <ProtectedRoute allowedRoles={["TEAM_MEMBER"]}>
              <CreateReportPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/reports/history"
          element={
            <ProtectedRoute allowedRoles={["TEAM_MEMBER"]}>
              <ReportHistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/reports"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <AllReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/projects"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ProjectManagementPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;