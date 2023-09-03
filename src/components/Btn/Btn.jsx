import './Btn.scss';

function Btn({ text, onClick, className, disabled }) {
  console.log(disabled);
  return (
    <button disabled={disabled} onClick={onClick} className={`btn ${className}`}>
      {text}
    </button>
  );
}

export default Btn;
