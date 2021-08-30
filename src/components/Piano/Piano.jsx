import { useState } from 'react';
import Key from './Key';
import pianoKeys from './pianoKeys.json';
import './Piano.scss';
import pianoSampler from './pianoSampler';

function Piano() {
  const [activeKeys, setActiveKeys] = useState([]);
  // const [songs, setSongs] = useState([]);

  const handleKeyPress = (event) => {
    pianoSampler.triggerAttackRelease([event.target.dataset.note], 0.5);
    setActiveKeys([event.target.dataset.note]);
  };

  return (
    <>
      <div className="Piano">
        {pianoKeys.map((key, i) => {
          if (key.includes('#')) {
            return <Key key={i} note={key} handleKeyPress={handleKeyPress} />;
          } else {
            return (
              <div
                data-note={key}
                onClick={handleKeyPress}
                key={key}
                className="Piano__Key"
              ></div>
            );
          }
        })}
      </div>
      {activeKeys.map((key) => (
        <div key={key}>{key}</div>
      ))}
    </>
  );
}

export default Piano;
