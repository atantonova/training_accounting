import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import AuthService from "../../service/AuthService";
import "./Login.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleLogin = (data) => {
    setMessage("");
    setLoading(true);

    AuthService.login(data.username, data.password).then(
      () => {
        props.history.push("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="container">
      <h1>Вход в систему</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="inputField">
          <label htmlFor="username">Логин</label>
          <input
            placeholder="username"
            {...register("username", {
              required: "Это поле обязательное",
            })}
          />
          {errors && errors.username && (
            <i className="error">{errors.username.message}</i>
          )}
        </div>

        <div className="inputField">
          <label htmlFor="password">Пароль</label>
          <input
            placeholder="***"
            type="password"
            {...register("password", {
              required: "Это поле обязательное",
            })}
          />
          {errors && errors.password && (
            <i className="error">{errors.password.message}</i>
          )}
        </div>
        <input className="submitButton" type="submit" value="Вход" />
      </form>
      {message && <i className="error">{message}</i>}
    </div>
  );
}

export default Login;
