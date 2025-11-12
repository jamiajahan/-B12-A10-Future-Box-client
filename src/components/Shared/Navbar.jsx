import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Import your auth hook
import toast from "react-hot-toast";
import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import logo from "../../assets/react.svg"; 

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

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

        {/* !! 4. ADD THE TOGGLE SWITCH !! */}
        <label className="swap swap-rotate mr-4">
          <input 
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
            className="theme-controller"
          />
          {/* sun icon */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-1.42,1.42a1,1,0,0,0,1.42,1.42L7.05,18.42A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05A1,1,0,0,0,7.05,5.64L5.64,4.22A1,1,0,0,0,4.22,5.64Zm12.73,1.42L17,5.64a1,1,0,0,0-1.42,1.42l1.42,1.42a1,1,0,0,0,1.42-1.42ZM17,12a1,1,0,0,0-1-1H15a1,1,0,0,0,0,2h1A1,1,0,0,0,17,12Zm-1.42,5.64a1,1,0,0,0-1.42,1.42l1.42,1.42a1,1,0,0,0,1.42-1.42ZM12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/></svg>
          {/* moon icon */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,13.05,13.05,0,0,1-4.21.56,12.06,12.06,0,0,1-7.72-2.1A12.8,12.8,0,0,1,3.28,10.15a1,1,0,0,0-.39-1,1,1,0,0,0-.8.21,12.06,12.06,0,0,0-2.1,7.72A12.06,12.06,0,0,0,12,24a12.06,12.06,0,0,0,7.72-2.1,1,1,0,0,0,.21-.8A12.8,12.8,0,0,1,13,21.64,1,1,0,0,0,13,21.64Z"/></svg>
        </label>
        {/* --------------------- */}
        
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