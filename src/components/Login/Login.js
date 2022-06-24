import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useFormWithValidation } from "../../utils/Validation";
import Message from "../Message/Message";

function Login({ onLogin, message, setMessege }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
    setMessege(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    onLogin( email, password );
}

  return (
    <Form title="Рады видеть!" name="signin" textBtn="Войти" text="Еще не зарегистрированы?" textLink="Регистрация" path="/signup" isValid={isValid} onSubmit={handleSubmit}>
      <Input
        value={values.email || ''}
        textLabel="E-mail"
        textErr={errors.email}
        inputId="email"
        labelFor="email"
        type="email"
        inputName="email"
        spanId="email-error"
        onChange={handleChange}
        required
      />
      <Input
        value={values.password || ''}
        textLabel="Пароль"
        textErr={errors.password}
        inputId="password"
        labelFor="password"
        type="password"
        inputName="password"
        spanId="password-error"
        minLength="5"
        maxLength="30"
        onChange={handleChange}
        required
      />
      <Message message={message} />
    </Form>
  )
}
export default Login;