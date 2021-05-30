import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../util/Table";
import authHeader from "../../service/AuthHeader";
import EditableTable from "../util/EditableTable";
import makeReport from "../util/Report";

const CERTIFICATE_URL = "http://localhost:8080/api/cert/";

function AllCertificates() {
  // const [message, setMessage] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getCertificates = async () => {
      const result = await axios.get(CERTIFICATE_URL, {
        headers: authHeader(),
      });
      setCertificates(result.data);
    };

    getCertificates();
  }, []);

  let columns = [
    {
      Header: "Название",
      accessor: "name",
    },
    {
      Header: "Описание",
      accessor: "description",
    },
    {
      Header: "Срок действия (мес.)",
      accessor: "daysValid",
    },
    {
      Header: "Длительность обучения (дней)",
      accessor: "trainingDurationDays",
    },
    {
      Header: "Удалить",
      accessor: "deleteButton",
    },
  ];

  const deleteRow = (id) => {
    axios.delete(CERTIFICATE_URL + id, { headers: authHeader() }).then(
      (response) => {
        setCertificates(certificates.filter((c) => c.id !== id));
      },
      (error) => console.log("Ошибка сервера: " + error)
    );
  };

  const tableData = certificates.map((c) => ({
    name: c.name,
    description: c.description,
    daysValid: c.daysValid,
    trainingDurationDays: c.trainingDurationDays,
    deleteButton: (
      <button
        className="buttonDelete"
        key={c.name}
        onClick={() => deleteRow(c.id)}
      >
        &times;
      </button>
    ),
  }));

  const onUpdate = (index, id, value) => {
    let editedCert = certificates.find((c) => c.name === tableData[index].name);
    editedCert[id] = value;
    axios.put(CERTIFICATE_URL + editedCert.id, editedCert, {
      headers: authHeader(),
    });
  };

  const getReport = () => {
    makeReport("certificates", columns.slice(0, columns.length - 1), tableData);
  };

  return (
    <div>
      <h1>Зарегистрированные сертификаты</h1>
      {edit ? (
        <EditableTable
          columns={columns}
          data={tableData}
          updateMyData={onUpdate}
        />
      ) : (
        <Table columns={columns} data={tableData} />
      )}
      <div>
        <button className="reportButton" onClick={() => setEdit(!edit)}>
          {edit ? "Сохранить" : "Редактировать"}
        </button>
        <button className="reportButton" onClick={getReport}>
          Экспорт в .xlsx
        </button>
      </div>
    </div>
  );
}

export default AllCertificates;
