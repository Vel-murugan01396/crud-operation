import React, { useState } from "react";


export default function Tag(){
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
          setTags([...tags, inputValue.trim()]);
          setInputValue('');
        }
      };
    
      const handleTagRemove = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
      };
    return(<>
   <div className="max-w-md mx-auto">
      <div className="flex flex-wrap mb-4">
        {tags.map((tag, index) => (
          <div key={index} className="bg-lime-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center">
            <span >{tag}</span>
            <button className="ml-2 outline-none focus:outline-none" onClick={() => handleTagRemove(index)}>
              x
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Add tags..."
        className="bg-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
      />
    </div>
    </>)
}