import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import Key from "../components/Key";
import pianoKeys from "../components/Piano/pianoKeys.json";
import pianoSampler, { filter, reverb, reverbGain, chorus, phaser, delay, ringMod, distortion } from "../components/Piano/pianoSampler";
import { randomFromArray } from "../lib/utils.js";

export const usePiano = (songData) => {
  const pianoKeysRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyElements, setKeyElements] = useState([]);
  const [melodyPart, setMelodyPart] = useState(null);
  const [bassPart, setBassPart] = useState();
  const [activeSong, setActiveSong] = useState(null);
  const [activeSongData, setActiveSongData] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(120);
  const [keysArray, setKeysArray] = useState([]);

  // Volume & Overdrive
  const [masterVolume, setMasterVolume] = useState(-5); // dB
  const [overdrive, setOverdrive] = useState(0); // 0-1

  // Effect States
  // Reverb
  const [reverbWet, setReverbWet] = useState(0); 
  const [reverbDecay, setReverbDecay] = useState(4); 
  
  // Filter
  const [filterWet, setFilterWet] = useState(0);
  const [filterSpeed, setFilterSpeed] = useState(4);

  // Chorus
  const [chorusWet, setChorusWet] = useState(0);
  const [chorusSpeed, setChorusSpeed] = useState(4);
  const [chorusDepth, setChorusDepth] = useState(2);

  // Phaser
  const [phaserWet, setPhaserWet] = useState(0);
  const [phaserSpeed, setPhaserSpeed] = useState(0.5);
  const [phaserOctaves, setPhaserOctaves] = useState(3);

  // Delay
  const [delayWet, setDelayWet] = useState(0);
  const [delayTime, setDelayTime] = useState(0.5); 
  const [delayFeedback, setDelayFeedback] = useState(0.3);

  // Ring Mod (FreqShifter)
  const [ringModWet, setRingModWet] = useState(0);
  const [ringModFreq, setRingModFreq] = useState(30);

  const animateKey = useCallback(
    (note, hand) => {
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
        }, note.duration * 600);
      }
    },
    [keysArray]
  );

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
            isSharp={false}
          />
        );
      }
    });
    return mappedKeys;
  }, []);

  useEffect(() => {
    if (activeSong && activeSongData) {
      if (activeSongData.header.tempos) {
        setPlaybackSpeed(Math.round(activeSongData.header.tempos[0].bpm));
      } else {
        setPlaybackSpeed(activeSongData.header.bpm);
      }
    }
    if (activeSong && !keysArray.length) {
      setKeysArray(() => Array.from(pianoKeysRef.current.children));
    }
    if (pianoKeysRef.current && !activeSong) {
      setActiveSong(randomFromArray(songData));
    }
  }, [pianoKeysRef, songData, activeSong, activeSongData, keysArray]);

  useEffect(() => {
    if (activeSong) {
      setActiveSongData(null); // Clear previous song data
      activeSong.loadData().then((module) => {
        setActiveSongData(module.default || module);
      });
    }
  }, [activeSong]);

  // --- Effect Updates ---

  // Reverb
  useEffect(() => {
    if (activeSongData) {
        reverbGain.gain.rampTo(reverbWet, 0.1);
        reverb.decay = reverbDecay;
    }
  }, [reverbWet, reverbDecay, activeSongData]);

  // Filter (AutoFilter)
  useEffect(() => {
    if (activeSongData) {
      filter.set({ wet: filterWet });
      filter.frequency.rampTo(filterSpeed, 0.1);
    }
  }, [filterWet, filterSpeed, activeSongData]);

  // Chorus
  useEffect(() => {
    if (activeSongData) {
        chorus.wet.rampTo(chorusWet, 0.1);
        chorus.frequency.rampTo(chorusSpeed, 0.1); 
        chorus.depth = chorusDepth;
    }
  }, [chorusWet, chorusSpeed, chorusDepth, activeSongData]);

  // Phaser
  useEffect(() => {
    if (activeSongData) {
        phaser.wet.rampTo(phaserWet, 0.1);
        phaser.frequency.rampTo(phaserSpeed, 0.1);
        phaser.octaves = phaserOctaves;
    }
  }, [phaserWet, phaserSpeed, phaserOctaves, activeSongData]);

  // Delay
  useEffect(() => {
    if (activeSongData) {
        delay.wet.rampTo(delayWet, 0.1);
        delay.delayTime.rampTo(delayTime, 0.1);
        delay.feedback.rampTo(delayFeedback, 0.1);
    }
  }, [delayWet, delayTime, delayFeedback, activeSongData]);

  useEffect(() => {
    if (activeSongData) {
       ringMod.wet.rampTo(ringModWet, 0.1);
       ringMod.frequency.rampTo(ringModFreq, 0.1); 
    }
  }, [ringModWet, ringModFreq, activeSongData]);

  // Master Volume
  useEffect(() => {
    Tone.Destination.volume.rampTo(masterVolume, 0.1);
  }, [masterVolume]);

  // Overdrive
  useEffect(() => {
    distortion.distortion = overdrive;
  }, [overdrive]);


  useEffect(() => {
    setKeyElements(createPianoKeys());
  }, [createPianoKeys]);

  useEffect(() => {
    if (activeSong && activeSongData) {
      const newBassPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration + 0.2,
            time,
            note.velocity
          );
        }
        animateKey(note, "lh");
      }, activeSongData.tracks[1].notes).start(0);

      const newMelodyPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration + 0.2,
            time,
            note.velocity
          );
        }
        animateKey(note, "rh");
      }, activeSongData.tracks[0].notes).start(0);

      setBassPart(newBassPart);
      setMelodyPart(newMelodyPart);
      return () => {
        newMelodyPart.dispose();
        newBassPart.dispose();
      };
    }
  }, [activeSong, activeSongData, animateKey]);

  useEffect(() => {
    Tone.Transport.bpm.value = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    Tone.Transport.stop();
    setIsPlaying(false);
    if (activeSong && activeSongData) {
      if (activeSongData.header.tempos) {
        setPlaybackSpeed(Math.round(activeSongData.header.tempos[0].bpm));
      } else {
        setPlaybackSpeed(activeSongData.header.bpm);
      }
    }
  }, [activeSong, activeSongData]);

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
      console.log('Playing song...', { activeSong, activeSongData, state: Tone.Transport.state });
    } else {
      setIsPlaying(false);
      Tone.Transport.pause();
    }
    if (Tone.context.state !== "running") {
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
    // Removed manual dispose, relying on UseEffect cleanup
    setActiveSong((prevSong) => (prevSong !== newSong ? newSong : prevSong));
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
    // Global

    playbackSpeed,
    setPlaybackSpeed,
    masterVolume, setMasterVolume,
    overdrive, setOverdrive,
    // Effects Props
    reverbWet, setReverbWet,
    reverbDecay, setReverbDecay,
    
    filterWet, setFilterWet,
    filterSpeed, setFilterSpeed,

    chorusWet, setChorusWet,
    chorusSpeed, setChorusSpeed,
    chorusDepth, setChorusDepth,

    phaserWet, setPhaserWet,
    phaserSpeed, setPhaserSpeed,
    phaserOctaves, setPhaserOctaves,

    delayWet, setDelayWet,
    delayTime, setDelayTime,
    delayFeedback, setDelayFeedback,

    ringModWet, setRingModWet,
    ringModFreq, setRingModFreq,

    keysArray,
    handleKeyPress,
    handlePlaySong,
    handleStopSong,
    handleSelectSong,
    renderSongOptions,
    setIsPlaying,
    activeSongData,
  };
};
