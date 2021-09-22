import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Key from './Key/';
import pianoKeys from './pianoKeys.json';
import pianoSampler, { filter, reverb } from './pianoSampler';
import { randomFromArray } from '../../lib/utils';
import './Piano.scss';

const Piano = ({ songData }) => {
  const pianoKeysRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyElements, setKeyElements] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [melodyPart, setMelodyPart] = useState();
  const [bassPart, setBassPart] = useState();
  const [activeSong, setActiveSong] = useState(randomFromArray(songData));
  const [filterLevel, setFilterLevel] = useState(0);
  // const [reverbLevel, setReverbLevel] = useState(0.5);

  // init fx levels, todo move this into state or useEffect
  filter.set({ wet: 0 });
  reverb.set({ wet: 0.5 });

  /*
   * Component Mount
   * Loop to create Piano Keys
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

  // useEffect(() => reverb.set({ wet: reverbLevel }), [reverbLevel]);
  useEffect(() => filter.set({ wet: filterLevel }), [filterLevel]);

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
    console.log(event.target.dataset.note);
    if (pianoSampler.loaded) {
      pianoSampler.triggerAttackRelease([event.target.dataset.note], 0.5);
    }
    setActiveKey(event.target.dataset.note);
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

  // const handleToggleReverb = () => {
  //   if (reverbLevel === 0) {
  //     setReverbLevel(0.5);
  //   } else {
  //     setReverbLevel(0);
  //   }
  // };

  const handleToggleFilter = () => {
    if (filterLevel === 0) {
      setFilterLevel(1);
    } else {
      setFilterLevel(0);
    }
  };

  // song data json files are quite large!
  if (!songData) {
    return <p>Loading song data...</p>;
  }

  return (
    <main>
      <h1 className="hidden">React Player Piano</h1>
      <div className="Piano">
        <section className="Piano__controls controls">
          {/*
           * Controls
           * Play/Pause, Song Select, FX Toggle
           */}
          <nav className="controls__nav">
            <div>
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
            <div>
              {/* <button
                onClick={handleToggleReverb}
                className={`Piano__reverb-toggle ${
                  reverbLevel !== 0 ? 'Piano__reverb-toggle--active' : null
                }`}
              >
                Reverb
              </button> */}
              <button
                onClick={handleToggleFilter}
                className={`Piano__filter-toggle ${
                  filterLevel !== 0 ? 'Piano__filter-toggle--active' : null
                }`}
              >
                Filter Effect
              </button>
            </div>
          </nav>
          {activeSong ? (
            <article className="Piano__activeSong activeSong">
              {/*
               * Controls
               * Play/Pause, Song Select, FX Toggle
               */}
              <header>
                <h2 className="activeSong__title">{activeSong.title}</h2>
                <p className="activeSong__artist">{activeSong.artist}</p>
                {/*
                 * BPM & BPM list
                 * If more than 1 Tempo is set the list is rendered
                 */}
                {activeSong.data.header.bpm && (
                  <p className="activeSong__bpm">
                    BPM {activeSong.data.header.bpm}
                  </p>
                )}
                {activeSong.data.header.tempos &&
                activeSong.data.header.tempos.length === 1 ? (
                  <p className="activeSong__bpm">
                    BPM{' '}
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
        {/*
         * Piano Keys 🎹
         */}
        <div className="Piano__keys" ref={pianoKeysRef}>
          {keyElements}
        </div>
      </div>
      {/* Fixes compilation error, no unused vars, going to use this later! */}
      <div className="hidden">{activeKey}</div>
    </main>
  );
};

export default Piano;
