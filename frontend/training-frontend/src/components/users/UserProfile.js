import axios from "axios";
import React, { useState, useEffect } from "react";
import authHeader from "../../service/AuthHeader";
import AuthService from "../../service/AuthService";
import "./UserProfile.css";
const USER_API = "http://localhost:8080/api/usr/";

function UserProfile() {
  const [userCurr, setUserCurr] = useState();

  useEffect(() => {
    let currentUserId = AuthService.getCurrentUser().id;
    const getUser = async () => {
      const result = await axios.get(USER_API + currentUserId, {
        headers: authHeader(),
      });
      setUserCurr(result.data);
      console.log(result.data);
    };

    getUser();
  }, []);

  return (
    <div>
      {userCurr ? (
        <div>
          <div className="name">
            {userCurr.lastName +
              " " +
              userCurr.firstName +
              " " +
              userCurr.middleName}
          </div>
          <div className="company">
            Компания: {userCurr.comapny !== null ? userCurr.company.name : ""}
          </div>
          <div className="occupation">
            Должность:{" "}
            {userCurr.occupation !== null ? userCurr.occupation.name : ""}
          </div>
          <div className="info">Имя пользователя: {userCurr.username}</div>
          <div className="info">E-mail: {userCurr.emailAddress}</div>
          <div className="info">Телефон: {userCurr.phoneNumber}</div>
          {/* <EditProfile user={this.state.user} /> */}
        </div>
      ) : (
        <div>Страница недоступна</div>
      )}
    </div>
  );
}

export default UserProfile;
