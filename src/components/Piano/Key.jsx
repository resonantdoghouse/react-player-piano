import React from 'react';

function Key({ note, handleKeyPress }) {
  return (
    <div
      data-note={note}
      onClick={handleKeyPress}
      className="Piano__Key Piano__Key--sharp"
    ></div>
  );
}

export default Key;
