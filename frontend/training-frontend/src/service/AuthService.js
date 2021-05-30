import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/auth/";
const ROLES_URL = "http://localhost:8080/api/getauthority/";

async function getRoles() {
  return await axios
    .get(ROLES_URL, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
}

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          localStorage.setItem("roles", []);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("roles");
  }

  register(
    username,
    emailAddress,
    password,
    firstName,
    lastName,
    middleName,
    supervisorUsername,
    dateStartWorking,
    phoneNumber,
    occupation
  ) {
    return axios.post(API_URL + "signup", {
      username: username,
      emailAddress: emailAddress,
      password: password,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      supervisorUsername: supervisorUsername,
      dateStartWorking: dateStartWorking,
      phoneNumber: phoneNumber,
      occupation: occupation,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  getCurrentUserRoles() {
    if (
      localStorage.getItem("roles") === null ||
      localStorage.getItem("roles").length === 0
    ) {
      getRoles().then((data) => localStorage.setItem("roles", data));
    }
    return localStorage.getItem("roles");
  }
}

export default new AuthService();
