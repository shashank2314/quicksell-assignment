import React, { useState } from "react";
import DisplayLogo from "../assets/Display.svg"
import DownLogo from "../assets/down.svg"

const Navbar = ({ groupBy, orderBy, onGroupByChange, onOrderByChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" NavContainer">
      <div className="NavDisTab" onClick={()=>{setOpen(!open)}}>
        <img src={DisplayLogo} alt="displayLogo"/>
        <div>Display</div>
        <img src={DownLogo} alt="DownLogo"/>
      </div>
      {open && (
        <div className="NavAbsolute">
          <div className="NavAbsolute1">
            <div>Grouping</div>
            <div>
              <select className="selectCustom" value={groupBy} onChange={(e) => {onGroupByChange(e.target.value); setOpen(false)}}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
          <div className="NavAbsolute1">
            <div>Ordering</div>
            <div>
              <select className="selectCustom" value={orderBy} onChange={(e) => {onOrderByChange(e.target.value); setOpen(false)}}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
