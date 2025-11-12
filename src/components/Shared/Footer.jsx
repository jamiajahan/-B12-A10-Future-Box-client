import { Link } from "react-router-dom";
// Import a placeholder logo (replace with your actual logo.png)
import logo from "../../assets/react.svg"; 

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content mt-10">
      <aside>
        <img src={logo} alt="Logo" className="w-10" />
        <p className="font-bold">
          CleanCommunity Portal
        </p>
        <p>Reporting local issues for a cleaner tomorrow.</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <h6 className="footer-title">Useful Links</h6>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/all-issues" className="link link-hover">All Issues</Link>
        <Link to="/login" className="link link-hover">Login</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <a className="link link-hover">Facebook</a>
        <a className="link link-hover">Twitter (X)</a>
        <a className="link link-hover">Youtube</a>
      </nav>
    </footer>
  );
};

export default Footer;