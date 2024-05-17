import React from "react";
import serviceData from "@/components/Services/servicesData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleService from "@/components/Services/SingleService";
import { notFound } from "next/navigation";

export default function ServiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const service = serviceData.find((s) => s.id.toString() === params.id);

  if (!service) {
    return notFound();
  }

  // Split the description into sentences
  const sentences = service.description.split(/[.!?]/);
  // Extract the first sentence
  const firstSentence = sentences[0];

  return (
    <>
      <Breadcrumb pageName={service.name} description={firstSentence} />
      <div>
        <SingleService
          key={service.id}
          images={service.images}
          altText={service.name}
          description={service.description}
        />
      </div>
    </>
  );
}
