import { ContactData } from "@/types/contactdata";
import {
  FaFacebook,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa6";

const contactList: ContactData[] = [
  {
    icon: <FaFacebook size={24} />,
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100065510768675",
  },
  {
    icon: <FaWhatsapp size={24} />,
    name: "Whatsapp",
    link: "https://wa.me/254705383332",
  },
  {
    icon: <FaTiktok size={24} />,
    name: "Tiktok",
    link: "https://vm.tiktok.com/ZMMc91oUT/",
  },
];

export default contactList;
