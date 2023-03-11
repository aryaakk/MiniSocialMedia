import React, { useEffect, useState } from "react";
import textLogo from "./../../assets/images/text-logo-rekin.png";
import "../../assets/css/components/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Dropdown } from "antd";
import axios from "axios";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const token = localStorage.getItem("token");
  let [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    // axios.defaults.headers.common = `Bearer ${token}`;

    await axios
      .post("http://localhost:8000/api/logout")
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        navigate("/rekin/all");
        notification.open({
          icon: (
            <i
              style={{ color: "#20bf55" }}
              className="fa-solid fa-circle-check"
            ></i>
          ),
          message: "You Succes to logout!!",
          duration: 2,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const items = [
    {
      key: "0",
      label: (
        <span className="drop-menu">
          Welcome, {user == null ? "" : user.name}
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <NavLink
          className="drop-menu"
          target="_blank"
          rel="noopener noreferrer"
          to="/rekin/home"
        >
          Profile
        </NavLink>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      danger: true,
      label: (
        <NavLink className="drop-menu" onClick={logoutHandler}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </NavLink>
      ),
    },
  ];
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);
  return (
    <nav className="nav">
      <div className="nav-brand">
        <NavLink to="/rekin/all">
          <img src={textLogo} alt="" />
        </NavLink>
      </div>
      <ul className="nav-menu">
        <input type="text" placeholder="Search for status" />
      </ul>
      <div className="nav-auth">
        {token === null ? (
          <div className="auth">
            <NavLink className="login" to="/login">
              Login
            </NavLink>
            <NavLink className="register" to="/register">
              Register
            </NavLink>
          </div>
        ) : (
          <div className="profile">
            <Dropdown
              className="dropdown"
              arrow
              placement="bottomRight"
              menu={{
                items,
              }}
            >
              <img src={require("./../../assets/images/user.png")} alt="" />
            </Dropdown>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
