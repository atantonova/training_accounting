import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../util/Table";
import authHeader from "../../service/AuthHeader";
import makeReport from "../util/Report";

const USERS_URL = "http://localhost:8080/api/usr/";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const result = await axios.get(USERS_URL, {
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
      Header: "Логин в системе",
      accessor: "username",
    },
    {
      Header: "E-mail",
      accessor: "emailAddress",
    },
    {
      Header: "Номер телефона",
      accessor: "phoneNumber",
    },
    {
      Header: "Дата начала работы",
      accessor: "dateStartWorking",
    },
    {
      Header: "Удалить",
      accessor: "deleteButton",
    },
  ];

  const deleteRow = (id) => {
    console.log(id);
    axios.delete(USERS_URL + id, { headers: authHeader() }).then(
      (response) => {
        console.log("delete success");
        setUsers(users.filter((o) => o.id !== id));
      },
      (error) => console.log("error")
    );
  };

  let tableData = users.map((u) => {
    return {
      lastName: u.lastName,
      firstName: u.firstName,
      middleName: u.middleName,
      occupationName: u.occupation !== null ? u.occupation.name : "",
      supervisorName: u.supervisor !== null ? u.supervisor.fullName : "",
      username: u.username,
      emailAddress: u.emailAddress,
      phoneNumber: u.phoneNumber,
      dateStartWorking: u.dateStartWorking,
      deleteButton: (
        <button
          className="buttonDelete"
          key={u.name}
          onClick={() => deleteRow(u.id)}
        >
          &times;
        </button>
      ),
    };
  });

  const getReport = () => {
    makeReport("users", columns.slice(0, columns.length - 1), tableData);
  };

  return (
    <div>
      <h2>Зарегистрированные пользователи</h2>
      <Table columns={columns} data={tableData} />
      <button className="reportButton" onClick={getReport}>
        Экспорт в .xlsx
      </button>
    </div>
  );
}
export default Users;
