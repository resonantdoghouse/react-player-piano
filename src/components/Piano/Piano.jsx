import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Key from './Key';
import pianoKeys from './pianoKeys.json';
import './Piano.scss';
import pianoSampler from './pianoSampler';
// song data
import avril14 from './data/songs/avril14.json';
import canon from './data/songs/canon.json';
import jynweythekYlow from './data/songs/jynweythekYlow.json';
import superMario from './data/songs/superMario.json';
import jurassicPark from './data/songs/jurassicPark.json';
import theEntertainer from './data/songs/entertainer.json';
import airOnTheGString from './data/songs/airOnTheGString.json';

function Piano() {
  const pianoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyElements, setKeyElements] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  // const [bpm, setBpm] = useState(120);
  const [melodyPart, setMelodyPart] = useState();
  const [bassPart, setBassPart] = useState();
  const [activeSong, setActiveSong] = useState(null);
  const [songData, setSongData] = useState([
    { title: 'Avril 14', artist: 'Aphex Twin', data: avril14 },
    { title: 'Canon', artist: 'Johann Pachelbel', data: canon },
    { title: 'Jynweythek Ylow', artist: 'Aphex Twin', data: jynweythekYlow },
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
    setupKeys();
    setActiveSong(songData[0]);
  }, []);

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
  }, [activeSong]);

  const animateKey = (note, keyElements, hand) => {
    const keysArray = Array.from(pianoRef.current.children);
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
      return song.title == event.target.value;
    });
    melodyPart.clear();
    bassPart.clear();
    setActiveSong(found);
  };

  const setupKeys = () => {
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
  };

  return (
    <>
      <div className="Piano" ref={pianoRef}>
        {keyElements}
      </div>
      <button onClick={handlePlaySong}>{!isPlaying ? 'play' : 'pause'}</button>
      {activeSong && (
        <select onChange={handleSelectSong} defaultValue={activeSong.title}>
          {[...songData]
            .sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((song) => (
              <option key={song.title}>{song.title}</option>
            ))}
        </select>
      )}

      <p>{activeKey}</p>
    </>
  );
}

export default Piano;
