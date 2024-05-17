"use client";
import * as React from "react";
import Image from "next/image";
import hero from "/public/images/hero/hero.png";
import hero1 from "/public/images/hero/hero1.png";
import hero2 from "/public/images/hero/hero2.png";
import hero3 from "/public/images/hero/hero3.png";
import hero4 from "/public/images/hero/hero4.png";
import hero5 from "/public/images/hero/hero5.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  const images = [hero, hero1, hero2, hero3, hero4, hero5];

  return (
    <div
      className="mt-24 h-full w-full"
      style={{ paddingLeft: "0", paddingRight: "0" }}
    >
      {/* Mobile and medium screens */}
      <div className="lg:hidden">
        <Carousel
          showThumbs={false}
          showArrows={true}
          infiniteLoop={true}
          stopOnHover={false}
          autoPlay={true}
          autoFocus={true}
          swipeable={true}
          interval={6000}
          className="h-full overflow-x-hidden overflow-y-hidden"
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product Image ${index}`}
              className="object-center"
            />
          ))}
        </Carousel>
      </div>
      {/* LG and XL screens */}
      <div className="hidden lg:relative lg:m-auto lg:block lg:overflow-hidden">
        <Carousel
          showThumbs={false}
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          stopOnHover={false}
          autoFocus={true}
          swipeable={true}
          interval={6000}
          className="h-full w-full overflow-hidden"
          dynamicHeight={false}
          centerMode={true}
          centerSlidePercentage={100}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                src={image.src}
                alt={`Product Image ${index}`}
                className="h-auto w-auto"
                width={image.width}
                height={image.height}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
