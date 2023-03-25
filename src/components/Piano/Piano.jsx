import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import Key from "../Key/";
import pianoKeys from "./pianoKeys.json";
import pianoSampler, { filter, reverb } from "./pianoSampler";
import { randomFromArray } from "../../lib/utils";
import "./Piano.scss";

const Piano = ({ songData }) => {
  const pianoKeysRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyElements, setKeyElements] = useState([]);
  const [melodyPart, setMelodyPart] = useState(null);
  const [bassPart, setBassPart] = useState();
  const [activeSong, setActiveSong] = useState(randomFromArray(songData));
  const [filterLevel, setFilterLevel] = useState(0);
  const [reverbLevel, setReverbLevel] = useState(0.65);

  const createPianoKeys = useCallback(() => {
    const mappedKeys = pianoKeys.map((key, i) => {
      if (key.includes("#")) {
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
    return mappedKeys;
  }, []);

  useEffect(() => {
    filter.set({ wet: filterLevel });
  }, [filterLevel]);

  useEffect(() => {
    reverb.set({ wet: reverbLevel });
  }, [reverbLevel]);

  useEffect(() => {
    setKeyElements(createPianoKeys());
  }, [createPianoKeys]);

  // active song changed
  useEffect(() => {
    if (activeSong) {
      // right hand
      const newMelodyPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
        }
        animateKey(note, "rh");
      }, activeSong.data.tracks[0].notes).start();
      // left hand
      const newBassPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
        }
        animateKey(note, "lh");
      }, activeSong.data.tracks[1].notes).start();
      setMelodyPart(newMelodyPart);
      setBassPart(newBassPart);
      return () => {
        newMelodyPart.dispose();
        newBassPart.dispose();
      };
    }
  }, [activeSong]);

  // Key Animation
  const animateKey = (note, hand) => {
    const keysArray = Array.from(pianoKeysRef.current.children);
    const keyElement = keysArray.find(
      (element) => element.getAttribute("data-note") === note.name
    );
    if (keyElement) {
      keyElement.classList.add(
        hand === "rh" ? "Key--rh-active" : "Key--lh-active"
      );
      setTimeout(() => {
        keyElement.classList.remove("Key--lh-active");
        keyElement.classList.remove("Key--rh-active");
      }, note.duration * 1000);
    }
  };

  const handleKeyPress = ({
    target: {
      dataset: { note },
    },
  }) => {
    if (pianoSampler.loaded) pianoSampler.triggerAttackRelease([note], 0.5);
    // setActiveKey(note);
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
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
  };

  const handleSelectSong = (event) => {
    const { value } = event.target;
    const newSong = songData.find((song) => song.title === value);
    if (melodyPart) melodyPart.dispose();
    if (bassPart) bassPart.dispose();
    setActiveSong((prevSong) => (prevSong !== newSong ? newSong : prevSong));
  };

  const handleToggleReverb = () => {
    if (reverbLevel === 0) {
      setReverbLevel(0.65);
    } else {
      setReverbLevel(0);
    }
  };

  const handleToggleFilter = () => {
    if (filterLevel === 0) {
      setFilterLevel(1);
    } else {
      setFilterLevel(0);
    }
  };

  const renderSongOptions = () =>
    songData
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map((song) => <option key={song.title}>{song.title}</option>);

  // song data json files are quite large!
  if (!songData) {
    return <p>Loading song data...</p>;
  }

  return (
    <main>
      <h1 className="hidden">React Player Piano</h1>
      <div className="Piano">
        <section className="Piano__controls controls">
          <nav className="controls__nav">
            <div>
              <button onClick={handlePlaySong} className="Piano__play-toggle">
                {!isPlaying ? "play" : "pause"}
              </button>
              {activeSong && (
                <select
                  onChange={handleSelectSong}
                  defaultValue={activeSong.title}
                  className="Piano__song-select"
                >
                  {renderSongOptions()}
                </select>
              )}
            </div>
            <div>
              <button
                onClick={handleToggleReverb}
                className={`Piano__reverb-toggle ${
                  reverbLevel !== 0 ? "Piano__reverb-toggle--active" : null
                }`}
              >
                Reverb
              </button>
              <button
                onClick={handleToggleFilter}
                className={`Piano__filter-toggle ${
                  filterLevel !== 0 ? "Piano__filter-toggle--active" : null
                }`}
              >
                Filter Effect
              </button>
            </div>
          </nav>
          {activeSong ? (
            <article className="Piano__activeSong activeSong">
              <header>
                <h2 className="activeSong__title">{activeSong.title}</h2>
                <p className="activeSong__artist">{activeSong.artist}</p>
                {activeSong.data.header.bpm && (
                  <p className="activeSong__bpm">
                    BPM {activeSong.data.header.bpm}
                  </p>
                )}
                {activeSong.data.header.tempos &&
                activeSong.data.header.tempos.length === 1 ? (
                  <p className="activeSong__bpm">
                    BPM{" "}
                    {activeSong.data.header.tempos.map((tempo, i) => {
                      return <span key={i}>{tempo.bpm.toFixed(2)}</span>;
                    })}
                  </p>
                ) : null}

                {activeSong.data.header.tempos &&
                activeSong.data.header.tempos.length > 1 ? (
                  <div className="activeSong__bpm">
                    BPMs
                    <ul className="activeSong__bpmList bpmList">
                      {activeSong.data.header.tempos.map((tempo, i) => {
                        return (
                          <li key={i} className="bpmList__item">
                            {tempo.bpm.toFixed(2)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </header>
              <img
                src={activeSong.img}
                alt={activeSong.title}
                className="activeSong__img"
              />
            </article>
          ) : null}
        </section>
        <div className="Piano__keys" ref={pianoKeysRef}>
          {keyElements}
        </div>
      </div>
    </main>
  );
};

export default Piano;
