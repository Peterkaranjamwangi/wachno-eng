"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/products";
import productData from "../Products/ProductsData";
import { Service } from "@/types/service";
import servicesData from "../Services/servicesData";
import { Button } from "../ui/button";
import SocialMediaContacts from "../SocialMedia/SocialMediaContacts";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
        <div className="m-1 grid grid-cols-1 gap-4 md:m-4 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-2 rounded-lg">
            <div className="w-full">
              <Link
                href="/"
                className="mb-8 inline-block flex-grow bg-gray-100"
              >
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  className="w-full dark:hidden"
                  width={140}
                  height={30}
                />
              </Link>
              <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                Wachno Engineering prides itself on its client-focused approach,
                aiming to deliver high-quality products and tailored engineering
                solutions that meet and exceed clients&#39; expectations.
              </p>
            </div>
            <div className="w-full">
              <h2 className="mb-1 text-xl font-bold text-black dark:text-white">
                Useful Links
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <SocialMediaContacts />
          </div>
          <div className="flex flex-col gap-x-4 rounded-lg md:flex-row">
            <div className="my-1">
              <h2 className="mb-1 flex text-center text-xl font-bold text-black dark:text-white">
                Services
              </h2>
              <div className="flex flex-col gap-1">
                {servicesData.map((service: Service) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={service.id}
                    className="m-2"
                  >
                    <Link
                      href={`/services/${service.id}`}
                      className="flex flex-row gap-1 text-blue-500 hover:underline"
                    >
                      {service.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <div className="my-1">
              <h2 className="mb-1 self-center text-xl font-bold text-black dark:text-white">
                Products
              </h2>
              <div className="flex flex-col gap-1">
                {productData.map((product: Product) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={product.id}
                    className="m-2"
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="flex flex-row gap-1 text-blue-500 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="mr-1 flex flex-col justify-between p-0 md:mr-4 md:flex-row md:p-4">
            <div className="text-sm text-gray-500">
              © Wachno Engineering. All rights reserved.{" "}
              {new Date().getFullYear()}
            </div>
            <div className="flex flex-row gap-1 text-sm text-gray-500">
              website by
              <Link
                href="https://portfolio-peter-mwangi.vercel.app/"
                className="flex flex-row gap-1 text-blue-500 hover:underline"
              >
                Peter Mwangi
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-14 z-[-1]">
          <svg
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
            <mask
              id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="url(#paint0_radial_94:899)"
              />
              <g opacity="0.8" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
