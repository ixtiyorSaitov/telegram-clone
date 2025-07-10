import { FaTelegram } from "react-icons/fa";
import StateAuth from "./_component/state";
import Social from "./_component/social";

const AuthPage = () => {
  return (
    <div className="container2">
      <div className=" w-full max-w-md h-screen flex justify-center items-center flex-col space-y-4">
        <FaTelegram size={120} className="text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Telegram</h1>
        </div>
       
        <StateAuth />
        <Social />
      </div>
    </div>
  );
};

export default AuthPage;
