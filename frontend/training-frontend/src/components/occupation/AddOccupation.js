import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authHeader from "../../service/AuthHeader";
import Select from "react-select";
import axios from "axios";

import "../login/Register.css";

const OCCUPATION_URL = "http://localhost:8080/api/occupation/";
const CERTIFICATE_URL = "http://localhost:8080/api/cert/";

function AddOccupation() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const onSubmit = (data) => {
    let dto = {
      name: data.name,
      description: data.description,
      requiredCertificates: data.requiredCertificates,
    };
    axios.post(OCCUPATION_URL, dto, { headers: authHeader() }).then(
      (response) => setMessage("Должность успешно добавлена"),
      (error) => setMessage("Ошибка сервера: " + error)
    );
  };

  const [message, setMessage] = useState("");
  const [certificates, setCertificates] = useState({ certificates: [] });

  useEffect(() => {
    const getCertificates = async () => {
      const result = await axios.get(CERTIFICATE_URL, {
        headers: authHeader(),
      });
      setCertificates({
        certificates: result.data.map((d) => ({
          value: d.name,
          label: d.name,
        })),
      });
    };

    getCertificates();
  }, []);

  const onSelectChange = (e) => {
    setValue(
      "requiredCertificates",
      e.map((e) => e.value)
    );
  };

  const selectStyle = {
    height: 30,
    width: 800,
  };

  return (
    <div className="container">
      <h1>Регистрация новой должности</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <label htmlFor="name">Название</label>
          <input
            placeholder="Бухгалтер"
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
            placeholder="Обязанности: ... Подчиненные: ..."
            {...register("description")}
          />
        </div>
        <div className="inputField" style={{ width: 800 }}>
          <label htmlFor="requiredCertificates" style={{ marginRight: 30 }}>
            Добавить сертификаты
          </label>
          <Select
            isMulti
            options={certificates.certificates}
            onChange={onSelectChange}
            styles={{ width: 800, marginLeft: 10 }}
          />
        </div>
        <input
          type="submit"
          value="Добавить должность"
          className="submitButton"
        />
      </form>
      <i>{message}</i>
    </div>
  );
}

export default AddOccupation;
