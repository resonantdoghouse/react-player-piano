import './PianoControls.scss'

const PianoControls = ({
  activeSong,
  isPlaying,
  handlePlaySong,
  handleSelectSong,
  renderSongOptions,
  handleToggleReverb,
  reverbLevel,
  handleToggleFilter,
  filterLevel,
  setPlaybackSpeed,
}) => {
  return (
    <section className="Piano__controls controls">
      <nav className="controls__nav">
        <div>
          <button
            onClick={handlePlaySong}
            className="Piano__play-toggle controls__toggle-btn"
          >
            {!isPlaying ? 'play' : 'pause'}
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
            className={`Piano__reverb-toggle controls__toggle-btn ${
              reverbLevel !== 0
                ? 'Piano__reverb-toggle--active controls__toggle-btn--active'
                : null
            }`}
          >
            Reverb
          </button>
          <button
            onClick={handleToggleFilter}
            className={`Piano__filter-toggle controls__toggle-btn ${
              filterLevel !== 0
                ? 'Piano__filter-toggle--active controls__toggle-btn--active'
                : null
            }`}
          >
            Filter Effect
          </button>
          <label>
            Playback Speed
            <input
              onChange={(event) => setPlaybackSpeed(event.target.value)}
              type="range"
              min="30"
              max="300"
              step="1"
            />
          </label>
        </div>
      </nav>
      {activeSong ? (
        <article className="Piano__activeSong activeSong">
          <header className="activeSong__header">
            <h2 className="activeSong__title">{activeSong.title}</h2>
            <p className="activeSong__artist">{activeSong.artist}</p>
            {activeSong.data.header.bpm && (
              <p className="activeSong__bpm">
                BPM {activeSong.data.header.bpm}
              </p>
            )}
          </header>
          {activeSong.data.header.tempos &&
          activeSong.data.header.tempos.length === 1 ? (
            <p className="activeSong__bpm">
              BPM{' '}
              {activeSong.data.header.tempos.map((tempo, i) => {
                return <span key={i}>{tempo.bpm.toFixed(2)}</span>
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
                  )
                })}
              </ul>
            </div>
          ) : null}

          <img
            src={activeSong.img}
            alt={activeSong.title}
            className="activeSong__img"
          />
        </article>
      ) : null}
    </section>
  )
}

export default PianoControls
