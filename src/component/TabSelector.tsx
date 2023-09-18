// TabSelector.jsx

import React from "react";
import "./CSS/Manage.css";

export const TabSelector = ({ isActive, children, onClick }) => (
  <button
    className={`tabSelectorButton ${
      isActive ? "active" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
