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
        <div className="activeSong__bpm">
          BPMs
          <ul className="activeSong__bpmList bpmList">
            {activeSongData.header.tempos.map((tempo, i) => {
              return (
                <li key={i} className="bpmList__item">
                  {tempo.bpm.toFixed(2)}
                </li>
              );
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
  );
}

export default ActiveSong;
