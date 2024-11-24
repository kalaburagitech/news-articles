import React from 'react';
import './Navigation.css';

const Navigation = ({ onPreferencesClick }) => {
  return (
    <nav className="navigation">
      <div className="logo">
        <span className="logo-article">Article</span>
        <span className="logo-search">Search</span>
      </div>
      <button className="preferences-button" onClick={onPreferencesClick}>
        Preferences
      </button>
    </nav>
  );
};

export default Navigation;