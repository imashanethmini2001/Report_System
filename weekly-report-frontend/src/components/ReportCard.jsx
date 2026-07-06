const ReportCard = ({ report }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold text-lg">
          {report.project?.name || "No Project"}
        </h3>

        <span
          className={`px-3 py-1 rounded text-sm ${
            report.status === "SUBMITTED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {report.status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        Week: {report.weekStart} to {report.weekEnd}
      </p>

      <p><strong>Completed:</strong> {report.tasksCompleted}</p>
      <p><strong>Planned:</strong> {report.tasksPlanned}</p>
      <p><strong>Blockers:</strong> {report.blockers || "None"}</p>
      <p><strong>Hours:</strong> {report.hoursWorked || 0}</p>
      <p><strong>Notes:</strong> {report.notes || "No notes"}</p>
    </div>
  );
};

export default ReportCard;