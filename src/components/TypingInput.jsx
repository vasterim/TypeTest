import React from "react";

const TypingInput = ({ inputText, handleInputChange, disabled }) => {
  return (
    <input
      type="text"
      className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={inputText}
      onChange={handleInputChange}
      disabled={disabled}
      placeholder="Yazmaya başlayın..."
    />
  );
};

export default TypingInput;
