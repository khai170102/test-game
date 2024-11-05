import PropTypes from "prop-types";

const Header = ({
  isOver,
  isSuccess,
  time,
  points,
  handlePointsChange,
  handleClickPlay,
  statePlay,
  toggleAutoPlay,
  isAutoPlay,
}) => {
  return (
    <header className="flex flex-col mb-5">
      <h1
        className={`text-2xl font-bold ${
          isOver
            ? "text-[#C85F38]"
            : isSuccess
            ? "text-[#5D7B3D]"
            : "text-black"
        }`}
      >
        {isOver ? "GAME OVER" : isSuccess ? "CLEAR ALL" : "LET'S PLAY"}
      </h1>
      <div className="flex-col justify-between w-50 mt-2.5 items-center">
        <p className=" flex items-center">
          <label htmlFor="points" className=" flex ">
            <p className="w-12 ">Points</p>
            <span className="mx-2">:</span>
          </label>
          <input
            id="points"
            min="1"
            type="number"
            className="border rounded px-2 py-1 w-20"
            value={points}
            onChange={handlePointsChange}
          />
        </p>
        <p className="flex">
          <label className=" flex mr-5">
            <p className="w-12 ">Time</p>
            <span className="mx-2">:</span>
          </label>
          <p>
            {(time / 1000).toFixed(1)}
            {time > 0 ? " s" : ""}
          </p>
        </p>
      </div>
      <div className="flex  w-50 mt-2.5">
        <button
          id="restart-btn"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
          onClick={handleClickPlay}
        >
          {statePlay ? "Restart" : "Play"}
        </button>
        {statePlay && !isOver && (
          <button
            id="autoplay-btn"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
            onClick={toggleAutoPlay}
          >
            {isAutoPlay ? "Stop Auto Play" : "Auto Play ON"}
          </button>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  isOver: PropTypes.bool,
  isSuccess: PropTypes.bool,
  time: PropTypes.number,
  points: PropTypes.number,
  handlePointsChange: PropTypes.func,
  handleClickPlay: PropTypes.func,
  statePlay: PropTypes.bool,
  toggleAutoPlay: PropTypes.func,
  isAutoPlay: PropTypes.bool,
};

export default Header;
