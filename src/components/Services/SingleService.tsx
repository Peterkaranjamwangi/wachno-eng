"use client";

import React from "react";
import { Card } from "../ui/card";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SingleService = ({ altText, description, images }) => {
  return (
    <Card className="m-4">
      <section className="body-font text-gray-600">
        <div className="container mx-auto flex flex-wrap items-center justify-center px-5 py-4">
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
              >
                {images.map((imageSrc, index) => (
                  <div key={index} className="relative h-64">
                    <Image
                      src={imageSrc}
                      alt={`${altText} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      className="object-contain p-0"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="mt-6 w-full px-8 lg:mt-0 lg:w-1/2 lg:px-12">
            <div className="flex h-full flex-col items-start justify-center">
              <p className="text-base leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default SingleService;
