function Key({ note, handleKeyPress, isActive, isSharp }) {
  return (
    <div
      data-note={note}
      onClick={handleKeyPress}
      className={`Piano__Key ${isSharp ? 'Piano__Key--sharp' : null} ${
        isActive ? 'Piano__Key--active' : null
      }`}
    ></div>
  );
}

export default Key;
