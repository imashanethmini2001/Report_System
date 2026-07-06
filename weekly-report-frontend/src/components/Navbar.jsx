import { logout, getName } from "../utils/auth";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-xl font-bold text-blue-700">
        Weekly Report System
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700">{getName()}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;