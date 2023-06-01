import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box" >
      <div className="box" style={{height:"auto",width:"60%"}}>
        <span className="close-icon" onClick={props.handleClose} >x</span>
        <div style={{marginLeft:"150px"}}>
        {props.content}

        </div>
      </div>
    </div>
  );
};
 
export default Popup;