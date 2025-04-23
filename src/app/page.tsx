"use client";

import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
interface TestimonialCardProps {
  name: string;
  title: string;
  text: string;
  img: string;
}
  const logos = [
    "/logos/netflix.svg",
    "/logos/buffer.svg",
    "/logos/stripe.svg",
    "/logos/framer.svg",
    "/logos/hubspot.svg",
    "/logos/dropbox.svg",
  ];
const stats = [
  {
    value: "200+",
    label: "Services offered",
    icon: "/placeholder-icon.svg",
    desc: "A wide range of trusted services — from home repairs to personal tutoring and beyond.",
  },
  {
    value: "99%",
    label: "Client satisfaction",
    icon: "/placeholder-icon.svg",
    desc: "Happy clients, happy homes. We’re proud of the smiles we help create every day",
  },
  {
    value: "34+",
    label: "Companies",
    icon: "/placeholder-icon.svg",
    desc: "Growing partnerships with businesses that trust our platform to get the job done right.",
  },
  {
    value: "100+",
    label: "Amazing clients",
    icon: "/placeholder-icon.svg",
    desc: "From first-timers to regulars, we’re lucky to serve an incredible community of clients.",
  },
];
const steps = [
  {
    number: "01",
    icon: "/image/how.svg",

    title: "Search for services",
    desc: "Use our powerful search tool to find trusted professionals in your area. Whether it's a plumber, electrician, or tutor, we've got you covered.",
  },
  {
    number: "02",
    icon: "/image/second.svg",

    title: "Choose a Professional",
    desc: "Browse detailed profiles, read reviews, and compare quotes to find the perfect match for your needs.",
  },
  {
    number: "03",
    icon: "/image/three.svg",

    title: "Hire and get the job done",
    desc: "Book your chosen provider directly through our platform and enjoy secure, hassle-free transactions.",
  },
  // {
  //   number: "04",
  //   icon: "/placeholder-icon.svg",

  //   title: "Step",
  //   desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  // },
  // {
  //   number: "05",
  //   title: "Step",
  //   desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  // },
  // {
  //   number: "06",
  //   title: "Step",
  //   desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  // },
];


const testimonials: TestimonialCardProps[] = [
  {
    name: "Marvin McKinney",
    title: "@actualmosalah",
    img: "/icons/marvin.svg",
    text: "I needed an electrician to fix a wiring issue at home, and this platform made it so easy to find someone reliable. The reviews helped me choose the right person, and the job was done perfectly!",
  },
  {
    name: "Floyd Miles",
    title: "brownbear646",
    img: "/icons/flyod.svg",

    text: "I needed a carpenter urgently, and this platform helped me find a skilled professional within minutes. The reviews really helped me choose someone reliable!",
  },
  {
    name: "Guy Hawkins",
    title: "yellowmouse215",
    img: "/icons/guy.svg",

    text: "As a freelance tutor, finding consistent work was tough. Since joining, I've had a steady stream of students, and the profile showcase helped me stand out",
  },

];




