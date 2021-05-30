import React from "react";

import "./Toolbar.css";
import DrawerToggleButton from "../sidedrawer/DrawerToggleButton";

const toolbar = (props) => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="toolbar__logo">
        <h3>{props.company}</h3>
      </div>
      <div className="spacer" />
      <div className="toolbar__navigation-items">
        <ul>
          <li>
            <a href="/" onClick={props.logout}>
              Выход
            </a>
          </li>
          <li>
            <a href="/profile">Профиль</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
