import Btn from '../Btn';
import ActiveSong from '../ActiveSong';
import EffectColumn from './EffectColumn';
import './PianoControls.scss';

const PianoControls = ({
  activeSong,
  isPlaying,
  handleStopSong,
  handlePlaySong,
  handleSelectSong,
  renderSongOptions,
  
  // Reverb
  reverbWet, setReverbWet,
  reverbDecay, setReverbDecay,

  // Filter
  filterWet, setFilterWet,
  filterSpeed, setFilterSpeed,

  // Chorus
  chorusWet, setChorusWet,
  chorusSpeed, setChorusSpeed,
  chorusDepth, setChorusDepth,

  // Phaser
  phaserWet, setPhaserWet,
  phaserSpeed, setPhaserSpeed,
  phaserOctaves, setPhaserOctaves,

  // Delay
  delayWet, setDelayWet,
  delayTime, setDelayTime,
  delayFeedback, setDelayFeedback,

  // RingMod
  ringModWet, setRingModWet,
  ringModFreq, setRingModFreq,

  playbackSpeed,
  setPlaybackSpeed,
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
        </div>
      </nav>

      {activeSong && activeSongData ? <ActiveSong activeSong={activeSong} activeSongData={activeSongData} /> : null}

      <div className="effects-grid">
        {/* Reverb */}
        <EffectColumn
          title="Reverb"
          isActive={reverbWet > 0}
          onToggle={() => setReverbWet(prev => prev > 0 ? 0 : 0.3)}
        >
          <label className="range-controls__label">
            Wet: {Math.round(reverbWet * 100)}%
            <input type="range" min="0" max="1" step="0.1" value={reverbWet} onChange={e => setReverbWet(parseFloat(e.target.value))} />
          </label>
          <label className="range-controls__label">
            Decay: {reverbDecay}s
            <input type="range" min="0.1" max="10" step="0.1" value={reverbDecay} onChange={e => setReverbDecay(parseFloat(e.target.value))} />
          </label>
        </EffectColumn>

        {/* Filter */}
        <EffectColumn
          title="Filter"
          isActive={filterWet > 0}
          onToggle={() => setFilterWet(prev => prev > 0 ? 0 : 0.5)}
        >
          <label className="range-controls__label">
            Wet: {Math.round(filterWet * 100)}%
            <input type="range" min="0" max="1" step="0.1" value={filterWet} onChange={e => setFilterWet(parseFloat(e.target.value))} />
          </label>
          <label className="range-controls__label">
            Speed: {filterSpeed}Hz
            <input type="range" min="0.1" max="20" step="0.1" value={filterSpeed} onChange={e => setFilterSpeed(parseFloat(e.target.value))} />
          </label>
        </EffectColumn>

        {/* Chorus */}
        <EffectColumn
          title="Chorus"
          isActive={chorusWet > 0}
          onToggle={() => setChorusWet(prev => prev > 0 ? 0 : 0.5)}
        >
          <label className="range-controls__label">
            Wet: {Math.round(chorusWet * 100)}%
            <input type="range" min="0" max="1" step="0.1" value={chorusWet} onChange={e => setChorusWet(parseFloat(e.target.value))} />
          </label>
          <label className="range-controls__label">
            Speed: {chorusSpeed}Hz
            <input type="range" min="0.1" max="20" step="0.1" value={chorusSpeed} onChange={e => setChorusSpeed(parseFloat(e.target.value))} />
          </label>
           <label className="range-controls__label">
            Depth: {chorusDepth}
            <input type="range" min="0" max="100" step="1" value={chorusDepth} onChange={e => setChorusDepth(parseFloat(e.target.value))} />
          </label>
        </EffectColumn>

        {/* Phaser */}
        <EffectColumn
          title="Phaser"
          isActive={phaserWet > 0}
          onToggle={() => setPhaserWet(prev => prev > 0 ? 0 : 0.5)}
        >
           <label className="range-controls__label">
            Wet: {Math.round(phaserWet * 100)}%
            <input type="range" min="0" max="1" step="0.1" value={phaserWet} onChange={e => setPhaserWet(parseFloat(e.target.value))} />
          </label>
          <label className="range-controls__label">
            Speed: {phaserSpeed}Hz
            <input type="range" min="0.1" max="20" step="0.1" value={phaserSpeed} onChange={e => setPhaserSpeed(parseFloat(e.target.value))} />
          </label>
           <label className="range-controls__label">
            Octaves: {phaserOctaves}
            <input type="range" min="1" max="8" step="1" value={phaserOctaves} onChange={e => setPhaserOctaves(parseFloat(e.target.value))} />
          </label>
        </EffectColumn>

        {/* Delay */}
        <EffectColumn
          title="Delay"
          isActive={delayWet > 0}
          onToggle={() => setDelayWet(prev => prev > 0 ? 0 : 0.3)}
        >
           <label className="range-controls__label">
            Wet: {Math.round(delayWet * 100)}%
            <input type="range" min="0" max="1" step="0.1" value={delayWet} onChange={e => setDelayWet(parseFloat(e.target.value))} />
          </label>
          <label className="range-controls__label">
            Time: {delayTime}s
            <input type="range" min="0" max="1" step="0.01" value={delayTime} onChange={e => setDelayTime(parseFloat(e.target.value))} />
          </label>
           <label className="range-controls__label">
            Feedback: {Math.round(delayFeedback * 100)}%
            <input type="range" min="0" max="1" step="0.1" value={delayFeedback} onChange={e => setDelayFeedback(parseFloat(e.target.value))} />
          </label>
        </EffectColumn>

        {/* Ring Mod */}
        <EffectColumn
          title="Ring Mod"
          isActive={ringModWet > 0}
          onToggle={() => setRingModWet(prev => prev > 0 ? 0 : 0.5)}
        >
           <label className="range-controls__label">
            Wet: {Math.round(ringModWet * 100)}%
            <input type="range" min="0" max="1" step="0.1" value={ringModWet} onChange={e => setRingModWet(parseFloat(e.target.value))} />
          </label>
          <label className="range-controls__label">
            Freq: {ringModFreq}Hz
            <input type="range" min="0" max="2000" step="10" value={ringModFreq} onChange={e => setRingModFreq(parseFloat(e.target.value))} />
          </label>
        </EffectColumn>

      </div>
    </section>
  );
};

export default PianoControls;
