export default function Button({ type, text, handleClick, secondary }) {
  const className = text.toLowerCase().replace(/\s+/g, '-');

  return (
    <button 
      type={type} 
      className={`${className}-btn ${secondary? "secondary": "primary"}`} 
      onClick={handleClick}>
      <span>{text}</span>
    </button>
  );
}