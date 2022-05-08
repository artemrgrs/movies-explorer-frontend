import React from "react";
import { Link } from "react-router-dom";

import "./Profile.css";

function Profile(props) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.changeFormState()
  }

  return(
    <div className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile-form" 
        name="edit-profile" 
        method="get"
        action="index.html"
        onSubmit={handleSubmit}
        noValidate>
          <label className="profile-form__field">
            <p className="profile-form__input-name">Имя</p>
            <input className="profile-form__input" 
            value={name}
            name="edit-profile"
            placeholder="Виталий"
            onChange={handleChangeName}
            type="text"
            minLength="2"
            id="profile-name-input"
            ></input>
          </label>
          <label className="profile-form__field">
            <p className="profile-form__input-name">Почта</p>
            <input className="profile-form__input" 
            value={email}
            name="edit-profile"
            type="email"
            placeholder="pochta@yandex.ru"
            onChange={handleChangeEmail}
            minLength="2"
            id="profile-name-input"
            ></input>
          </label>
          <button type="submit" 
          className={`profile-form__submit ${ props.formState ? `profile-form__submit_visible` : `` }`}>Сохранить</button>
      </form>
      <button type="button" className={`profile__edit ${ props.formState ? `profile__edit_hidden` : `` }`} onClick={props.changeFormState}>Редактировать</button>
      <Link to="/signin" 
      className={`profile__logout ${ props.formState ? `profile__logout_hidden` : `` }`}>Выйти из аккаунта</Link>
    </div>
  )
}

export default Profile;