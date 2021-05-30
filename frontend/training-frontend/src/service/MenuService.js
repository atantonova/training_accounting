import AuthService from "./AuthService";
import authHeader from "./AuthHeader";
import axios from "axios";

function getMenu() {
  let userMenu = { Профиль: menu["Профиль"] };

  let roles = AuthService.getCurrentUserRoles();

  if (roles.includes("ADMIN")) {
    userMenu["Администратор"] = menu["Администратор"];
  }

  if (roles.includes("SUPERVISOR")) {
    userMenu["Сотрудники"] = menu["Сотрудники"];
  }
  return userMenu;
}

const menu = {
  Профиль: {
    "Мои сертификаты": "/cert/self",
    Уведомления: "/notifications",
    Календарь: "/calendar",
  },
  Настройки: {
    Общие: "/settings",
    "Информация о сайте": "/info",
    "Отправить отчет об ошибке": "/report",
  },
  Сотрудники: {
    "Список подчиненных": "/employees",
    "Сертификаты подчиненных": "/employees/cert",
  },
  Администратор: {
    Должности: "/occupation",
    Пользователи: "/users",
    Сертификаты: "/cert",
    "Добавить пользователя": "/register",
    "Добавить должность": "/occupation/add",
    "Добавить сертификат": "/cert/add",
  },
};

export default getMenu;
