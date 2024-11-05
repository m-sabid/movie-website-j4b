import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMic } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SearchBarOnHeroSection = ({ onSearch, isSticky }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      onSearch(searchValue);
      // Store the input value in local storage
      sessionStorage.setItem("searchValue", searchValue);
      router.push("#all_movies"); // Use router.push to navigate
    }
  };

  const handleVoiceSearch = (e) => {
    e.preventDefault();

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
      onSearch(transcript);

      // Store the input value in local storage
      sessionStorage.setItem("searchValue", transcript);

      router.push("#all_movies"); // Use router.push to navigate
    };

    setIsListening(true);
    recognition.start();

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  useEffect(() => {
    // Fetch the stored value from local storage
    const storedValue = sessionStorage.getItem("searchValue");
    if (storedValue) {
      setSearchValue(storedValue);
      onSearch(storedValue);
    }
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);

    // Store the input value in local storage
    sessionStorage.setItem("searchValue", newValue);
  };

  return (
    <form
      className="w-full flex items-center justify-center"
      onSubmit={handleSearchSubmit}
    >
      <div
        className={`relative flex items-center ${
          isSticky ? "w-full" : "w-4/5"
        }  bg-white shadow-lg rounded-full overflow-hidden backdrop-blur-lg bg-opacity-40`}
      >
        <AiOutlineSearch className="p-2 text-gray-400" />
        <input
          className="w-full text-white py-3 pl-3 pr-10 bg-transparent border-none focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
        />
        <span
          className="p-2 mx-3 rounded-full bg-blue-200 text-gray-600 cursor-pointer hover:bg-blue-400 focus:outline-none"
          onClick={handleVoiceSearch}
        >
          {isListening ? "Listening..." : <FiMic className="h-5 w-5" />}
        </span>
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
