'use client'

import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [gradeLevel, setGradeLevel] = useState('default');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(gradeLevel);
  };

  const handleChange = (e) => {
    const newLevel = e.target.value;
    setGradeLevel(newLevel);
    onSearch(newLevel); // Trigger search on change
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <select
        className="search-select"
        value={gradeLevel}
        onChange={handleChange}
      >
        <option value="default">Select an option</option>
        <option value="5th grade">5th grade</option>
        <option value="6th grade">6th grade</option>
        <option value="7th grade">7th grade</option>
        <option value="8th to 9th grade">8th to 9th grade</option>
        <option value="10th to 12th grade">10th to 12th grade</option>
        <option value="College">College</option>
        <option value="College graduate">College graduate</option>
      </select>
      <button type="submit" className="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

export default Search;