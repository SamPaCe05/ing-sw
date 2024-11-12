import { Outlet } from "react-router-dom";
import "./Navbar.css"

function Navbar({ user }) {
  return (
    <div>
      <nav>
        <div className="Navbar">
            <img className="logo" src="/src/img/logo.png" alt="" />
            <h2 className="title-navbar">CodeAMZ</h2>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
