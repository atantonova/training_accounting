import React from "react";
import Toolbar from "./components/toolbar/Toolbar";
import SideDrawer from "./components/sidedrawer/SideDrawer";
import Backdrop from "./components/backdrop/Backdrop";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AllUserCertificates from "./components/certowns/AllUserCertificates";
import AllCertificates from "./components/certificates/AllCertificates";
import getMenu from "./service/MenuService";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import AuthService from "./service/AuthService";
import UserProfile from "./components/users/UserProfile";
import Occupations from "./components/occupation/Occupations";
import Certificate from "./components/certowns/Certificate";
import AddCertificateOwning from "./components/certowns/AddCertificateOwning";
import "./App.css";
import AddOccupation from "./components/occupation/AddOccupation";
import AddCertificate from "./components/certificates/AddCertificate";
import CertExpiring from "./components/notifications/CertExpiring";
import Users from "./components/users/Users";
import Calendar from "./components/notifications/Calendar";
import Employees from "./components/users/Employees";
import EmployeesCertifiactes from "./components/users/EmployeesCertificates";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      sideDrawerOpen: false,
      company: "",
      error: false,
    };
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: null,
    });
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ error: true });
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        company: user.company,
      });
    }
  }

  drawerClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
          <main style={{ marginTop: "64px" }}>
            {this.state.currentUser && !this.state.error ? (
              <div className="navbar-nav ml-auto">
                <Toolbar
                  drawerClickHandler={this.drawerClickHandler}
                  logout={this.logOut}
                  company={this.state.company}
                />
                <SideDrawer show={this.state.sideDrawerOpen} menu={getMenu()} />
                {backdrop}
              </div>
            ) : (
              <div className="nav-link-wrapper">
                <Link
                  to={"/login"}
                  className="nav-link"
                  onClick={() => {
                    this.setState({ error: false });
                  }}
                >
                  Вход в систему
                </Link>
              </div>
            )}
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/users" component={Users} />
              <Route path="/cert/add" component={AddCertificate} />
              <Route path="/cert/self/add" component={AddCertificateOwning} />
              <Route path="/cert/self/:id" component={Certificate} />
              <Route path="/cert/self" component={AllUserCertificates} />
              <Route path="/cert" component={AllCertificates} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/occupation/add" component={AddOccupation} />
              <Route path="/occupation" component={Occupations} />
              <Route path="/notifications" component={CertExpiring} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/employees/cert/:id" component={Certificate} />
              <Route path="/employees/cert" component={EmployeesCertifiactes} />
              <Route path="/employees" component={Employees} />
              <Route path="/" />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
