import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useFormWithValidation } from "../../utils/Validation";
import Message from "../Message/Message";

function Profile({ isLoggedIn, onSignOut, onUpdateUser, message }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, setValues, isValid, setIsValid } = useFormWithValidation();


  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = values;
    onUpdateUser(name, email);
  }

  React.useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);

  React.useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const btnClassName = ((isValid && (values.name !== currentUser.name || values.email !== currentUser.email)) ? 'profile__btn profile__btn_activ' : 'profile__btn')
  const btnDisabled = ((values.name === currentUser.name && values.email === currentUser.email) || !isValid);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__container">
            <label className="profile__label" htmlFor="name">Имя</label>
              <input className="profile__input"
                type="text"
                placeholder="Имя"
                id="profile-name"
                value={values.name || ''}
                name="name"
                onChange={handleChange}
                required />
            </div>
            <span className="profile__input-error">{errors.name}</span>
     
          <div className="profile__container">
            <label htmlFor="email" className="profile__label profile__label_not-line">E-mail</label>
              <input className="profile__input"
                type="email"
                name="email"
                placeholder="E-mail"
                id="profile-email"
                value={values.email || ''}
                onChange={handleChange}
                required />
          </div>
          <span className="profile__input-error">{errors.email}</span>
          <Message message={message} />
          <button className={btnClassName} disabled={btnDisabled} type="submit">Редактировать</button>
        </form>
        <Link to="/" className="profile__link" onClick={onSignOut}>Выйти из аккаунта</Link>
      </div>
    </>
  )
}
export default Profile;