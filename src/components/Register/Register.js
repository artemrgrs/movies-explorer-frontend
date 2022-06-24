import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useFormWithValidation } from "../../utils/Validation";
import Message from "../Message/Message";

function Register({ onRegister, message, setMessege }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
    setMessege(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const {name, email, password } = values;
    onRegister(name, email, password);
  }

  return (
    <Form title="Добро пожаловать!" name="signup" textBtn="Зарегистрироваться" text="Уже зарегистрированы?" textLink="Войти" path="/signin" isValid={isValid} onSubmit={handleSubmit} >
      <Input
        textLabel="Имя"
        textErr={errors.name}
        inputId="name"
        labelFor="name"
        type="text"
        inputName="name"
        spanId="name-error"
        value={values.name || ''}
        onChange={handleChange}
        required
        
        
      />
      <Input
        textLabel="E-mail"
        textErr={errors.email}
        inputId="email"
        labelFor="email"
        type="email"
        inputName="email"
        spanId="email-error"
        value={values.email || ''}
        onChange={handleChange}
        required
        
      />
      <Input
        textLabel="Пароль"
        textErr={errors.password}
        inputId="password"
        labelFor="password"
        type="password"
        inputName="password"
        spanId="password-error"
        minLength="5"
        maxLength="30"
        value={values.password || ''}
        onChange={handleChange}
        required
        
      />
      <Message message={message} />
    </Form>
  )
}
export default Register;