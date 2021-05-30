import React from "react";

import "./SideDrawer.css";

class SideDrawer extends React.Component {
  render() {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    let headers = Object.keys(this.props.menu);
    return (
      <nav className={drawerClasses}>
        {headers.map((header) => {
          return (
            <ul key={header}>
              <li className="headerMenuItem">{header}</li>
              {Object.keys(this.props.menu[header]).map((name) => {
                return (
                  <li key={name} className="menuItem">
                    <a href={this.props.menu[header][name]}>{name}</a>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </nav>
    );
  }
}

export default SideDrawer;
