import Link from "next/link";
import { FaTelegram } from "react-icons/fa";
import TypographyWrapper from "./TypographyWrapper";

const JoinTelegram = () => {
  return (
    <TypographyWrapper>
      <div className="flex flex-col justify-center items-center mb-10 text-white">
        <h4 className="text-xl bg-gray-100 backdrop-blur-lg bg-opacity-40 p-2 rounded-md m-2 font-serif">
          For any movie 👇 request
        </h4>
        <Link
          href="https://t.me/j4b_movies_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-fit justify-center bg-blue-500  text-center py-2 px-4 rounded-md hover:bg-blue-600"
        >
          <FaTelegram className="mr-2 text-3xl" />
          Join Telegram
        </Link>
      </div>
    </TypographyWrapper>
  );
};

export default JoinTelegram;
