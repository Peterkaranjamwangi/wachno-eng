"use client";

import React from "react";
import { Card } from "../ui/card";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FcNext, FcPackage, FcPrevious } from "react-icons/fc";

const SingleProduct = ({ altText, description, images }) => {
  const customNextButton = (onClickHandler, hasPrev, label) => (
    <button
      type="button"
      onClick={onClickHandler}
      className="carousel-next-button absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-200"
    >
      <FcNext /> 
    </button>
  );

  const customPrevButton = (onClickHandler, hasNext, label) => (
    <button
      type="button"
      onClick={onClickHandler}
      className="carousel-prev-button absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-200"
    >
      <FcPrevious />
    </button>
  );

  return (
    <Card className="m-0 md:m-4">
      <section className="body-font text-gray-600">
        <div className="container mx-auto flex flex-wrap items-center justify-center px-0 py-4 ">
          <div className="w-full lg:w-1/2">
            <div className="flex h-full items-center justify-center">
              <Carousel
                showThumbs={false}
                showArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                autoFocus={true}
                swipeable={true}
                interval={6000}
                className="h-full w-full overflow-x-hidden overflow-y-hidden text-white"
                renderArrowNext={customNextButton}
                renderArrowPrev={customPrevButton}
              >
                {images.map((imageSrc, index) => (
                  <div key={index} className="relative h-64 w-full">
                    <Image
                      src={imageSrc}
                      alt={`${altText} - Image ${index + 1}`}
                      loading="lazy"
                      className="object-contain p-0"
                      fill
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="mt-4 w-full px-1.5 md:px-4 lg:mt-0 lg:w-1/2">
            <div className="flex h-full flex-col items-start justify-center">
              <p className="text-base leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default SingleProduct;
