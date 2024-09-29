// src/components/Navigation.js
import './Navigation.scss';
import React from 'react';

const Navigation = () => {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
