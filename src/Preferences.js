import React from 'react';
import { useUser } from './UserContext';
import './Preferences.css';
import { FaCheck, FaBusinessTime, FaHeart, FaGlobe, FaFilm, FaFootballBall, FaLaptop, FaAtom } from 'react-icons/fa'; // Import icons

const Preferences = ({ onClose }) => {
  const { preferences, setPreferences } = useUser();

  const toggleTopic = (topic) => {
    setPreferences((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const allTopics = [
    { name: 'SCIENCE', icon: <FaAtom /> },
    { name: 'TECHNOLOGY', icon: <FaLaptop /> },
    { name: 'HEALTH', icon: <FaHeart /> },
    { name: 'WORLD', icon: <FaGlobe /> },
    { name: 'ENTERTAINMENT', icon: <FaFilm /> },
    { name: 'SPORTS', icon: <FaFootballBall /> },
    { name: 'BUSINESS', icon: <FaBusinessTime /> },
    { name: 'NATION', icon: <FaGlobe /> }, // Reusing FaGlobe for NATION
  ];

  return (
    <div className="preferences-overlay">
      <div className="preferences">
        <button onClick={onClose} className="close-button">×</button>
        <h2>Preferences</h2>
        <h3>Select news categories to fine-tune your feed:</h3>
        <div className="topic-buttons">
          {allTopics.map(({ name, icon }) => (
            <button
              key={name}
              className={`topic-button ${preferences.topics.includes(name) ? 'active' : ''}`}
              onClick={() => toggleTopic(name)}
            >
              {preferences.topics.includes(name) ? <FaCheck /> : icon} {/* Show checkmark if selected, otherwise topic icon */}
              <span className="topic-name">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
