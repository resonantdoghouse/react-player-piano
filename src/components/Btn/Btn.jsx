import './Btn.scss';

function Btn({ text, onClick, className }) {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {text}
    </button>
  );
}

export default Btn;
