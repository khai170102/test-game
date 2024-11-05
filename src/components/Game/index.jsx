import { useEffect, useRef, useState } from "react";

import { generateSquares, clearAllIntervals } from "./utils";

import Square from "./Square";
import Header from "./header";

const Board = () => {
  const containerRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [points, setPoints] = useState(1);
  const [nextValue, setNextValue] = useState(1);
  const [time, setTime] = useState(0);
  const [squares, setSquares] = useState([]);
  const [statePlay, setStatePlay] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayNextSquare(nextValue);
    }
  }, [nextValue, isAutoPlay]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const handlePointsChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 || e.target.value === "") {
      setPoints(value);
    }
  };

  const handleClickPlay = () => {
    clearAllIntervals();
    setIsAutoPlay(false);
    setIsSuccess(false);
    setIsOver(false);
    setTime(0);
    setStatePlay(true);
    setSquares([]);
    setNextValue(1);

    const newSquares = generateSquares(points, containerRef);
    setSquares(newSquares);

    const newIntervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 100);
    }, 100);
    setIntervalId(newIntervalId);
  };

  const handleSquareClick = (index) => {
    if (isOver || isSuccess) {
      return;
    }

    const square = squares[index];
    const isCorrect = square.value === nextValue;

    if (isCorrect) {
      handleCorrectClick(square, index);
    } else {
      handleWrongClick(index);
    }
  };

  const handleCorrectClick = (square, index) => {
    setSquares((prevSquares) => {
      const updatedSquares = prevSquares.map((s, i) =>
        i === index ? { ...s, clicked: true, disappearTime: 2900 } : s
      );

      const countdownInterval = setInterval(() => {
        setSquares((prevSquares) =>
          prevSquares.map((s, i) => {
            if (i === index && s.disappearTime > 0) {
              return { ...s, disappearTime: s.disappearTime - 100 };
            }
            return s;
          })
        );
      }, 100);

      updatedSquares[index].countdownInterval = countdownInterval;

      setTimeout(() => {
        clearInterval(countdownInterval);
        setSquares((prevSquares) =>
          prevSquares.map((s, i) =>
            i === index ? { ...s, clicked: true, disappearTime: 0 } : s
          )
        );
        if (nextValue === Number(points)) {
          clearInterval(intervalId);
          setIsSuccess(true);
        }
      }, 2900);

      return updatedSquares;
    });

    setNextValue((prevValue) => prevValue + 1);
  };

  const handleWrongClick = (index) => {
    clearInterval(intervalId);
    setSquares((prevSquares) =>
      prevSquares.map((s, i) => (i === index ? { ...s, clicked: true } : s))
    );
    clearAllIntervals();
    setIsOver(true);
  };

  const autoPlayNextSquare = (currentIndex) => {
    if (!isAutoPlay || isOver || isSuccess || currentIndex > points) return;

    const squareIndex = squares.findIndex((sq) => sq.value === currentIndex);

    if (squareIndex !== -1) {
      setTimeout(() => {
        handleSquareClick(squareIndex);
      }, 1000);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };
  return (
    <div className="flex flex-col h-screen font-sans ">
      <Header
        isOver={isOver}
        isSuccess={isSuccess}
        time={time}
        points={points}
        handlePointsChange={handlePointsChange}
        handleClickPlay={handleClickPlay}
        statePlay={statePlay}
        toggleAutoPlay={toggleAutoPlay}
        isAutoPlay={isAutoPlay}
      />

      <div
        className="w-full h-[70%] border-2 border-black relative"
        ref={containerRef}
      >
        {squares.map((square, index) => (
          <Square
            key={index}
            square={square}
            index={index}
            handleSquareClick={handleSquareClick}
          />
        ))}
      </div>
      {nextValue < points && !isOver && <span>Next: {nextValue}</span>}
    </div>
  );
};

export default Board;
