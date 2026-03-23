/**
 * Calculation for estimated read time based on word count.
 * @param text The string to analyze.
 * @returns A string representing the estimated minutes (e.g., "5 min read").
 */
export const getReadTime = (text: string): string => {
  // Page ka reading time calculate karne ke liye
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 5; // Multiplied by 5 as per existing logic in components
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};
