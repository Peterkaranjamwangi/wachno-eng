import React from "react";
import Link from "next/link";
import { Service } from "@/types/service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import servicesData from "./servicesData";
import { usePathname } from "next/navigation";

interface ServicesProps {}

const Services: React.FC<ServicesProps> = () => {
  const usePathName = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row gap-1 py-2 align-baseline text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">
          Our Services
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-50 dark:bg-gray-dark">
        {servicesData.map((service: Service) => (
          <DropdownMenuLabel key={service.id}>
            <Link
              href={`/services/${service.id}`}
              className="flex flex-row gap-1 text-blue-500 hover:underline"
            >
              {service.name} <ChevronRight />
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Services;
