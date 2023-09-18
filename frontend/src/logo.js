import React from "react";
import "./logo.css"; 



function Logo() {
  return (
    <div className="chonky-logo">
      <span className="letter" style={{ transform: "rotate(-5deg)" }}>
        C
      </span>
      <span className="letter" style={{ transform: "rotate(5deg)" }}>
        h
      </span>
      <span className="letter" style={{ transform: "rotate(-5deg)" }}>
        o
      </span>
      <span className="letter" style={{ transform: "rotate(5deg)" }}>
        n
      </span>
      <span className="letter" style={{ transform: "rotate(-5deg)" }}>
        k
      </span>
      <span className="letter" style={{ transform: "rotate(5deg)" }}>
        y
      </span>
    </div>
  );
}

export default Logo;
