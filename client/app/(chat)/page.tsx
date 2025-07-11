"use client";

import ContactList from "./_components/contact-list";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddContact from "./_components/add-contact";
import { useCurrentContact } from "@/hooks/use-current";

const HomePage = () => {
  const { currentContact } = useCurrentContact();
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <>
      {/* Sidebar */}

      <div className="w-80 h-screen border-r fixed inset-0 z-50">
        {/* Loading */}
        {/* <div className="w-full h-[95vh] flex justify-center items-center">
          <Loader2 size={50} className="animate-spin" />
        </div> */}

        <ContactList contacts={contacts} />
      </div>

      {/* Chat area */}
      <div className="pl-80 w-full">
        {/* Add contact */}
        {!currentContact && <AddContact />}
        {/* Chat */}

        {currentContact && <div>Chat</div>}
      </div>
    </>
  );
};

const contacts = [
  { email: "john@gmail.com", _id: "1", avatar: "" },
  { email: "jane@gmail.com", _id: "2", avatar: "" },
  { email: "jim@gmail.com", _id: "3", avatar: "" },
  { email: "jill@gmail.com", _id: "4", avatar: "" },
  { email: "jimmy@gmail.com", _id: "5", avatar: "" },
];

export default HomePage;
