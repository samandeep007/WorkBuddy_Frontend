import React, { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = inputValue.trim();
      setTags((prevTags) => [...prevTags, newTag]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap items-center border border-gray-300 rounded-lg p-2 bg-white shadow-sm">
      {tags?.map((tag, index) => (
        <div
          key={index}
          className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-2 text-xs text-gray-900 hover:text-gray-600 focus:outline-none"
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-grow p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a tag"
      />
    </div>
  );
};

export default TagsInput;
