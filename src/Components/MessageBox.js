import React from "react";

const MessageBox = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className={`px-4 py-2 mb-4 rounded-lg text-sm font-medium ${
        type === "success"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {message}
    </div>
  );
};
export default MessageBox;