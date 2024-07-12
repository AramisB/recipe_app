const InputField = ({ type, id, value, onChange, placeholder }) => (
    <div className="input-field">
      <label htmlFor={id}>{placeholder}:</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
  
  export default InputField;
  