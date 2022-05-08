import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
import formLogo from '../../images/header-logo.svg';

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

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
      <h2 className="form__header">Добро пожаловать!</h2>
      <form
        method="post"
        action="index.html"
        name="sign-up"
        className="form__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="form__field" htmlFor="name">
          <p className="form__input-title">Имя</p>
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChangeName}
            id="name"
            className="form__input form__input-name"
            required
          ></input>
          <span className="form__input-error" id="name-input-error"></span>
        </label>
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
          Зарегистрироваться
        </button>
      </form>
      <p className="form__caption">
        Уже зарегистрированы?
        <Link to="/signin" className="form__link">Войти</Link>
      </p>
    </div>
  )
}

export default Register;