import React, { useState, useEffect, useRef } from "react";
import WordDisplay from "./components/WordDisplay";
import TypingInput from "./components/TypingInput";
import Results from "./components/Results";

const WORDS_PER_CARD = 40;

const App = () => {
  const [words, setWords] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [totalCorrectWords, setTotalCorrectWords] = useState(0);
  const [totalIncorrectWords, setTotalIncorrectWords] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/data/words.json')
      .then(response => response.json())
      .then(data => setWords(data.words))
      .catch(error => console.error("Kelime verisi yüklenemedi:", error));
  }, []);

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setStarted(false);
    }
  }, [started, timeLeft]);

  const getWordsForCurrentCard = () => {
    const startIndex = currentCard * WORDS_PER_CARD;
    const endIndex = startIndex + WORDS_PER_CARD;
    return words.slice(startIndex, endIndex);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputText(value);

    if (value.endsWith(" ")) {
      const currentWord = value.trim();
      const currentCardWords = getWordsForCurrentCard();

      if (currentWord === currentCardWords[currentWordIndex]) {
        setCorrectWords((prev) => [...prev, currentWordIndex]);
        setTotalCorrectWords((prev) => prev + 1);
      } else {
        setIncorrectWords((prev) => [...prev, currentWordIndex]);
        setTotalIncorrectWords((prev) => prev + 1);
      }
      setCurrentWordIndex((prev) => prev + 1);

      if (currentWordIndex + 1 === currentCardWords.length) {
        setCurrentCard((prev) => prev + 1);
        setCurrentWordIndex(0);
        setCorrectWords([]);
        setIncorrectWords([]);
      }

      setInputText("");
    }
  };

  const handleStart = () => {
    setStarted(true);
    setTimeLeft(60);
    setCurrentWordIndex(0);
    setCurrentCard(0);
    setCorrectWords([]);
    setIncorrectWords([]);
    setTotalCorrectWords(0);
    setTotalIncorrectWords(0);
    setInputText("");
    inputRef.current.focus();
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">KLAVYE HIZ TESTİ</h1>

        <WordDisplay
          words={getWordsForCurrentCard()}
          currentWordIndex={currentWordIndex}
          correctWords={correctWords}
          incorrectWords={incorrectWords}
        />

        <TypingInput
          inputText={inputText}
          handleInputChange={handleInputChange}
          disabled={!started || timeLeft === 0}
        />

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {started ? "Yeniden Dene" : "Başla"}
          </button>
          <span className="text-xl">{timeLeft}s</span>
        </div>

        {!started && timeLeft === 0 && (
          <Results 
            correctWords={totalCorrectWords}
            incorrectWords={totalIncorrectWords}
          />
        )}
      </div>
    </div>
  );
};

export default App;
