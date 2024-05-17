import { PhoneIcon } from "lucide-react";
import { Card } from "../ui/card";
import contactList from "./ContactData";

const Contact = () => {
  return (
    <div className=" py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Heading and description */}
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200 md:mb-6 lg:text-3xl">
            Our Contacts
          </h2>
          <p className="mx-auto max-w-screen-md text-gray-500 md:text-lg">
            Connect with us on various platforms. We are here to assist you.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          <Card className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
            <div className="mb-2 text-indigo-500">
              <PhoneIcon />
            </div>
            <div className="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
              Phone
            </div>
            <div className="text-sm font-semibold text-blue-600 sm:text-base">
              0705 383332
            </div>
          </Card>
          {contactList.map((contact, index) => (
            <Card
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8"
            >
              <div className="mb-2 text-indigo-500">{contact.icon}</div>
              <div className="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
                {contact.name}
              </div>
              <a
                href={contact.link}
                className="text-sm font-semibold text-blue-600 sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
