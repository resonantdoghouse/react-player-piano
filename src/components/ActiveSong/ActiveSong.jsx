function ActiveSong({ activeSong, activeSongData }) {
  return (
    <article className="pianoactiveSong activeSong">
      <header className="activeSong__header">
        <h2 className="activeSong__title">{activeSong.title}</h2>
        <p className="activeSong__artist">{activeSong.artist}</p>
        {activeSongData.header.bpm && (
          <p className="activeSong__bpm">BPM {activeSongData.header.bpm}</p>
        )}
      </header>
      {activeSongData.header.tempos &&
      activeSongData.header.tempos.length === 1 ? (
        <p className="activeSong__bpm">
          BPM{' '}
          {activeSongData.header.tempos.map((tempo, i) => {
            return <span key={i}>{tempo.bpm.toFixed(2)}</span>;
          })}
        </p>
      ) : null}

      {activeSongData.header.tempos &&
      activeSongData.header.tempos.length > 1 ? (
        <p className="activeSong__bpm">
          BPM{' '}
          {Math.round(Math.min(...activeSongData.header.tempos.map(t => t.bpm)))} -{' '}
          {Math.round(Math.max(...activeSongData.header.tempos.map(t => t.bpm)))}
        </p>
      ) : null}
    </article>
  );
}

export default ActiveSong;
