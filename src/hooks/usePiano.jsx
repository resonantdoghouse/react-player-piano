import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import Key from '../components/Key';
import pianoKeys from '../components/Piano/pianoKeys.json';
import pianoSampler, { filter, reverb } from '../components/Piano/pianoSampler';
import { randomFromArray } from '../lib/utils.js';

export const usePiano = (songData) => {
  const pianoKeysRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyElements, setKeyElements] = useState([]);
  const [melodyPart, setMelodyPart] = useState(null);
  const [bassPart, setBassPart] = useState();
  const [activeSong, setActiveSong] = useState(null);
  const [filterLevel, setFilterLevel] = useState(0);
  const [reverbLevel, setReverbLevel] = useState(0.65);
  const [playbackSpeed, setPlaybackSpeed] = useState(120);
  const [keysArray, setKeysArray] = useState([]);

  const animateKey = useCallback(
    (note, hand) => {
      const keyElement = keysArray.find(
        (element) => element.getAttribute('data-note') === note.name
      );
      if (keyElement) {
        keyElement.classList.add(
          hand === 'rh' ? 'Key--rh-active' : 'Key--lh-active'
        );
        setTimeout(() => {
          keyElement.classList.remove('Key--lh-active');
          keyElement.classList.remove('Key--rh-active');
        }, note.duration * 600);
      }
    },
    [keysArray]
  );

  const createPianoKeys = useCallback(() => {
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
    return mappedKeys;
  }, []);

  useEffect(() => {
    if (activeSong) {
      if (activeSong.data.header.tempos) {
        setPlaybackSpeed(Math.round(activeSong.data.header.tempos[0].bpm));
      } else {
        setPlaybackSpeed(activeSong.data.header.bpm);
      }
    }
    if (activeSong && !keysArray.length) {
      setKeysArray(() => Array.from(pianoKeysRef.current.children));
    }
    if (pianoKeysRef.current && !activeSong) {
      setActiveSong(randomFromArray(songData));
    }
  }, [pianoKeysRef, songData, activeSong, keysArray]);

  useEffect(() => {
    filter.set({ wet: filterLevel });
  }, [filterLevel]);

  useEffect(() => {
    reverb.set({ wet: reverbLevel });
  }, [reverbLevel]);

  useEffect(() => {
    setKeyElements(createPianoKeys());
  }, [createPianoKeys]);

  useEffect(() => {
    if (activeSong) {
      const newBassPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
        }
        animateKey(note, 'lh');
      }, activeSong.data.tracks[1].notes).start(0);

      const newMelodyPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
        }
        animateKey(note, 'rh');
      }, activeSong.data.tracks[0].notes).start();

      setBassPart(newBassPart);
      setMelodyPart(newMelodyPart);
      return () => {
        newMelodyPart.dispose();
        newBassPart.dispose();
      };
    }
  }, [activeSong, animateKey]);

  useEffect(() => {
    Tone.Transport.bpm.rampTo(playbackSpeed, 2);
  }, [playbackSpeed]);

  useEffect(() => {
    Tone.Transport.stop();
    setIsPlaying(false);
    if (activeSong) {
      if (activeSong.data.header.tempos) {
        setPlaybackSpeed(Math.round(activeSong.data.header.tempos[0].bpm));
      } else {
        setPlaybackSpeed(activeSong.data.header.bpm);
      }
    }
  }, [activeSong]);

  const handleKeyPress = ({
    target: {
      dataset: { note },
    },
  }) => {
    if (pianoSampler.loaded) pianoSampler.triggerAttackRelease([note], 0.5);
  };

  const handlePlaySong = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      Tone.Transport.start();
    } else {
      setIsPlaying(false);
      Tone.Transport.pause();
    }
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
  };

  const handleStopSong = () => {
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  const handleSelectSong = (event) => {
    Tone.Transport.stop();
    setIsPlaying(false);
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
      setFilterLevel(0.5);
    } else {
      setFilterLevel(0);
    }
  };

  const renderSongOptions = () =>
    songData
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map((song) => <option key={song.title}>{song.title}</option>);

  return {
    pianoKeysRef,
    isPlaying,
    keyElements,
    melodyPart,
    bassPart,
    activeSong,
    filterLevel,
    reverbLevel,
    playbackSpeed,
    keysArray,
    handleKeyPress,
    handlePlaySong,
    handleStopSong,
    handleSelectSong,
    handleToggleReverb,
    handleToggleFilter,
    renderSongOptions,
    setFilterLevel,
    setIsPlaying,
    setReverbLevel,
    setPlaybackSpeed
  };
};
