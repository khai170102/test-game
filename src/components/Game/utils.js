export const generateSquares = (points, containerRef) => {
  const newSquares = Array.from({ length: points }, (_, index) => ({
    value: index + 1,
    clicked: false,
    disappearTime: null,
    position: { top: 0, left: 0 },
    zIndex: points - index,
  }));

  const shuffledSquares = newSquares.sort(() => Math.random() - 0.5);
  const containerWidth = containerRef.current.clientWidth;
  const containerHeight = containerRef.current.clientHeight;
  const squareSize = 56;
  const positions = new Set();

  shuffledSquares.forEach((square) => {
    let pos;
    do {
      pos = {
        top: Math.min(
          Math.floor(Math.random() * containerHeight),
          containerHeight - squareSize
        ),
        left: Math.min(
          Math.floor(Math.random() * containerWidth),
          containerWidth - squareSize
        ),
      };
    } while (positions.has(JSON.stringify(pos)));
    positions.add(JSON.stringify(pos));
    square.position = pos;
  });

  return shuffledSquares;
};

export const clearAllIntervals = () => {
  const intervalId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
  for (let i = 1; i < intervalId; i++) {
    window.clearInterval(i);
  }
};
