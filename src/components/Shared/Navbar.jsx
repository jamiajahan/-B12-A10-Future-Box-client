import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Import your auth hook
import toast from "react-hot-toast";

// Import a placeholder logo (replace with your actual logo.png)
import logo from "../../assets/react.svg"; 

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((err) => toast.error(err.message));
  };

  // Links before login
  const navLinksBeforeLogin = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-issues">Issues</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/register">Register</NavLink></li>
    </>
  );

  // Links after login
  const navLinksAfterLogin = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-issues">All Issues</NavLink></li>
      <li><NavLink to="/add-issue">Add Issues</NavLink></li>
      <li><NavLink to="/my-issues">My Issues</NavLink></li>
      <li><NavLink to="/my-contribution">My Contribution</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm container mx-auto px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user ? navLinksAfterLogin : navLinksBeforeLogin}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <img src={logo} alt="Logo" className="w-8" />
          CleanCommunity
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? navLinksAfterLogin : navLinksBeforeLogin}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src={user.photoURL || "https://i.ibb.co/Jq0x2Nq/user.png"}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  {user.displayName || "Profile"}
                </a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;