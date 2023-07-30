import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMic } from "react-icons/fi";

const SearchBarOnHeroSection = ({ onSearch, isSticky }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    onSearch(searchValue);
  };

  const handleVoiceSearch = (e) => {
    e.preventDefault(); // Prevent page reload

    const recognition = new window.webkitSpeechRecognition(); // Create an instance of SpeechRecognition
    recognition.lang = "en-US"; // Set the language for voice recognition

    // Event handler for speech recognition result
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
      onSearch(transcript);
    };

    setIsListening(true); // Update the listening state

    // Start listening for speech input
    recognition.start();

    // Event handler for speech recognition end
    recognition.onend = () => {
      setIsListening(false); // Update the listening state
    };
  };

  return (
    <form className="w-full flex items-center justify-center">
      <div
        className={`relative flex items-center ${
          isSticky ? "w-full" : "w-3/5"
        }  bg-white shadow-lg rounded-full overflow-hidden backdrop-blur-lg bg-opacity-40`}
      >
        <AiOutlineSearch className="p-2 text-gray-400" />
        <input
          className="w-full text-white py-3 pl-3 pr-10 bg-transparent border-none focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button
          className="p-2 mx-3 rounded-full bg-blue-200 text-gray-600 hover:bg-blue-400 focus:outline-none"
          onClick={handleVoiceSearch} // Handle voice search button click
        >
          {isListening ? "Listening..." : <FiMic className="h-5 w-5" />}
        </button>
        <button
          className={`p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white ${
            searchValue ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          type="submit"
          disabled={!searchValue}
        >
          <AiOutlineSearch className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBarOnHeroSection;
