import { useContext, useState, useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMic } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import Link from "next/link";
import NoData from "@/components/shared/NoData";

const SearchBarOnHeroSection = ({ isSticky }) => {
  const { searchResults, fetchSearchResults, searchValue, setSearchValue } =
    useContext(AllMoviesContext);
  const [isListening, setIsListening] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the search
  const router = useRouter();
  const dropdownRef = useRef(null); // Ref for the dropdown container

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      fetchSearchResults(searchValue);

      // Smooth scroll to the #all_movies section
      const targetElement = document.querySelector("#all_movies");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue); // Update global state
    if (newValue.length >= 0) {
      setLoading(true); // Start loading while fetching results
      fetchSearchResults(newValue).finally(() => {
        setLoading(false); // Stop loading once results are fetched
      });
      setIsDropdownVisible(true); // Show dropdown on typing
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (movieName, e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the document
    setSearchValue(movieName); // Update global state
    fetchSearchResults(movieName);
    setIsDropdownVisible(false); // Optionally close dropdown after selection
  };

  // Handle voice search
  const handleVoiceSearch = (e) => {
    e.preventDefault();

    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice search.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript); // Update global state
      fetchSearchResults(transcript);
      setIsDropdownVisible(false); // Close dropdown
      router.push("#all_movies");
    };

    setIsListening(true);
    recognition.start();

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        e.target.tagName !== "INPUT"
      ) {
        setIsDropdownVisible(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center">
      <form
        className={`relative flex items-center ${
          isSticky ? "w-full" : "w-4/5"
        } bg-white shadow-lg rounded-full overflow-hidden backdrop-blur-lg bg-opacity-40`}
        onSubmit={handleSearchSubmit}
        ref={dropdownRef} // Attach ref to form container
      >
        <AiOutlineSearch className="p-2 text-gray-400" />
        <input
          className="w-full text-white py-3 pl-3 pr-10 bg-transparent border-none focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus
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
      </form>

      {isDropdownVisible && (
        <div
          className={`absolute left-0 right-0 top-full mt-2 bg-white text-gray-600 border rounded shadow z-10 max-h-60 overflow-auto mx-auto ${
            isSticky ? "w-full" : "w-4/5"
          }`}
          ref={dropdownRef}
        >
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="flex items-center justify-center ">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((movie) => (
              <Link
                href={`/movies/${movie._id}`}
                key={movie._id}
                onClick={(e) => handleSuggestionClick(movie.movieName, e)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-5"
              >
                <Image
                  src={movie.poster}
                  alt={movie.movieName.substring(0, 5)}
                  width={50}
                  height={100}
                />
                {movie.movieName}
              </Link>
            ))
          ) : (
            <NoData message="" />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarOnHeroSection;
