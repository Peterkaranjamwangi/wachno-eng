"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import productData from "@/components/Products/ProductsData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleProduct from "@/components/Products/SingleProduct";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = productData.find((s) => s.id.toString() === params.id);

  if (!product) {
    return notFound();
  }

  // Split the description into sentences
  const sentences = product.description.split(/[.!?]/);
  // Extract the first sentence
  const firstSentence = sentences[0];

  return (
    <>
      <Breadcrumb pageName={product.name} description={firstSentence} />
      <SingleProduct
        images={product.images}
        altText={product.name}
        description={product.description}
      />
    </>
  );
}
