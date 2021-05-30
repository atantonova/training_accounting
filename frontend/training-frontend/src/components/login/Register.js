import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../../service/AuthService";
import authHeader from "../../service/AuthHeader";
import DatePicker from "react-datepicker";

import "./Register.css";

const USER_URL = "http://localhost:8080/api/usr/";
const OCCUPATION_URL = "http://localhost:8080/api/occupation/";

function Register(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [users, setUsers] = useState({ allUsers: [] });
  const [occupations, setOccupations] = useState({ occupations: [] });
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = (data) => {
    AuthService.register(
      data.username,
      data.emailAddress,
      data.password,
      data.firstName,
      data.lastName,
      data.middleName,
      data.supervisorUsername,
      data.dateStartWorking,
      data.phoneNumber,
      data.occupation
    )
      .then((response) => {
        setMessage("Пользователь успешно зарегистрирован!");
      })
      .catch((e) => {
        setMessage("Ошибка:" + e.message);
      });
  };

  useEffect(() => {
    const getUsers = async () => {
      const result = await axios.get(USER_URL, { headers: authHeader() });
      setUsers({ allUsers: result.data });
    };
    getUsers();

    const getOccupations = async () => {
      const result = await axios.get(OCCUPATION_URL, { headers: authHeader() });
      setOccupations({ occupations: result.data });
    };

    getOccupations();
  }, []);

  return (
    <div className="container">
      <h1>Регистрация нового пользователя</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <label htmlFor="username">Логин</label>
          <input
            placeholder="username"
            {...register("username", {
              required: "Это поле обязательное",
              minLength: {
                value: 3,
                message: "Логин должен содержать от 3 до 30 символов",
              },
              maxLength: {
                value: 30,
                message: "Логин должен содержать от 3 до 30 символов",
              },
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
              minLength: {
                value: 6,
                message: "Пароль должен содержать от 6 до 30 символов",
              },
              maxLength: {
                value: 30,
                message: "Пароль должен содержать от 6 до 30 символов",
              },
            })}
          />
          {errors && errors.password && (
            <i className="error">{errors.password.message}</i>
          )}
        </div>

        <div className="inputField">
          <label htmlFor="lastName">Фамилия</label>
          <input
            placeholder="Иванов"
            {...register("lastName", {
              required: "Это поле обязательное",
            })}
          />
          {errors && errors.lastName && (
            <i className="error">{errors.lastName.message}</i>
          )}
        </div>

        <div className="inputField">
          <label htmlFor="firstName">Имя</label>
          <input
            placeholder="Иван"
            {...register("firstName", {
              required: "Это поле обязательное",
            })}
          />
          {errors && errors.firstName && (
            <i className="error">{errors.firstName.message}</i>
          )}
        </div>

        <div className="inputField">
          <label htmlFor="middleName">Отчество</label>
          <input placeholder="Иванович" {...register("middleName")} />
        </div>

        <div className="inputField">
          <label htmlFor="emailAddress">E-mail</label>
          <input
            placeholder="ivan@mail.ru"
            type="email"
            {...register("emailAddress")}
          />
        </div>

        <div className="inputField">
          <label htmlFor="phoneNumber">Телефон</label>
          <input placeholder="" {...register("phoneNumber")} />
        </div>

        <div className="inputField">
          <label>Дата начала работы</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setValue("dateStartWorking", date);
              setStartDate(date);
            }}
          />
        </div>

        <div className="inputField">
          <label htmlFor="occupation">Должность</label>
          <select
            {...register("occupation", { required: "Это поле обязательное!" })}
          >
            {occupations.occupations &&
              occupations.occupations.map((o) => {
                return (
                  <option key={o.id} value={o.name}>
                    {o.name}
                  </option>
                );
              })}
          </select>
          {errors && errors.occupation && (
            <i className="error">{errors.occupation.message}</i>
          )}
        </div>

        <div className="inputField">
          <label htmlFor="supervisorUsername">Начальник</label>
          <select {...register("supervisorUsername")}>
            {users.allUsers &&
              users.allUsers.map((u) => {
                return (
                  <option key={u.id} value={u.username}>
                    {u.lastName + " " + u.firstName + ": " + u.username}
                  </option>
                );
              })}
          </select>
        </div>
        <input
          className="submitButton"
          type="submit"
          value="Зарегистрировать"
        />
      </form>
      {message && message.length > 0 && (
        <i className="error" style={{ marginLeft: 40 }}>
          {message}
        </i>
      )}
    </div>
  );
}

export default Register;
