import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import authHeader from "../../service/AuthHeader";
import "react-datepicker/dist/react-datepicker.css";
import "./AddCertificateOwning.css";

const CERT_OWN_URL = "http://localhost:8080/api/cert_own/self";
const CERTIFICATE_URL = "http://localhost:8080/api/cert/";

function AddCertificateOwning() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [file, setFile] = useState();

  const onSubmit = (data) => {
    if (data.certificateName === "") {
      setMessage("Сертификат не выбран");
      return;
    }
    let formData = new FormData();
    let jsonBodyData = {
      certificateName: data.certificateName,
      dateReceived: data.dateReceived,
    };

    if (file !== null) {
      formData.append("file", file);
    }
    formData.append(
      "jsonBodyData",
      new Blob([JSON.stringify(jsonBodyData)], {
        type: "application/json",
      })
    );

    axios.post(CERT_OWN_URL, formData, { headers: authHeader() }).then(
      (response) => setMessage("Сертификат успешно добавлен"),
      (error) => setMessage("Ошибка сервера: " + error)
    );
  };

  const onChangeFile = (event) => {
    let file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Ошибка: файл не может быть больше 5Мб");
    } else if (
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpeg"
    ) {
      setMessage("Ошибка: загрузите фотографию в формате .png, .jpg или .jpeg");
    } else {
      setFile(event.target.files[0]);
    }
  };

  const [certificates, setCertificates] = useState({ certificates: [] });

  useEffect(() => {
    const getCertificates = async () => {
      const result = await axios.get(CERTIFICATE_URL + "occ", {
        headers: authHeader(),
      });
      setCertificates({
        certificates: result.data,
      });
    };

    getCertificates();
    setValue("dateReceived", startDate);
  }, []);
  return (
    <div className="container">
      <h1>Добавить имеющийся сертификат</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="inputField">
          <label>Сертификат</label>
          <select {...register("certificateName")}>
            {certificates.certificates &&
              certificates.certificates.map((c) => {
                return (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
          </select>
          {errors && errors.certificate && (
            <i className="error">{errors.certificate.message}</i>
          )}
        </div>
        <div className="inputField">
          <label>Дата получения</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setValue("dateReceived", date);
              setStartDate(date);
            }}
          />
        </div>
        <div className="inputFile">
          <label>Файл подтверждения</label>
          <input type="file" onChange={(e) => onChangeFile(e)} />
        </div>

        <input value="Добавить" type="submit" className="submitButton" />
      </form>
      <i>{message}</i>
    </div>
  );
}

export default AddCertificateOwning;
