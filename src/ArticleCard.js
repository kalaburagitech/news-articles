import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ article, onSelect }) => {
  return (
    <div className="article-card" onClick={() => onSelect(article)}>
      <img 
        className="article-image" 
        src={article.large_image_url}
        alt={article.title || "Article Image"} 
        onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} 
      />
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <div className="article-info">
          <p className="article-topic">{article.topic}</p>
          <p className="article-date">
            {new Date(article.published_date).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
          <p className="article-domain">{article.domain}</p>
        </div>
        <p className="article-preview">
          {article.content.substring(0, 100)}...
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;