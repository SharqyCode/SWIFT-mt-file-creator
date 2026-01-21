const TextInput = ({ field, error, caption, ...rest }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={field} className="text-sm font-medium">
      {field}
    </label>
    <input
      id={field}
      name={field}
      className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 disabled:bg-gray-200 disabled:text-gray-700
        ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
      {...rest}
    />
    {caption && <p className="text-xs text-gray-400">{caption}</p>}
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

export default TextInput;
