import { Card } from "../ui/card";
import servicesData from "./servicesData";
import Link from "next/link";
import { Service } from "@/types/service";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function ServiceCards() {
  return (
    <div className="container">
      <SectionTitle
        title="Our Services"
        paragraph="At Wachno Engineering, we offer a range of specialized services tailored to meet your needs."
        center
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {servicesData.map((service: Service) => (
          <Card
            key={service.id}
            className="bg-white text-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            style={{ height: "100%", width: "100%" }}
          >
            <div className="flex h-full flex-col justify-between">
              <Image
                alt={service.name}
                className="h-48 w-full rounded object-cover object-center"
                src={service.images[0]}
                width={200}
                height={260}
              />
              <Link
                href={`/services/${service.id}`}
                className="my-1 flex w-full flex-col gap-2 p-2"
              >
                <h2 className="mb-1 text-xl font-bold text-blue-500">
                  {service.name}
                </h2>
                <p className="mb-1 line-clamp-3 overflow-hidden text-pretty text-xs leading-relaxed">
                  {service.description.length > 200
                    ? `${service.description.substring(0, 200)}...`
                    : service.description}
                </p>
                <Link
                  href={`/services/${service.id}`}
                  className="flex w-full flex-row justify-center gap-2 rounded-md border p-1 text-blue-500 hover:underline"
                >
                  View more
                  <ChevronRight />
                </Link>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
