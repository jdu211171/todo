import React from 'react';
import './ErrorPagebtn.css'

interface Props {}

const Button: React.FC<Props> = () => {
  return (
    <div className="container">
      <a href="#" className="button">
        <div className="button__line"></div>
        <div className="button__line"></div>
        <span className="button__text">Return to home page</span>
        <div className="button__drow1"></div>
        <div className="button__drow2"></div>
      </a>
    </div>
  );
};

export default Button;
