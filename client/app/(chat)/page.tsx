import ContactList from "./_components/contact-list";

const HomePage = () => {
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
