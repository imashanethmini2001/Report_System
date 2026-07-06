const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-blue-700 mt-2">{value}</h2>
    </div>
  );
};

export default SummaryCard;