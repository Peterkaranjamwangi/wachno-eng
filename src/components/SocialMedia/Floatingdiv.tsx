import { FloatingDivProps } from "@/types/contactdata";
import React from "react";

const FloatingDiv: React.FC<FloatingDivProps> = ({ contacts }) => {
  return (
    <div className="fixed right-0 top-[40%] z-20 -translate-y-1/2 transform p-2">
      <div className="flex flex-col gap-2">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 p-2 text-white hover:bg-gray-900"
          >
            {contact.icon}
            <span className="hidden">{contact.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingDiv;
