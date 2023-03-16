import React from "react";

interface Props {
  text: string;
}

const ReadingTime = ({ text }: Props) => {
  // Calculate the reading time based on a typical reading speed of 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/g).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  // Format the reading time as a string
  const readingTimeText =
    readingTimeMinutes === 1
      ? "      (1 minute read)"
      : `      (${readingTimeMinutes} minute read)`;

  // Render the reading time as a span element
  return <span>{readingTimeText}</span>;
};

export default ReadingTime;
