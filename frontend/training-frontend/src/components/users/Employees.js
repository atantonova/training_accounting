import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../util/Table";
import authHeader from "../../service/AuthHeader";
import makeReport from "../util/Report";

const USERS_URL = "http://localhost:8080/api/usr/";

function Employees() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const result = await axios.get(USERS_URL + "employees", {
        headers: authHeader(),
      });

      setUsers(result.data);
    };

    getUsers();
  }, []);

  let columns = [
    {
      Header: "Фамилия",
      accessor: "lastName",
    },
    {
      Header: "Имя",
      accessor: "firstName",
    },
    {
      Header: "Отчество",
      accessor: "middleName",
    },
    {
      Header: "Должность",
      accessor: "occupationName",
    },
    {
      Header: "Начальник",
      accessor: "supervisorName",
    },
    {
      Header: "E-mail",
      accessor: "emailAdderss",
    },
    {
      Header: "Номер телефона",
      accessor: "phoneNumber",
    },
    {
      Header: "Дата начала работы",
      accessor: "dateStartWorking",
    },
  ];

  let tableData = users.map((u) => {
    return {
      lastName: u.lastName,
      firstName: u.firstName,
      middleName: u.middleName,
      occupationName: u.occupation !== null ? u.occupation.name : "",
      supervisorName: u.supervisor !== null ? u.supervisor.fullName : "",
      emailAddress: u.emailAddress,
      phoneNumber: u.phoneNumber,
      dateStartWorking: u.dateStartWorking,
    };
  });

  const getReport = () => {
    makeReport("users", columns, tableData);
  };

  return (
    <div>
      <h2>Подчиненные</h2>
      <Table columns={columns} data={tableData} />
      <button className="reportButton" onClick={getReport}>
        Экспорт в .xlsx
      </button>
    </div>
  );
}
export default Employees;
