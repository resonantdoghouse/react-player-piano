import { usePiano } from '../../hooks/usePiano';
import PianoControls from '../PianoControls';
import '../Piano/Piano.scss';

const Piano = ({ songData }) => {
  const {
    pianoKeysRef,
    isPlaying,
    keyElements,
    activeSong,
    filterLevel,
    reverbLevel,
    playbackSpeed,
    handlePlaySong,
    handleStopSong,
    handleSelectSong,
    handleToggleReverb,
    handleToggleFilter,
    renderSongOptions,
    setFilterLevel,
    setIsPlaying,
    setReverbLevel,
    setPlaybackSpeed,
    activeSongData,
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
          handleToggleReverb={handleToggleReverb}
          reverbLevel={reverbLevel}
          setReverbLevel={setReverbLevel}
          handleToggleFilter={handleToggleFilter}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
        />
        <div className="piano__keys" ref={pianoKeysRef}>
          {keyElements}
        </div>
      </div>
    </main>
  );
};

export default Piano;
