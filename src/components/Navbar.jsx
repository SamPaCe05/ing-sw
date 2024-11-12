import { Outlet } from "react-router-dom";
import Home from "../Pages/HomeUser";
import "./Navbar.css";

function Navbar({ user }) {
    console.log(user)
  return (
    <div className="navbar-container">
      <div className="Navbar">
        <img className="logo" src="/src/img/logo.png" alt="" />
        <h2 className="title-navbar">CodeAMZ</h2>
      </div>
      <div className="index">
        hola
      </div>
      <div className="homeinfo">
        <Home />
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
