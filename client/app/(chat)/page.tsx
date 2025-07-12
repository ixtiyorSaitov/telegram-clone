"use client";

import ContactList from "./_components/contact-list";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddContact from "./_components/add-contact";
import { useCurrentContact } from "@/hooks/use-current";
import { useForm } from "react-hook-form";
import z from "zod";
import { emailSchema, messageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import TopChat from "./_components/top-chat";
import Chat from "./_components/chat";

const HomePage = () => {
  const { currentContact } = useCurrentContact();
  const router = useRouter();

  const contactForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const messageForm = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
      image: "",
    },
  });

  useEffect(() => {
    router.replace("/");
  }, []);

  const onCreateContact = (values: z.infer<typeof emailSchema>) => {
    console.log(values);
  };

  const onSendMessage = (values: z.infer<typeof messageSchema>) => {
    // Api call to send message
    console.log(values);
  };

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
        {!currentContact && (
          <AddContact
            contactForm={contactForm}
            onCreateContact={onCreateContact}
          />
        )}
        {/* Chat */}

        {currentContact && (
          <div className="w-full relative">
            {/* Top chat */}
            <TopChat />
            {/* Chat message */}
            <Chat messageForm={messageForm} onSendMessage={onSendMessage} />
          </div>
        )}
      </div>
    </>
  );
};

const contacts = [
  {
    email: "john@gmail.com",
    _id: "1",
    avatar: "",
    firstName: "John",
    lastName: "Doe",
    bio: "Hello, I'm John",
  },
  {
    email: "jane@gmail.com",
    _id: "2",
    avatar: "",
    firstName: "Jane",
    lastName: "Doe",
    bio: "Hello, I'm Jane",
  },
  {
    email: "jim@gmail.com",
    _id: "3",
    avatar: "",
    firstName: "Jim",
    lastName: "Doe",
    bio: "Hello, I'm Jim",
  },
  {
    email: "jill@gmail.com",
    _id: "4",
    avatar: "",
    firstName: "Jill",
    lastName: "Doe",
    bio: "Hello, I'm Jill",
  },
  {
    email: "jimmy@gmail.com",
    _id: "5",
    avatar: "",
    firstName: "Jimmy",
    lastName: "Doe",
    bio: "Hello, I'm Jimmy",
  },
];

export default HomePage;
