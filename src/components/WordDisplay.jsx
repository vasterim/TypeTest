import React from "react";

const WordDisplay = ({ words, currentWordIndex, correctWords, incorrectWords }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4 h-32 overflow-hidden">
      <div className="flex flex-wrap">
        {words.map((word, index) => (
          <span
            key={index}
            className={`text-lg mx-1 ${
              index === currentWordIndex
                ? "text-black bg-gray-300" 
                : correctWords.includes(index)
                ? "text-green-500" 
                : incorrectWords.includes(index)
                ? "text-red-500" 
                : "text-gray-500" 
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordDisplay;
