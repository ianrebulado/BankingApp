export default function Button({type, text, handleClick}) {
  return (
    <button type={type} className={`${text.toLowerCase().replace(/\s+/g, '-')}-btn`} onClick={() => handleClick}><span>{text}</span></button>
  )
}
