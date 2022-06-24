import "./Header.css"
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import MainMenu from "../Navigation/MainMenu/MainMenu";
import Menu from "../Navigation/Menu/Menu";
import React from "react";
import { useLocation } from "react-router-dom";

function Header({ isLoggedIn }) {
  let location = useLocation();
  
 
  return (
    <header className="header" style={location.pathname === '/' ? {background: '#5C5C5C'} : {background: '#FFF'}}>
      <Navigation>
        <Logo />
        {isLoggedIn === true ? <Menu /> : <MainMenu />}
      </Navigation>
    </header>
  )
}

export default Header;
