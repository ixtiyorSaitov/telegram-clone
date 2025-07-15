"use client";

import ContactList from "./_components/contact-list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddContact from "./_components/add-contact";
import { useCurrentContact } from "@/hooks/use-current";
import { useForm } from "react-hook-form";
import z from "zod";
import { emailSchema, messageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import TopChat from "./_components/top-chat";
import Chat from "./_components/chat";
import { useLoading } from "@/hooks/use-loading";
import { axiosClient } from "@/http/axios";
import { useSession } from "next-auth/react";
import { generateToken } from "@/lib/generate-token";
import { IError, IUser } from "@/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const { setIsCreating, setIsLoading, isLoading } = useLoading();
  const { currentContact } = useCurrentContact();
  const { data: session } = useSession();
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

  const getContacts = async () => {
    setIsLoading(true);
    const token = await generateToken(session?.currentUser?._id);
    try {
      const { data } = await axiosClient.get<{ contacts: IUser[] }>(
        "/api/user/contacts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContacts(data.contacts);
    } catch (error) {
      console.log(error);

      toast.error("Error fetching contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    router.replace("/");
  }, []);

  useEffect(() => {
    if (session?.currentUser?._id) {
      getContacts();
    }
  }, [session?.currentUser]);

  const onCreateContact = async (values: z.infer<typeof emailSchema>) => {
    setIsCreating(true);
    const token = await generateToken(session?.currentUser?._id);
    try {
      const { data } = await axiosClient.post<{ contact: IUser }>(
        "/api/user/contact",
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContacts((prev) => [...prev, data.contact]);
      toast.success("Contact added successfully");
    } catch (error: unknown) {
      if ((error as IError).response?.data?.message) {
        return toast.error("Error", {
          description: (error as IError).response.data.message,
        });
      }
      return toast.error("Error", { description: "Something went wrong" });
    } finally {
      setIsCreating(false);
    }
  };

  const onSendMessage = (values: z.infer<typeof messageSchema>) => {
    setIsCreating(true);
  };

  return (
    <>
      {/* Sidebar */}

      <div className="w-80 h-screen border-r fixed inset-0 z-50">
        {/* Loading */}
        {isLoading && (
          <div className="w-full h-[95vh] flex justify-center items-center">
            <Loader2 size={50} className="animate-spin" />
          </div>
        )}

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

export default HomePage;
