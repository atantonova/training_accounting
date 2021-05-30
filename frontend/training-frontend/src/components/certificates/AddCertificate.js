import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authHeader from "../../service/AuthHeader";
import axios from "axios";

import "../login/Register.css";

const CERTIFICATE_URL = "http://localhost:8080/api/cert/";

function AddCertificate() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    let dto = {
      name: data.name,
      description: data.description,
      daysValid: data.daysValid,
      trainingDurationDays: data.trainingDurationDays,
    };
    axios.post(CERTIFICATE_URL, dto, { headers: authHeader() }).then(
      (response) => setMessage("Сертификат успешно добавлен"),
      (error) => setMessage("Ошибка: " + error)
    );
  };

  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <h1>Регистрация нового сертификата</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <label htmlFor="name">Название</label>
          <input
            placeholder="Охрана труда"
            {...register("name", {
              required: "Это поле обязательное",
            })}
          />
          {errors && errors.name && (
            <i className="error">{errors.name.message}</i>
          )}
        </div>
        <div className="inputFieldBig">
          <label htmlFor="description">Описание</label>
          <textarea
            cols="40"
            rows="5"
            placeholder="Комментарии"
            {...register("description")}
          />
        </div>
        <div className="inputField">
          <label htmlFor="daysValid">Действует</label>
          <input
            placeholder="18"
            type="number"
            {...register("daysValid", {
              valueAsNumber: true,
              required: "Это поле обязательное",
            })}
          />
          <label>месяцев</label>

          {errors && errors.daysValid && (
            <i className="error">{errors.daysValid.message}</i>
          )}
        </div>

        <div className="inputField">
          <label htmlFor="trainingDurationDays">Обучение длится</label>
          <input
            placeholder="7"
            type="number"
            {...register("trainingDurationDays", {
              valueAsNumber: true,
              required: "Это поле обязательное",
            })}
          />
          <label>дней</label>

          {errors && errors.trainingDurationDays && (
            <i className="error">{errors.trainingDurationDays.message}</i>
          )}
        </div>

        <input
          type="submit"
          value="Добавить сертификат"
          className="submitButton"
        />
      </form>
      {message && <i>{message}</i>}
    </div>
  );
}

export default AddCertificate;
