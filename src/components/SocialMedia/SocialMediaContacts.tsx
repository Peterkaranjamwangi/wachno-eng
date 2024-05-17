import Link from "next/link";
import React from "react";
import ContactData from "../Contact/ContactData";

export default function SocialMediaContacts() {
  return (
    <div className="flex flex-wrap gap-4">
      {ContactData.map((contact, index) => (
        <Link
          key={index}
          href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full p-2 text-white hover:bg-gray-50 hover:text-blue-500"
        >
          {contact.icon}
          <span className="">{contact.name}</span>
        </Link>
      ))}
    </div>
  );
}
