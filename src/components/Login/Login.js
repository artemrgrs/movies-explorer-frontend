import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
import formLogo from '../../images/header-logo.svg';

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <div className="form">
      <img alt="Логотип сервиса" src={formLogo} className="form__logo"></img>
      <h2 className="form__header">Рады видеть!</h2>
      <form
        method="post"
        action="index.html"
        name="sign-in"
        className="form__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="form__field" htmlFor="email">
          <p className="form__input-title">E-mail</p>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            id="email"
            className="form__input form__input-email"
            required
          ></input>
          <span className="form__input-error" id="email-input-error"></span>
        </label>
        <label className="form__field" htmlFor="password">
          <p className="form__input-title">Пароль</p>
          <input
            name="password"
            type="password"
            value={password}
            minLength="8"
            onChange={handleChangePassword}
            id="password"
            className="form__input form__input-password"
            required
          ></input>
          <span className="form__input-error" id="password-input-error"></span>
        </label>
        <button type="submit" className="form__submit">
          Войти
        </button>
      </form>
      <p className="form__caption">
        Ещё не зарегистрированы?
        <Link to="/signup" className="form__link">Регистрация</Link>
      </p>
    </div>
  )
}

export default Login;