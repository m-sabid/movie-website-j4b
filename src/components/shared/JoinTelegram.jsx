import Link from "next/link";
import { FaTelegram } from "react-icons/fa";

const JoinTelegram = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-20 text-white">
        <h4 className="text-xl bg-gray-100 bg-opacity-30 p-2 rounded-full my-2">
          For any movie request
        </h4>
        <Link
          href="https://t.me/movies_ruquest_ars"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-fit justify-center bg-blue-500  text-center py-2 px-4 rounded-md hover:bg-blue-600"
        >
          <FaTelegram className="mr-2 text-3xl" />
          Join Telegram
        </Link>
      </div>
    </div>
  );
};

export default JoinTelegram;
