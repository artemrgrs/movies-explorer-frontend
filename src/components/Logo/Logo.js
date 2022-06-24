import React from "react";
import "./Logo.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link className="logo-link" to="/">
      <img className="logo-link__img" src={logo} alt="Логотип" />
    </Link>
  )
}

export default Logo;