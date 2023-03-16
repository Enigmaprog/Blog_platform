import React from "react";
import { NextPage } from 'next';

interface IProps {
  text: string;
  maxLength: number;
}

const TextCutter: NextPage<IProps> = ({ text, maxLength }) => {
  if (text.length <= maxLength) {
    return <>{text}</>;
  }

  const cutText = text.slice(0, maxLength);
  const lastSpaceIndex = cutText.lastIndexOf(" ");

  return (
    <>
      {cutText.slice(0, lastSpaceIndex)}
      <span className="font-bold text-[15px] read-more">... read more</span>
    </>
  );
};

export default TextCutter;
