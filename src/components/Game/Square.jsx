import PropTypes from "prop-types";

const Square = ({ square, index, handleSquareClick }) => {
  return (
    <div
      className={`absolute w-14 h-14 rounded-full border-2 border-[#D96A41] flex flex-col items-center justify-center cursor-pointer ${
        square.clicked ? "bg-[#D96A41]" : "bg-white"
      }`}
      style={{
        top: square.position.top,
        left: square.position.left,
        zIndex: square.zIndex,
        opacity: square.clicked
          ? square.disappearTime > 0
            ? square.disappearTime / 2900
            : 1
          : 1,
        transition: "opacity 0.5s ease",
        display: square.disappearTime === 0 ? "none" : "",
      }}
      onClick={() => handleSquareClick(index)}
    >
      <p className="">{square.value}</p>
      {square.disappearTime > 0 && (
        <p className="text-white">{(square.disappearTime / 1000).toFixed(1)}</p>
      )}
    </div>
  );
};

Square.propTypes = {
  square: PropTypes.shape({
    value: PropTypes.number,
    clicked: PropTypes.bool,
    disappearTime: PropTypes.number,
    position: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
    zIndex: PropTypes.number,
  }),
  index: PropTypes.number,
  handleSquareClick: PropTypes.func,
};

export default Square;
