import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../util/Table";
import authHeader from "../../service/AuthHeader";
import convertTimestampToDate from "../util/DateTime";

import "./AllUserCertificates.css";

const CERT_OWN_URL = "http://localhost:8080/api/cert_own/self/";

function AllUserCertifiactes() {
  const [certificates, setCertificates] = useState({ certificates: [] });

  useEffect(() => {
    const getCertificates = async () => {
      const result = await axios.get(CERT_OWN_URL, {
        headers: authHeader(),
      });
      setCertificates({
        certificates: result.data,
      });
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
      accessor: "descr",
    },
    {
      Header: "Дата выдачи",
      accessor: "dateReceived",
    },
    {
      Header: "Владелец",
      accessor: "username",
    },
    {
      Header: "Подробнее",
      accessor: "moreButton",
    },
    {
      Header: "Удалить",
      accessor: "deleteButton",
    },
  ];
  let data = certificates.certificates
    ? certificates.certificates.map((cert_own) => {
        return {
          name: cert_own.certificate === null ? "" : cert_own.certificate.name,
          descr:
            cert_own.certificate === null
              ? ""
              : cert_own.certificate.description,
          dateReceived: convertTimestampToDate(cert_own.dateReceived),
          username: cert_own.owner.username,
          moreButton: <a href={"self/" + cert_own.id}>Подробнее</a>,
          deleteButton: (
            <button
              className="buttonDelete"
              key={cert_own.name}
              onClick={() => deleteRow(cert_own.id)}
            >
              &times;
            </button>
          ),
        };
      })
    : [];

  const deleteRow = (id) => {
    axios.delete(CERT_OWN_URL + id, { headers: authHeader() }).then(
      (response) => {
        console.log("delete success");
        setCertificates({
          certificates: certificates.certificates.filter((c) => c.id !== id),
        });
      },
      (error) => console.log("error")
    );
  };

  return (
    <div>
      <h1>Мои сертификаты</h1>
      <Table columns={columns} data={data} />
      <a className="addButton" href="/cert/self/add">
        Добавить сертификат
      </a>
    </div>
  );
}

export default AllUserCertifiactes;
