import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Key from './Key/';
import pianoKeys from './pianoKeys.json';
import pianoSampler from './pianoSampler';
import './Piano.scss';

const Piano = ({ songData }) => {
  const pianoKeysRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyElements, setKeyElements] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [melodyPart, setMelodyPart] = useState();
  const [bassPart, setBassPart] = useState();
  const [activeSong, setActiveSong] = useState(songData[0]);

  /*
   * Component Mount
   */
  useEffect(() => {
    const mappedKeys = pianoKeys.map((key, i) => {
      if (key.includes('#')) {
        return (
          <Key
            key={i}
            note={key}
            data-note={key}
            handleKeyPress={handleKeyPress}
            isActive={false}
            isSharp
          />
        );
      } else {
        return (
          <Key
            key={i}
            note={key}
            data-note={key}
            handleKeyPress={handleKeyPress}
            isActive={false}
          />
        );
      }
    });
    setKeyElements(mappedKeys);
  }, []);

  // active song changed
  useEffect(() => {
    if (activeSong) {
      // right hand
      setMelodyPart(
        new Tone.Part((time, note) => {
          if (pianoSampler.loaded) {
            pianoSampler.triggerAttackRelease(
              note.name,
              note.duration,
              time,
              note.velocity
            );
          }
          animateKey(note, 'rh');
        }, activeSong.data.tracks[0].notes).start()
      );
      // left hand
      setBassPart(
        new Tone.Part((time, note) => {
          if (pianoSampler.loaded) {
            pianoSampler.triggerAttackRelease(
              note.name,
              note.duration,
              time,
              note.velocity
            );
          }
          animateKey(note, 'lh');
        }, activeSong.data.tracks[1].notes).start()
      );
    }
  }, [activeSong]);

  // Key Animation
  const animateKey = (note, hand) => {
    const keysArray = Array.from(pianoKeysRef.current.children);
    const keyElement = keysArray.find(
      (element) => element.getAttribute('data-note') === note.name
    );
    if (keyElement) {
      if (hand === 'rh') {
        keyElement.classList.add('Key--rh-active');
      } else if (hand === 'lh') {
        keyElement.classList.add('Key--lh-active');
      }
      setTimeout(() => {
        keyElement.classList.remove('Key--lh-active');
        keyElement.classList.remove('Key--rh-active');
      }, note.duration * 1000);
    }
  };

  const handleKeyPress = (event) => {
    if (pianoSampler.loaded) {
      pianoSampler.triggerAttackRelease([event.target.dataset.note], 0.5);
    }
    setActiveKey(event.target.dataset.note);
    console.log(activeKey);
  };

  // Toggle play pause
  const handlePlaySong = () => {
    if (!isPlaying) {
      Tone.Transport.start();
      setIsPlaying(true);
    } else {
      Tone.Transport.stop();
      setIsPlaying(false);
    }
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
  };

  const handleSelectSong = (event) => {
    const found = songData.find((song) => {
      return song.title === event.target.value;
    });
    melodyPart.clear();
    bassPart.clear();
    setActiveSong(found);
  };

  if (!songData) {
    return <p>Loading song data...</p>;
  }

  return (
    <>
      <h1>Player Piano</h1>
      <div className="Piano">
        <div className="Piano__controls">
          <button onClick={handlePlaySong} className="Piano__play-toggle">
            {!isPlaying ? 'play' : 'pause'}
          </button>
          {activeSong && (
            <select
              onChange={handleSelectSong}
              defaultValue={activeSong.title}
              className="Piano__song-select"
            >
              {[...songData]
                .sort((a, b) => (a.title > b.title ? 1 : -1))
                .map((song) => (
                  <option key={song.title}>{song.title}</option>
                ))}
            </select>
          )}
        </div>
        <div className="Piano__keys" ref={pianoKeysRef}>
          {keyElements}
        </div>
      </div>
      {activeSong ? (
        <>
          <h2>{activeSong.title}</h2>
          <p>{activeSong.artist}</p>
          <img src={activeSong.img} alt={activeSong.title} />

          {activeSong.data.header.bpm && (
            <p>BPM {activeSong.data.header.bpm}</p>
          )}

          {activeSong.data.header.tempos &&
          activeSong.data.header.tempos.length === 1 ? (
            <p>
              BPM{' '}
              {activeSong.data.header.tempos.map((tempo, i) => {
                return <span key={i}>{tempo.bpm.toFixed(2)}</span>;
              })}
            </p>
          ) : null}

          {activeSong.data.header.tempos &&
          activeSong.data.header.tempos.length > 1 ? (
            <p>
              BPMs
              <ul>
                {activeSong.data.header.tempos.map((tempo, i) => {
                  return <li key={i}>{tempo.bpm.toFixed(2)}</li>;
                })}
              </ul>
            </p>
          ) : null}
        </>
      ) : null}
      <p className="activeKeyInfo">{activeKey}</p>
    </>
  );
};

export default Piano;
