import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
import formLogo from "../../images/header-logo.svg";
import validator from "../Validator/Validator";

function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } = validator();

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
    props.onLogin(values.email, values.password);

    if (props.error) {
      resetForm();
    }
  }

  return (
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
            onChange={handleChange}
            id="email"
            className="form__input form__input-email"
            required
            disabled={props.isFormDisabled}
          ></input>
          <span
            className={`form__input-error ${
              errors.email ? `form__input-error_active` : ``
            }`}
            id="email-input-error"
          >
            {errors.email ? errors.email : ``}
          </span>
        </label>
        <label className="form__field" htmlFor="password">
          <p className="form__input-title">Пароль</p>
          <input
            name="password"
            type="password"
            minLength="8"
            onChange={handleChange}
            id="password"
            className="form__input form__input-password"
            required
            disabled={props.isFormDisabled}
          ></input>
          <span
            className={`form__input-error ${
              errors.password ? `form__input-error_active` : ``
            }`}
            id="password-input-error"
          >
            {errors.password ? errors.password : ``}
          </span>
        </label>

        <span
          className={`form__submit-error ${
            props.isErrorVisible ? `form__submit-error_active` : ``
          }`}
        >
          {props.error}
        </span>
        <button
          type="submit"
          className={`form__submit ${isValid && !props.isFormDisabled ? `` : `form__submit_disabled`}`}
          disabled={!isValid && props.isFormDisabled}
        >
          Войти
        </button>
      </form>
      <p className="form__caption">
        Ещё не зарегистрированы?
        <Link to="/signup" className="form__link">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Login);
