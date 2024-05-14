import React from "react";

function Header(){
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light" >
  <div id="nav1">
  <a className="navbar-brand" id="nav" href="#">Image Generator</a>
    </div>
  <div className="collapse navbar-collapse" id="nax2">
    <ul className="navbar-nav">
      <li className="nav-item" id="innernav">
        <a className="nav-link" href="#">Home</a>
      </li>
      <li className="nav-item" id="innernav">
        <a className="nav-link" href="#">Model</a>
      </li>
      <li className="nav-item" id="innernav">
        <a className="nav-link" href="#">About</a>
      </li>
      <li className="nav-item" id="innernav">
        <button className="nav-item contactus" href="#">Contact Us</button>
      </li>
    </ul>
  </div>
</nav>
);
}

export default Header;