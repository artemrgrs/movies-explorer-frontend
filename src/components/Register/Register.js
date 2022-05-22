import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import formLogo from "../../images/header-logo.svg";
import validator from "../Validator/Validator";

function Register(props) {
  const { values, handleChange, errors, isValid, resetForm } = validator();

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.name || !values.email || !values.password) {
      return;
    }
    props.onRegister(values.name, values.email, values.password);

    if (props.error) {
      resetForm();
    }
  }

  return (
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
            onChange={handleChange}
            minLength="2"
            id="name"
            className="form__input form__input-name"
            required
            disabled={props.isFormDisabled}
          ></input>
          <span
            className={`form__input-error ${
              errors.name ? `form__input-error_active` : ``
            }`}
            id="name-input-error"
          >
            {errors.name ? errors.name : ``}
          </span>
        </label>
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
          Зарегистрироваться
        </button>
      </form>
      <p className="form__caption">
        Уже зарегистрированы?
        <Link to="/signin" className="form__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Register);
