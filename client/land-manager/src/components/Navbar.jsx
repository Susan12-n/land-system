import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-green-400 hover:text-green-300 transition duration-200"
        >
          LandWise
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 text-sm font-medium">
          <Link to="/" className="hover:text-green-400 transition">
            Home
          </Link>

          <Link to="/contact" className="hover:text-green-400 transition">
            Contact
          </Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-green-400 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Register
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-green-400 transition">
              Admin
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="hover:text-green-400 transition focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
