export default function InputForm({
    type, 
    name, 
    placeholder, 
    value, 
    status, 
    message, 
  }) {
  
  return (
    <div className="inputField">
      <label htmlFor={name}>{name}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        name={name}
        value={value}
        className={`${name.toLowerCase().replace(/\s+/g, '-')}`} />
        {!status && <span>{message}</span>}
    </div>
  )
}
