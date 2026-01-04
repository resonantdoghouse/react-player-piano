import Btn from '../Btn';
import ActiveSong from '../ActiveSong';
import './PianoControls.scss';

const PianoControls = ({
  activeSong,
  isPlaying,
  handleStopSong,
  handlePlaySong,
  handleSelectSong,
  renderSongOptions,
  handleToggleReverb,
  reverbLevel,
  setReverbLevel,
  handleToggleFilter,
  filterLevel,
  playbackSpeed,
  setPlaybackSpeed,
  setFilterLevel,
  activeSongData,
}) => {
  return (
    <section className="pianocontrols controls">
      <nav className="controls__nav">
        <div className="btn-group">
          {activeSong && (
            <select
              onChange={handleSelectSong}
              defaultValue={activeSong.title}
              className="controls__select"
            >
              {renderSongOptions()}
            </select>
          )}

          <Btn
            onClick={handleStopSong}
            className="pianoplay-toggle controls__toggle-btn"
            text="stop"
            disabled={!isPlaying}
          />

          <Btn
            onClick={handlePlaySong}
            className="pianoplay-toggle controls__toggle-btn"
            text={!isPlaying ? 'play' : 'pause'}
          />
        </div>
        <div>
          <Btn
            onClick={handleToggleReverb}
            className={`pianoreverb-toggle controls__toggle-btn ${
              reverbLevel !== 0
                ? 'pianoreverb-toggle--active controls__toggle-btn--active'
                : null
            }`}
            text="Reverb"
          />

          <Btn
            onClick={handleToggleFilter}
            className={`pianofilter-toggle controls__toggle-btn ${
              filterLevel !== 0
                ? 'pianofilter-toggle--active controls__toggle-btn--active'
                : null
            }`}
            text="Filter"
          />

          <div className="range-controls">
            <label className="range-controls__label">
              Speed
              <input
                onChange={(event) => setPlaybackSpeed(event.target.value)}
                type="range"
                min="30"
                max="300"
                value={playbackSpeed}
                step="1"
              />
              {playbackSpeed} BPM
            </label>

            <label className="range-controls__label">
              Filter Level
              <input
                onChange={(event) => setFilterLevel(event.target.value)}
                type="range"
                min="0"
                max="1"
                value={filterLevel}
                step="0.1"
              />
              {filterLevel}
            </label>

            <label className="range-controls__label">
              Reverb Level
              <input
                onChange={(event) => setReverbLevel(event.target.value)}
                type="range"
                min="0"
                max="1"
                value={reverbLevel}
                step="0.1"
              />
              {reverbLevel}
            </label>
          </div>
        </div>
      </nav>
      {activeSong && activeSongData ? <ActiveSong activeSong={activeSong} activeSongData={activeSongData} /> : null}
    </section>
  );
};

export default PianoControls;
