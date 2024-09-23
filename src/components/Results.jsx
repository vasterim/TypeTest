import React from "react";

const Results = ({ correctWords, incorrectWords }) => {
  const totalWords = correctWords + incorrectWords;

  return (
    <div className="mt-4 text-center">
      <h2 className="text-2xl font-bold">Test Bitti!</h2>
      <p className="text-lg">Doğru Kelimeler: {correctWords}</p>
      <p className="text-lg">Yanlış Kelimeler: {incorrectWords}</p>
      <p className="text-lg">Toplam Kelimeler: {totalWords}</p>
      <p className="text-lg">
        WPM: {(correctWords / 1).toFixed(2)}
      </p>
    </div>
  );
};

export default Results;
