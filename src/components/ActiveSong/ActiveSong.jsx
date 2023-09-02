function ActiveSong({ activeSong }) {
  return (
    <article className="pianoactiveSong activeSong">
      <header className="activeSong__header">
        <h2 className="activeSong__title">{activeSong.title}</h2>
        <p className="activeSong__artist">{activeSong.artist}</p>
        {activeSong.data.header.bpm && (
          <p className="activeSong__bpm">BPM {activeSong.data.header.bpm}</p>
        )}
      </header>
      {activeSong.data.header.tempos &&
      activeSong.data.header.tempos.length === 1 ? (
        <p className="activeSong__bpm">
          BPM{' '}
          {activeSong.data.header.tempos.map((tempo, i) => {
            return <span key={i}>{tempo.bpm.toFixed(2)}</span>;
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
