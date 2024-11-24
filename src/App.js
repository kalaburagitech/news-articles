import React, { useState, useEffect } from 'react';
import {
  countSyllables,
  countWords,
  countSentences,
  computeFleschIndex,
  classifyArticleReadability,
} from './utils';
import Navigation from './Navigation';
import Search from './Search';
import ArticleCard from './ArticleCard';
import FullArticle from './FullArticle';
import Preferences from './Preferences';
import './App.css';
import { UserProvider, useUser } from './UserContext';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const { preferences } = useUser();
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/news_articles.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data);
        //  initial filtering based on preferences
        applyFilters(data, preferences.topics);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  //  filters whenever preferences change
  useEffect(() => {
    applyFilters(articles, preferences.topics);
  }, [preferences.topics, articles]);

  const applyFilters = (allArticles, selectedTopics) => {
    if (!Array.isArray(allArticles)) return;
    
    let filtered = allArticles;
    
    // Filter by selected topics if any are selected
    if (selectedTopics && selectedTopics.length > 0) {
      filtered = allArticles.filter(article => 
        // Ensure case-sensitive exact match
        selectedTopics.includes(article.topic)
      );
    }

    setFilteredArticles(filtered);
  };

  const handleSearch = (level) => {
    if (!Array.isArray(articles)) return;
    
    let filtered = articles;
    
    // First filter by selected topics
    if (preferences.topics && preferences.topics.length > 0) {
      filtered = filtered.filter(article => 
        preferences.topics.includes(article.topic)
      );
    }

    // Then filter by grade level if not default
    if (level !== 'default') {
      filtered = filtered.filter((article) => {
        const syllables = countSyllables(article.content);
        const words = countWords(article.content);
        const sentences = countSentences(article.content);
        const fleschIndex = computeFleschIndex(syllables, words, sentences);
        const grade = classifyArticleReadability(fleschIndex);
        return grade === level;
      });
    }

    setFilteredArticles(filtered);
  };

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
  };

  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  return (
    <div className="app-container">
      <Navigation onPreferencesClick={togglePreferences} />
      <Search onSearch={handleSearch} />
      <div className="article-container">
        {selectedArticle ? (
          <FullArticle article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onSelect={handleArticleSelect} />
          ))
        ) : (
          <p>No articles found matching the selected criteria.</p>
        )}
      </div>
      {showPreferences && <Preferences onClose={togglePreferences} />}
    </div>
  );
};

const AppWrapper = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWrapper;