import React, { useMemo } from 'react';
import './FullArticle.css';

const FullArticle = ({ article, onClose }) => {
  const calculateStats = (text) => {
    const words = text.match(/\b\w+\b/g) || [];
    const sentences = text.match(/[.!?;:]+/g) || [];
    const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const syllableCount = syllables;

    const fleschIndex = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount);
    const gradeLevel = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59;

    return { wordCount, sentenceCount, syllableCount, fleschIndex, gradeLevel };
  };

  const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); // remove silent 'e' and similar
    word = word.replace(/^y/, ''); // remove starting 'y'
    const syllables = word.match(/[aeiouy]{1,2}/g); // count vowel groups as syllables
    return syllables ? syllables.length : 1;
  };

  const { wordCount, sentenceCount, syllableCount, fleschIndex, gradeLevel } = useMemo(() => calculateStats(article.content), [article.content]);

  return (
    <div className="full-article-overlay">
      <div className="full-article">
        <button onClick={onClose} className="close-button">×</button>
        <img src={article.large_image_url} alt={article.title} className="full-article-image" />
        <div className="article-metadata">
          <h1>{article.title}</h1>
          <p>Topic: {article.topic}</p>
          <p>Domain: {article.domain}</p>
          <p>Published Date: {new Date(article.published_date).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}</p>
        </div>
        {/* <p>Flesch Index: {fleschIndex.toFixed(2)}</p> */}
        <p className="full-article-content">{article.content}</p>
        <div className="article-stats">
          <div className="stat">
            <p>Word Count</p>
            <p>{wordCount}</p>
          </div>
          <div className="stat">
            <p>Sentence Count</p>
            <p>{sentenceCount}</p>
          </div>
          <div className="stat">
            <p>Syllable Count</p>
            <p>{syllableCount}</p>
          </div>
          <div className="stat">
            <p>Flesch Index</p>
            <p>{fleschIndex.toFixed(2)}</p>
          </div>
          <div className="stat">
            <p>Grade Level</p>
            <p>{gradeLevel.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullArticle;