const TestimonialCard: FC<TestimonialCardProps> = ({ name, title, text, img }) => (
  <div className="border border-[#E1E4ED] rounded-xl p-6 shadow-md space-y-4 bg-white lg:h-[283px] flex flex-col  justify-center">
    <div className="flex space-x-1 text-[#B4B9C9]">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-current" />
        ))}
    </div>
    <p className="text-[#6D758F] text-sm leading-relaxed  text-left">
      “{text}”
    </p>
    <div className="flex items-center gap-3 pt-2">
      <div className="w-10 h-10 bg-[#F1F3F7] rounded-full flex items-center justify-center text-[#6D758F]">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg> */}
        <Image src={img} alt="testimonial" width={40} height={40} className="w-auto" />
      </div>
      <div className=" flex items-start justify-start text-left flex-col">
        <p className="font-semibold text-[#6D758F]">{name}</p>
        <p className="text-sm text-[#6D758F]">{title}</p>
      </div>
    </div>
  </div>
);
export default function Page() {
    

 const services = [
   {
     name: "Plumbing",
     description:
       "Fix leaks, install fittings, and get expert plumbing support fast.",
     image: "/icons/plumbing.svg",
   },
   {
     name: "Electrical work",
     description:
       "Certified electricians for wiring, lighting, and appliance issues.",
     image: "/icons/electrical.svg",
   },
   {
     name: "Carpentry",
     description:
       "Custom furniture, repairs, and woodwork crafted to perfection.",
     image: "/icons/cleaning.svg",
   },
   {
     name: "Home Cleaning",
     description:
       "Trusted cleaners for deep cleaning, maintenance, and post-renovation tidying.",
     image: "/icons/homeCleaning.svg",
   },
   {
     name: "AC & Appliance Repairs",
     description:
       "Quick fixes and servicing for air conditioners, fridges, and more.",
     image: "/icons/repairs.svg",
   },
   {
     name: "Tutoring Service",
     description:
       "Skilled tutors for academics, languages, and professional skills — online or at home.",
     image: "/icons/tutor.svg",
   },
 ];


  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
  return (
    <>
      <div className=" w-full items-center justify-center">
        <header className="bg-[#Fff] text-[#6B738C] fixed top-0 left-0 w-full z-50 shadow-sm">
          <div className="max-w-[1500px] mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
            {/* Logo */}
            <div className="text-3xl md:text-4xl font-bold tracking-wide drop-shadow-sm">
              <Image
                src="/logo.svg"
                width={100}
                height={100}
                alt="logo"
                className="w-auto"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-base">
              <Link href="#" className="hover:opacity-80 transition">
                Join as a Pro
              </Link>
              <Link href="#" className="hover:opacity-80 transition">
                Services
              </Link>
              <Link href="/auth/sign-in">
                <button className="border bg-[#fff]  border-[#5188FF] px-5 py-2 rounded-lg font-medium hover:shadow-sm transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/sign-up">
                <button className="bg-[#5188FF] text-[#fff] px-5 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-[#5e6378] transition">
                  Sign up <ArrowRight size={16} />
                </button>
              </Link>
            </nav>

            {/* Mobile Menu Icon */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Fullscreen Mobile Menu */}
          {isOpen && (
            <div className="fixed inset-0 bg-[#5188FF] text-[#fff] z-50 flex flex-col items-center justify-center space-y-8 transition-all duration-300">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>

              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium"
              >
                Join as a Pro
              </Link>

              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium"
              >
                Services
              </Link>

              <Link href="/auth/sign-in">
                <button className="border bg-[#fff]  border-[#5188FF] px-5 py-2 rounded-lg font-medium hover:shadow-sm transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/sign-up">
                <button className="bg-[#5188FF] text-[#fff] px-5 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-[#5e6378] transition">
                  Sign up <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          )}
        </header>

        <div className="w-full flex items-center justify-center bg-gray-100  h-[930px]  ">
          <section className="bg-white w-full max-w-[1500px] px-6 py-12 md:py-32  mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center ">
              {/* Left Image */}
              <div className="order-2 md:order-1 w-full h-80 md:h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
                <Image
                  src="/image/hero.svg"
                  width={100}
                  height={100}
                  className="w-auto"
                  alt="hero image"
                />
              </div>

              {/* Right Content */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-[800] text-[#414141] mb-4 leading-[48px]">
                  Find the Help <br className="hidden md:inline" />
                  You Need, All in One Place.
                </h1>
                <p className="text-[#6D758F] mb-8">
                  Need a reliable plumber, carpenter, or tutor? Connect with
                  verified professionals near you-fast, easy, and hassle free.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <button className="bg-[#5188FF] text-white px-6 py-3 rounded-md font-medium shadow hover:bg-[#5a6175] transition">
                    Get started →
                  </button>
                  <button className="bg-[#fff]  border-[#5188FF] border-[1px] text-[#6D758F] px-6 py-3 rounded-md font-medium hover:bg-[#e6ecf5] transition">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="px-6  bg-white text-center lg:h-[931px] py-10 ">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-12 mx-auto ">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6D758F] mb-4 leading-[40px]">
              Services
            </h2>
            {/* <p className="text-[#6D758F]">
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p> */}
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-center justify-center">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-[#F6F9FF]  border border-[#DDE5ED] md:w-[354px] h-[283px] rounded-xl shadow-md p-6 flex flex-col justify-center items-center text-center"
                >
                  <div className="mb-4">
                    <div className="rounded-md flex items-center justify-center">
                      <Image
                        src={service.image}
                        alt={`${service.name} icon`}
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-[20px] leading-[28px] text-[#6D758F] mb-2">
                    {service.name}
                  </h3>
                  <p className="text-[#6D758F] text-[16px] leading-[24px]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* See More */}
          <div className="mt-10">
            <button className="text-[#6D758F] font-medium hover:underline">
              See more
            </button>
          </div>
        </section>
        <section className="py-16 px-6 md:px-10 bg-gray-50 ">
          <div className="max-w-6xl px-4 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6D758F] mb-4">
              What our clients have to say
            </h2>
            {/* <p className="text-[#6D758F] max-w-2xl mx-auto mb-12">
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white py-16 overflow-hidden">
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6B738C]">Companies</h2>
            <p className="text-[#6B738C] mt-4 max-w-xl mx-auto md:block hidden">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
              mauris sed ma
            </p>
          </div> */}

          {/* Marquee container */}
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-marquee space-x-16">
              {[...logos, ...logos].map((logo, i) => (
                <Image
                  key={i}
                  src={logo}
                  alt="Company logo"
                  width={100}
                  height={100}
                  className="h-8 md:h-10 opacity-50 hover:opacity-100 transition duration-300"
                />
              ))}
            </div>
          </div>
        </section>
        <section
          style={{ backgroundImage: "url('/image/why.svg')" }}
          className="bg-no-repeat bg-center bg-cover py-16 px-4 lg:h-[652px] flex items-center justify-center rounded-[8px]"
        >
          <div className=" lg:h-[524px] py-10 items-center justify-center flex flex-col  rounded-xl max-w-[1500px] mx-auto w-full md:p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center  px-6">
              {/* Left side content */}
              <div className="flex flex-col items-start">
                {/* <div className="mb-4 md:block hidden md:text-left text-center flex md:justify-start justify-center  items-center md:items-start  ">
                  <Image
                    src="/placeholder-icon.svg"
                    alt="Icon"
                    width={48}
                    height={48}
                  />
                </div> */}
                <h2 className="text-2xl md:text-3xl font-bold text-[#fff] mb-2 md:text-left text-center flex md:justify-start justify-center  items-center md:items-start ">
                  Why Rodo?
                </h2>
                <p className="text-[#fff] text-align md:text-lg md:block  md:w-3/4">
                  We make it easy to find skilled, trustworthy artisans right
                  when you need them — no stress, no guesswork. Whether
                  you&apos;re fixing a leaky tap or looking to grow your service
                  business, we&apos;re here to help every step of the way.
                </p>
              </div>

              {/* Right side stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl md:my-0 my-3 p-4 shadow-md w-full border-[1px] border-[#E1E4ED] md:border-[#6D758F] h-[80px] md:h-auto lg:h-[180px] flex md:flex-col items-center md:items-center md:justify-center md:p-6 md:min-h-[140px] gap-4
        ${
          index === 1 || index === 3
            ? "md:-translate-y-5" // <== Elevated on medium and up
            : ""
        }
        ${
          index === 0
            ? "md:bg-[#5188FF] bg-white md:text-white text-[#475467]"
            : "bg-white text-[#475467]"
        }
        transition-transform duration-300
      `}
                  >
                    {/* Icon on the left for mobile, top for desktop */}
                    <div className="flex-shrink-0 md:hidden block">
                      <Image
                        src={stat.icon}
                        alt="icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex flex-col items-start md:items-center">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-base font-medium t">{stat.label}</p>
                      <p className="hidden md:block text-sm text-[#6D758F] text-center mt-2">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 max-w-[1500px] mx-auto px-6">
          <div className="text-center mb-12 md:px-0  px-4">
            <h2 className="text-3xl font-bold text-[#6D758F]">
              How does it work?
            </h2>
            {/* <p className="mt-4 text-[#6D758F] max-w-xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p> */}
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-3 gap-6 ">
            {steps.map((step, index) => (
              <div
                key={index}
                className="  flex items-center  justify-center flex-col"
              >
                <Image
                  src={step.icon}
                  alt={`Step ${index + 1}`}
                  width={48}
                  height={48}
                  className="w-auto"
                />
                <div className="flex items-center   ">
                  <div className="flex items-center  ">
                    <h3 className="text-4xl font-bold text-[#6D758F] mb-2 ">
                      {step.number}
                    </h3>
                  </div>
                  <div className="pl-4 text-left">
                    <h4 className="font-bold text-[#6D758F] text-left flex items-start">
                      {step.title}
                    </h4>
                    <p className="text-[#6D758F] text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col gap-6 px-4 ">
            {steps.slice(0, 4).map((_, index) => (
              <div
                key={index}
                className="border h-[283px] border-[#E1E4ED] rounded-lg px-6 py-10 text-center shadow-sm bg-white"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src="/placeholder-icon.svg" // Replace with actual icon if needed
                    alt={`Step ${index + 1}`}
                    width={48}
                    height={48}
                  />
                </div>
                <h4 className="font-bold text-[#6D758F] mb-2">
                  Step {index + 1}
                </h4>
                <p className="text-[#6D758F] text-sm">
                  Lorem ipsum dolor sit amet consecte tur adipiscing elit semper
                  dalar cons elementum tempus hac.
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="  py-12 sm:py-20 md:py-32 md:mx-0 mx-8  md:rounded-none ">
          <div className="bg-[#F5F5F5] max-w-[1500px] mx-auto rounded-[16px] flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Image Box */}
            <div className="w-full md:w-1/2 flex justify-center md:block hidden">
              <div className="w-full max-w-[600px] aspect-[3/2]  flex items-center justify-center">
                <Image
                  src="/placeholder-image-icon.svg"
                  alt="placeholder"
                  width={40}
                  height={40}
                  className="w-full"
                />
                {/* <div className="w-20 h-20 border border-[#9CA3AF] rounded-md flex items-center justify-center">
                </div> */}
              </div>
            </div>

            {/* Content Box */}
            <div className="w-full md:w-1/2 text-center md:text-left p-4">
              <h2 className="text-[#414141] text-4xl font-bold mb-4">
                Work with us
              </h2>
              <p className="text-[#737373] text-[14px] md:text-lg mb-8 ">
                Unlock new opportunities by joining our platform as a skilled
                professional. Whether you&apos;re a plumber, carpenter,
                electrician, tutor, or any other service provider, connecting
                with clients has never been easier.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <button className="bg-[#5188FF] text-[#fff] font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                  Get in touch
                  <span>→</span>
                </button>
                <button className="bg-[#fff]  border-[#5188FF] border-[1px] text-[#5188FF]  font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#374151] transition">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white text-gray-400 lg:border-[1px] border-[#E1E4ED] my-8  text-sm lg:h-[500px] flex items-center justify-center">
          <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-8 py-10  flex items-center flex-col ">
            <div className="flex flex-col md:flex-row md:justify-between gap-10">
              {/* Left side: About + Social icons */}
              <div className="md:max-w-md">
                <p className="text-xl text-gray-500 font-medium mb-4">
                  <Image
                    src="/logo.svg"
                    width={100}
                    height={100}
                    alt="logo"
                    className="w-auto"
                  />
                </p>
                <p className="text-xl text-[#6D758F] font-medium mb-4 lg:flex hidden">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
                  mauris sed ma
                </p>
                <div className="flex space-x-4 mt-6 md:mt-10">
                  {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
                    (Icon, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 text-[white] bg-[#B4B9C9] flex items-center justify-center rounded-md"
                      >
                        <Icon />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Right side: Links */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
                {/* Column 1 */}
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">
                    For customers
                  </h4>
                  <ul className="space-y-2 text-[#B4B9C9]">
                    <li>How it works?</li>
                    <li>Pricing</li>
                    <li>Find a worker</li>
                    <li>Refund policy</li>
                    <li>Discounts</li>
                  </ul>
                </div>
                {/* Column 2 */}
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">
                    For businesses
                  </h4>
                  <ul className="space-y-2 text-[#B4B9C9]">
                    <li>How to join?</li>
                    <li>Fees</li>
                    <li>Best practices</li>
                    <li>Promotions</li>
                    <li>Rules</li>
                  </ul>
                </div>
                {/* Column 3 */}
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">Info</h4>
                  <ul className="space-y-2 text-[#B4B9C9]">
                    <li>About us</li>
                    <li>Help center</li>
                    <li>Blog</li>
                    <li>FAQ</li>
                    <li>Contact us</li>
                  </ul>
                </div>
                {/* Column 4 */}
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">
                    Services
                  </h4>
                  <ul className="space-y-2 text-[#B4B9C9]">
                    <li>Near me</li>
                    <li>The most popular</li>
                    <li>By category</li>
                    <li>Companies</li>
                    <li>All services</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 border-t border-gray-200" />

            {/* Bottom section */}
            <div className="flex flex-col items-center justify-center md:flex-row gap-4 text-center text-[#B4B9C9]">
              <p>Copyright © 2025 Rodo | All Rights Reserved</p>
              <div className="space-x-4">
                <a href="#" className="underline">
                  Terms and Conditions
                </a>
                <a href="#" className="underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
