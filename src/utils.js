// src/utils.js

export const countSyllables = (article) => {
  const words = article.split(/\s+/);
  return words.reduce((total, word) => {
      total += word.length <= 3 ? 1 : (word.match(/[aeiou]{1,2}/g) || []).length;
      return total;
  }, 0);
};

export const countWords = (article) => {
  return article.split(/\s+/).filter(word => word.length > 0).length;
};

export const countSentences = (article) => {
  const sentences = article.match(/[^.!?]+[.!?]+/g);
  return sentences ? sentences.length : 0;
};

export const computeFleschIndex = (syllableCount, wordCount, sentenceCount) => {
  return (206.835 - (1.015 * (wordCount / sentenceCount)) - (84.6 * (syllableCount / wordCount))).toFixed(2);
};

export const classifyArticleReadability = (fleschIndex) => {
  if (fleschIndex >= 90) return '5th grade';
  if (fleschIndex >= 80) return '6th grade';
  if (fleschIndex >= 70) return '7th grade';
  if (fleschIndex >= 60) return '8th to 9th grade';
  if (fleschIndex >= 50) return '10th to 12th grade';
  if (fleschIndex >= 30) return 'College';
  return 'College graduate';
};
