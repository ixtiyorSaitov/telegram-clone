import { FaTelegram } from "react-icons/fa";

const AddContact = () => {
  return (
    <div className="h-screen w-full flex z-40 relative">
      <div className="flex justify-center items-center z-50 w-full">
        <div className="flex flex-col items-center gap-4">
          <FaTelegram size={120} className="dark:text-blue-400 text-blue-500" />
          <h1>Add contact to start chatting</h1>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
