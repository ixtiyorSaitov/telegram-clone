import { FaTelegram } from "react-icons/fa";

const AuthPage = () => {
  return (
    <div className="container2 w-full h-screen flex justify-center items-center flex-col space-y-4">
      <FaTelegram size={120} className="text-blue-500" />
      <div>
        <h1 className="text-4xl font-bold">Telegram</h1>
      </div>
      <p className="text-center text-muted-foreground text-sm">
        Telegram is a messaging app with a focus on speed and security, it{"'"}s
        super-fast, simple and free
      </p>
    </div>
  );
};

export default AuthPage;
