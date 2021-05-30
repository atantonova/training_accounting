import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../service/AuthService";
import authHeader from "../../service/AuthHeader";
import convertTimestampToDate from "../util/DateTime";
import Table from "../util/Table";

const GROUP_URL = "http://localhost:8080/api/groups/";

function Calendar() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      let currentUserId = AuthService.getCurrentUser().id;
      const result = await axios.get(GROUP_URL + currentUserId, {
        headers: authHeader(),
      });
      setGroups(result.data);
    };

    getGroups();
  }, []);

  const columns = [
    {
      Header: "Сертификат",
      accessor: "certificateName",
    },
    {
      Header: "Начало обучения",
      accessor: "dateStart",
    },
    {
      Header: "Длительность обучения",
      accessor: "daysLong",
    },
    {
      Header: "Номер группы",
      accessor: "groupNumber",
    },
  ];

  const tableData = groups.map((g) => ({
    certificateName: g.certificate !== null ? g.certificate.name : "",
    dateStart: convertTimestampToDate(g.dateStart),
    daysLong: g.daysLong,
    groupNumber: g.id,
  }));

  return (
    <div>
      <h2>Предстоящие обучения, сроки и номера групп</h2>
      <Table data={tableData} columns={columns} />
    </div>
  );
}

export default Calendar;
