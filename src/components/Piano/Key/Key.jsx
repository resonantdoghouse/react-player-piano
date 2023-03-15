import './Key.scss';

const Key = ({ note, handleKeyPress, isActive, isSharp }) => {
  return (
    <div
      data-note={note}
      onClick={handleKeyPress}
      className={`Key Piano__Key ${isSharp ? 'Key--sharp' : null} ${
        isActive ? 'Key--active' : null
      }`}
    ></div>
  );
};

export default Key;
