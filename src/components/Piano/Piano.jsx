import { usePiano } from '../../hooks/usePiano';
import PianoControls from '../PianoControls';
import '../Piano/Piano.scss';

const Piano = ({ songData }) => {
  const {
    pianoKeysRef,
    isPlaying,
    keyElements,
    activeSong,
    playbackSpeed,
    handlePlaySong,
    handleStopSong,
    handleSelectSong,
    renderSongOptions,
    setIsPlaying,
    setPlaybackSpeed,
    activeSongData,
    // Effects
    reverbWet, setReverbWet, reverbDecay, setReverbDecay,
    filterWet, setFilterWet, filterSpeed, setFilterSpeed,
    chorusWet, setChorusWet, chorusSpeed, setChorusSpeed, chorusDepth, setChorusDepth,
    phaserWet, setPhaserWet, phaserSpeed, setPhaserSpeed, phaserOctaves, setPhaserOctaves,
    delayWet, setDelayWet, delayTime, setDelayTime, delayFeedback, setDelayFeedback,
    ringModWet, setRingModWet, ringModFreq, setRingModFreq,
  } = usePiano(songData);

  if (!songData) {
    return <p>Loading song data...</p>;
  }

  return (
    <main>
      <h1 className="hidden">React Player Piano</h1>
      <div className="piano">
        <PianoControls
          activeSong={activeSong}
          activeSongData={activeSongData}
          isPlaying={isPlaying}
          handleStopSong={handleStopSong}
          setIsPlaying={setIsPlaying}
          handleSelectSong={handleSelectSong}
          handlePlaySong={handlePlaySong}
          renderSongOptions={renderSongOptions}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          
          reverbWet={reverbWet} setReverbWet={setReverbWet} reverbDecay={reverbDecay} setReverbDecay={setReverbDecay}
          filterWet={filterWet} setFilterWet={setFilterWet} filterSpeed={filterSpeed} setFilterSpeed={setFilterSpeed}
          chorusWet={chorusWet} setChorusWet={setChorusWet} chorusSpeed={chorusSpeed} setChorusSpeed={setChorusSpeed} chorusDepth={chorusDepth} setChorusDepth={setChorusDepth}
          phaserWet={phaserWet} setPhaserWet={setPhaserWet} phaserSpeed={phaserSpeed} setPhaserSpeed={setPhaserSpeed} phaserOctaves={phaserOctaves} setPhaserOctaves={setPhaserOctaves}
          delayWet={delayWet} setDelayWet={setDelayWet} delayTime={delayTime} setDelayTime={setDelayTime} delayFeedback={delayFeedback} setDelayFeedback={setDelayFeedback}
          ringModWet={ringModWet} setRingModWet={setRingModWet} ringModFreq={ringModFreq} setRingModFreq={setRingModFreq}
        />
        <div className="piano__keys" ref={pianoKeysRef}>
          {keyElements}
        </div>
      </div>
    </main>
  );
};

export default Piano;
