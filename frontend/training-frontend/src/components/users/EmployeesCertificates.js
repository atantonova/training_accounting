import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../util/Table";
import authHeader from "../../service/AuthHeader";
import convertTimestampToDate from "../util/DateTime";

import "../certowns/AllUserCertificates.css";

const EMP_CERT_OWN_URL = "http://localhost:8080/api/cert_own/employees/";

function EmployeesCertifiactes() {
  const [certificates, setCertificates] = useState({ certificates: [] });

  useEffect(() => {
    const getCertificates = async () => {
      const result = await axios.get(EMP_CERT_OWN_URL, {
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
          moreButton: <a href={"cert/" + cert_own.id}>Подробнее</a>,
        };
      })
    : [];

  return (
    <div>
      <h1>Сертификаты подчиненных</h1>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default EmployeesCertifiactes;
