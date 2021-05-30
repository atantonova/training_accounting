import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../util/Table";
import authHeader from "../../service/AuthHeader";
import makeReport from "../util/Report";

const OCCUPATION_URL = "http://localhost:8080/api/occupation/";

function Occupations() {
  const [occupations, setOccupations] = useState([]);
  useEffect(() => {
    const getOccupations = async () => {
      const result = await axios.get(OCCUPATION_URL, {
        headers: authHeader(),
      });

      setOccupations(result.data);
    };

    getOccupations();
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
      Header: "Список необходимых сертификатов",
      accessor: "requiredCertificates",
    },
    {
      Header: "Удалить",
      accessor: "deleteButton",
    },
  ];

  const deleteRow = (id) => {
    console.log(id);
    axios.delete(OCCUPATION_URL + id, { headers: authHeader() }).then(
      (response) => console.log("delete success"),
      (error) => console.log("error")
    );
    setOccupations(occupations.filter((o) => o.id !== id));
  };
  let tableData = occupations.map((o) => {
    let certNames = o.requiredCertificates.map((c) => c.name);
    return {
      name: o.name,
      descr: o.description,
      requiredCertificates: certNames.join(", "),
      deleteButton: (
        <button
          className="buttonDelete"
          key={o.name}
          onClick={() => deleteRow(o.id)}
        >
          &times;
        </button>
      ),
    };
  });

  const getReport = () => {
    makeReport("occupations", columns.slice(0, columns.length - 1), tableData);
  };

  return (
    <div>
      <h2>Зарегистрированные должности</h2>
      <Table columns={columns} data={tableData} />
      <button className="reportButton" onClick={getReport}>
        Экспорт в .xlsx
      </button>
    </div>
  );
}
export default Occupations;
