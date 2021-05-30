import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../service/AuthHeader";
import Table from "../util/Table";
import convertTimestampToDate from "../util/DateTime";

const CERTIFICATE_URL = "http://localhost:8080/api/cert_own/self/";

function CertExpiring() {
  const [expiring, setExpiring] = useState([]);

  const convertTimestampToActualDate = (timestamp) => {
    var date = new Date(timestamp);
    return date;
  };

  useEffect(() => {
    const getCertificates = async () => {
      const result = await axios.get(CERTIFICATE_URL, {
        headers: authHeader(),
      });
      const allcert = result.data;

      setExpiring(
        allcert.filter((certOwn) => {
          let dateRec = convertTimestampToActualDate(certOwn.dateReceived);
          // console.log(certOwn);
          if (certOwn.certificate !== null) {
            let expiring = new Date(
              dateRec.setMonth(
                dateRec.getMonth() + certOwn.certificate.daysValid
              )
            );
            return expiring < Date.now();
          } else return false;
        })
      );
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
      Header: "Срок истекает",
      accessor: "dateEnd",
    },
  ];

  let data = expiring.map((cert_own) => {
    let end = new Date(cert_own.dateReceived);
    if (cert_own.certificate !== null) {
      end.setMonth(end.getMonth() + cert_own.certificate.daysValid);
    }
    return {
      name: cert_own.certificate === null ? "" : cert_own.certificate.name,
      descr:
        cert_own.certificate === null ? "" : cert_own.certificate.description,
      dateReceived: convertTimestampToDate(cert_own.dateReceived),
      dateEnd: convertTimestampToDate(end),
    };
  });

  return (
    <div>
      <h2>Уведомления об истекающем сроке сертификатов</h2>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default CertExpiring;
