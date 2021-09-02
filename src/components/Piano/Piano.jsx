import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Key from './Key';
import pianoKeys from './pianoKeys.json';
import './Piano.scss';
import pianoSampler from './pianoSampler';
// song data
import avril14 from './data/songs/avril14.json';
import aisatsana from './data/songs/aisatsana.json';
import canon from './data/songs/canon.json';
import jynweythekYlow from './data/songs/jynweythekYlow.json';
import tommib from './data/songs/tommib.json';
import superMario from './data/songs/superMario.json';
import jurassicPark from './data/songs/jurassicPark.json';
import theEntertainer from './data/songs/entertainer.json';
import airOnTheGString from './data/songs/airOnTheGString.json';

function Piano() {
  const pianoKeysRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyElements, setKeyElements] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [melodyPart, setMelodyPart] = useState();
  const [bassPart, setBassPart] = useState();
  const [activeSong, setActiveSong] = useState(null);
  const [songData] = useState([
    { title: 'Avril 14', artist: 'Aphex Twin', data: avril14 },
    {
      title: 'Aisatsana',
      artist: 'Aphex Twin',
      data: aisatsana,
    },
    { title: 'Canon', artist: 'Johann Pachelbel', data: canon },
    { title: 'Jynweythek Ylow', artist: 'Aphex Twin', data: jynweythekYlow },
    { title: 'Tommib', artist: 'Squarepusher', data: tommib },
    {
      title: 'Super Mario Bros',
      artist: 'Koji Kondo',
      data: superMario,
    },
    {
      title: 'Jurassic Park',
      artist: 'John Williams',
      data: jurassicPark,
    },
    {
      title: 'The Entertainer',
      artist: 'Scott Joplin',
      data: theEntertainer,
    },
    {
      title: 'Air on the G String',
      artist: 'Johann Sebastian Bach',
      data: airOnTheGString,
    },
  ]);

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
    setActiveSong(songData[0]);
  }, [songData]);

  useEffect(() => {
    if (activeSong) {
      // right hand
      setMelodyPart(
        new Tone.Part(function (time, note) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
          animateKey(note, keyElements, 'rh');
        }, activeSong.data.tracks[0].notes).start()
      );
      // left hand
      setBassPart(
        new Tone.Part(function (time, note) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
          animateKey(note, keyElements, 'lh');
        }, activeSong.data.tracks[1].notes).start()
      );
    }
  }, [activeSong, keyElements]);

  const animateKey = (note, keyElements, hand) => {
    const keysArray = Array.from(pianoKeysRef.current.children);
    const keyElement = keysArray.find(
      (element) => element.getAttribute('data-note') === note.name
    );
    if (keyElement) {
      if (hand === 'rh') {
        keyElement.classList.add('Piano__Key--rh-active');
      } else if (hand === 'lh') {
        keyElement.classList.add('Piano__Key--lh-active');
      }
      setTimeout(() => {
        keyElement.classList.remove('Piano__Key--lh-active');
        keyElement.classList.remove('Piano__Key--rh-active');
      }, note.duration * 1000);
    }
  };

  const handleKeyPress = (event) => {
    pianoSampler.triggerAttackRelease([event.target.dataset.note], 0.5);
    setActiveKey(event.target.dataset.note);
  };

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

  return (
    <>
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
      <p>{activeKey}</p>
    </>
  );
}

export default Piano;
