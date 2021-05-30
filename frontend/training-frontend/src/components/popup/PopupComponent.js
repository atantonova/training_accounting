import React, { useState, useEffect } from "react";
import TriggerButton from "./TriggerButton";

// props -- parent component with onModalSubmit(passedData)
//          nested component
function PopupComponent(props) {
  // const {parent, nested } = props;
  const [isShown, setShown] = useState(false);

  showModal = () => {
    this.setShown(true);
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setShown(false);
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };

  return (
    <React.Fragment>
      <TriggerButton triggerText={this.props.triggerText} />
      {this.state.isShown ? <Modal /> : null}
    </React.Fragment>
  );
}
