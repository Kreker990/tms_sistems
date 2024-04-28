import React from "react";

function Input({
  errors,
  registerObject,
  value,
  onChange,
  placeholder,
  type,
  autoComplete,
  autoCorrect,
}) {
  return (
    <div className="h-20">
      <div
        className={`rounded-lg border p-2 ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
      >
        <input
          className="w-full focus:outline-none"
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          type={type || "text"}
          {...registerObject}
          value={value}
          onChange={onChange}
        />
      </div>
      {errors && (
        <span className="mt-1 text-sm text-red-500">{errors.message}</span>
      )}
    </div>
  );
}

export default Input;
