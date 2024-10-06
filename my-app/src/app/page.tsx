"use client";
import { useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [isStart, setStart] = useState(false);
  const [isGuess, setGuess] = useState(false);
  const [isHint, setHint] = useState(false);
  const [input, setInput] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [hintMessage, setHintMessage] = useState("");
  const [win, setWin] = useState(false); // State to track if the user won


  const startHandler = () => {
    setStart(true);
    setInput("");
    setGuess(false);
    setHint(false);
    setRandomNumber(Math.floor(Math.random() * 10) + 1); // Generate new random number when starting
    setWin(false); // Reset win state when starting a new game
  };

  const playAgainHandler = () => {
    setGuess(false);
    setHint(false);
    setInput("");
    setRandomNumber(Math.floor(Math.random() * 10) + 1); // Generate new random number for the next round
    setWin(false); // Reset win state when playing again
  };

  const getHintHandler = () => {
    setHint(true);
    if (randomNumber <= 4) {
      setHintMessage("Computer guessing number is between 1 to 4");
    } else if (randomNumber <= 7) {
      setHintMessage("Computer guessing number is between 4 to 7");
    } else {
      setHintMessage("Computer guessing number is between 8 to 10");
    }
  };

  const guessHandler = () => {
    setGuess(!isGuess);
    setHint(false);
    if (parseInt(input) === randomNumber) {
      setWin(true); // Set win state if the guess is correct
      setTimeout(() => setWin(false), 6000); // Reset win state after 6 seconds
    }
  };

  return (
    <main className="flex flex-col justify-start items-center mx-auto mw-full mt-8 py-14 bg-gray-300 w-96 h-full rounded-lg gap-3">
       {win && <Confetti />} {/* Show confetti when the user wins */}
      <h1 className="text-black text-2xl font-bold">Number Guessing Game</h1>
      {isHint ? (
        <p className="text-gray-500">{hintMessage}</p>
      ) : (
        <p className="text-gray-700 ">Guess the number between 1 to 10</p>
      )}
      <button
        onClick={startHandler}
        className="bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-700"
      >
        Start Game
      </button>

      {isStart && (
        <div className="flex flex-col gap-1 items-center justify-center">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter your guess"
            className="w-[200px] py-2 px-4 rounded-lg outline-none border focus:border-blue-600 text-black"
          />
          <div className="flex gap-4 justify-center items-center mt-6">
            <button
              onClick={guessHandler}
              className="bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-700"
            >
              Guess
            </button>
            <button
              onClick={getHintHandler}
              className="bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-700"
            >
              Get Hint
            </button>
          </div>

          {isGuess && (
            <div className="flex flex-col items-center justify-center">
              {input ? (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-700 text-center text-sm px-6">
                    Your Guess number is {input} and computer random number is{" "}
                    {randomNumber}
                  </p>
                  <p
                    className={`${
                      parseInt(input) === randomNumber ? "text-green-600" : "text-red-600"
                    } text-center mt-3 font-semibold`}
                  >
                    {parseInt(input) === randomNumber
                      ? " YOU WON THE GAME 🥳"
                      : "YOU LOST THE GAME 😞"}
                  </p>
                </div>
              ) : (
                <p className="text-red-600">Enter your guess number</p>
              )}
              <button
                onClick={playAgainHandler}
                className="bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-700 mt-3"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
