


// "use client";

// import {
//   Search,
//   MapPin,
//   ChevronRight,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Youtube,
//   Bell,
//   Menu,
//   ChevronDown,
//   X,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Cookies from "universal-cookie";
// import md5 from "crypto-js/md5"; // For Gravatar

// const services = [
//   "Plumbing",
//   "Home cleaning",
//   "Electrical repairs",
//   "School tutoring",
//   "Carpentry",
// ];

// const stepOptions = [
//   { label: "Emergency", img: "/image/a.svg" },
//   { label: "Routine", img: "/image/b.svg" },
//   { label: "Installation", img: "/image/c.svg" },
// ];

// interface User {
//   id: string;
//   email: string;
//   role: "professional" | "client";
//   name?: string; // Optional name field
//   isEmailVerified?: boolean;
// }

// export default function ExpertSearchSection() {
//   const cookies = new Cookies();
//   const [service, setService] = useState("");
//   const [location, setLocation] = useState("");
//   const [showInitialModal, setShowInitialModal] = useState(false);
//   const [showStepModal, setShowStepModal] = useState(false);
//   const [step, setStep] = useState(0);
//   const [stepValue, setStepValue] = useState("");
//   const [customInput, setCustomInput] = useState("");
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Retrieve user data from cookie on mount
//   useEffect(() => {
//     const metadata = cookies.get("session_metadata");
//     if (metadata) {
//       setCurrentUser(metadata);
//     } else {
//       setCurrentUser(null);
//     }
//   }, []);

//   // Generate Gravatar URL based on email
//   const getGravatarUrl = (email: string) => {
//     const trimmedEmail = email.trim().toLowerCase();
//     const hash = md5(trimmedEmail).toString();
//     return `https://www.gravatar.com/avatar/${hash}?s=24&d=mp`; // s=24 for size, d=mp for default mystery person
//   };

//   const handleSearch = () => {
//     if (location.trim()) {
//       setShowInitialModal(true);
//     }
//   };

//   const handleStartSteps = () => {
//     setShowInitialModal(false);
//     setStep(0);
//     setStepValue("");
//     setCustomInput("");
//     setShowStepModal(true);
//   };

//   const handleNextStep = () => {
//     if (!stepValue && !customInput.trim()) return;
//     if (step < 2) {
//       setStep((prev) => prev + 1);
//       setStepValue("");
//       setCustomInput("");
//     } else {
//       // Final step, redirect
//       window.location.href = "/dashboard/client";
//     }
//   };

//   return (
//     <>
//       <section className="">
//         <header className="bg-[#f3f5f9] shadow-sm text-[#6D758F]">
//           <div className="max-w-[1500px] mx-auto px-4 py-4 flex justify-between items-center">
//             {/* Logo */}
//             <div className="text-3xl font-bold text-gray-700">
//               <Image
//                 src="/logo.svg"
//                 width={100}
//                 height={100}
//                 alt="logo"
//                 className="w-auto"
//               />
//             </div>

//             {/* Desktop Menu */}
//             <nav className="hidden md:flex items-center space-x-8 text-[#6D758F] font-medium">
//               <a href="#" className="hover:text-[#6D758F] transition">
//                 Home
//               </a>
//               <a href="#" className="hover:text-[#6D758F] transition">
//                 About
//               </a>
//               <a href="#" className="hover:text-[#6D758F] transition">
//                 Services
//               </a>
//             </nav>

//             {/* Right Side */}
//             <div className="flex items-center space-x-4">
//               {/* Profile */}
//               <div className="hidden md:flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm">
//                 {currentUser ? (
//                   <>
//                     <img
//                       src={getGravatarUrl(currentUser.email)}
//                       // width={24}
//                       // height={24}
//                       alt="Profile"
//                       className="rounded-full"
//                     />
//                     <span className="text-sm font-medium text-gray-700">
//                       {currentUser.email || currentUser.email.split("@")[0]}
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
//                       <span role="img" aria-label="user">
//                         👤
//                       </span>
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">
//                       Guest
//                     </span>
//                   </>
//                 )}
//                 <ChevronDown size={14} className="text-gray-500" />
//               </div>

//               {/* Notification Icon */}
//               <div className="bg-white p-2 rounded-full shadow-sm hidden md:block">
//                 <Bell className="text-blue-600 relative" size={18} />
//                 <span className="absolute top-[10px] right-[90px] w-2 h-2 bg-red-500 rounded-full"></span>
//               </div>

//               {/* Hamburger Button */}
//               <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="bg-gray-200 p-2 rounded-full md:hidden"
//               >
//                 {menuOpen ? <X size={20} /> : <Menu size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {menuOpen && (
//             <div className="md:hidden px-4 pb-4">
//               <nav className="flex flex-col space-y-2 text-gray-700">
//                 <a href="#" className="hover:text-gray-900">
//                   Home
//                 </a>
//                 <a href="#" className="hover:text-gray-900">
//                   About
//                 </a>
//                 <a href="#" className="hover:text-gray-900">
//                   Services
//                 </a>
//               </nav>
//             </div>
//           )}
//         </header>
//         {/* Rest of the component remains unchanged */}
//         <div>
//           <section className="bg-[#6D758F] py-12">
//             <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
//               <div className="w-full md:w-1/2 flex justify-center md:justify-start">
//                 <Image
//                   src="/image/client-hero.svg"
//                   alt="Expert Illustration"
//                   width={400}
//                   height={400}
//                   className="w-full max-w-xs md:max-w-sm h-auto"
//                 />
//               </div>

//               <div className="w-full md:w-1/2 text-center md:text-left">
//                 <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
//                   Choose the expert yourself!
//                 </h2>
//                 <p className="text-white text-sm md:text-base mb-6">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Mollis sit aliquam sit nullam.
//                 </p>

//                 <div className="flex flex-col md:flex-row items-stretch gap-4">
//                   <div className="flex flex-col md:flex-row bg-white rounded-md shadow-md  px-4 py-3 w-full">
//                     <div className="flex items-center border-b md:border-none py-2 md:py-0 w-full md:w-auto">
//                       <Search className="h-5 w-5 text-gray-400 mr-2" />
//                       <select
//                         value={service}
//                         onChange={(e) => setService(e.target.value)}
//                         className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
//                       >
//                         <option value="">Select a service</option>
//                         {services.map((s) => (
//                           <option key={s} value={s.toLowerCase()}>
//                             {s}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="hidden md:block w-px bg-gray-300 mx-4" />
//                     <div className="flex items-center py-2 md:py-0 w-full  md:w-auto">
//                       <MapPin className="h-5 w-5 text-gray-400 mr-2" />
//                       <input
//                         type="text"
//                         placeholder="Postcode"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         className="w-full md:w-24 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
//                       />
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleSearch}
//                     className="bg-white text-[#6D758F] font-semibold rounded-md shadow-md px-6 py-3 hover:bg-gray-100 transition"
//                   >
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Initial Modal */}
//           {showInitialModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
//               <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
//                 <button
//                   className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                   onClick={() => setShowInitialModal(false)}
//                 >
//                   ✕
//                 </button>
//                 <h3 className="text-xl font-semibold text-center mb-4">
//                   Let&apos;s find the right expert for your project
//                 </h3>
//                 <p className="text-center text-gray-500 text-sm mb-6">
//                   Answer a few brief questions to get matched with business pros
//                   who have the skills, experience and availability to get your
//                   project done
//                 </p>
//                 <div className="flex justify-center mb-6">
//                   <Image
//                     src="/image/expertt.svg"
//                     alt="Expert"
//                     width={120}
//                     height={120}
//                   />
//                 </div>
//                 <div className="text-sm text-center text-gray-500 mb-4">
//                   <Image
//                     src="/image/expertt.svg"
//                     alt="icon"
//                     width={20}
//                     height={20}
//                     className="inline-block mr-2"
//                   />
//                   Over 5,000 plumbers waiting for you
//                 </div>
//                 <button
//                   onClick={handleStartSteps}
//                   className="w-full bg-[#6D758F] text-white py-3 rounded-lg"
//                 >
//                   Find Pro Now
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step Modal */}
//           {showStepModal && step >= 0 && step <= 2 && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
//               <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
//                 <h3 className="text-xl font-semibold text-center mb-4">
//                   Step {step + 1} of 3
//                 </h3>
//                 <div className="grid grid-cols-3 gap-4 mb-4">
//                   {stepOptions.map((opt) => (
//                     <div
//                       key={opt.label}
//                       className={`cursor-pointer border rounded-lg p-2 text-center ${
//                         stepValue === opt.label
//                           ? "border-[#6D758F]"
//                           : "border-gray-200"
//                       }`}
//                       onClick={() => {
//                         setStepValue(opt.label);
//                         setCustomInput("");
//                       }}
//                     >
//                       <Image
//                         src={opt.img}
//                         alt={opt.label}
//                         width={60}
//                         height={60}
//                         className="mx-auto mb-2"
//                       />
//                       <span className="text-sm">{opt.label}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <input
//                   type="text"
//                   value={customInput}
//                   onChange={(e) => {
//                     setCustomInput(e.target.value);
//                     setStepValue("");
//                   }}
//                   placeholder="Other (please specify)"
//                   className="w-full border rounded-md px-3 py-2 text-sm mb-4"
//                 />
//                 <button
//                   onClick={handleNextStep}
//                   disabled={!stepValue && !customInput.trim()}
//                   className={`w-full py-3 rounded-lg text-white ${
//                     !stepValue && !customInput.trim()
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-[#6D758F]"
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//         <section className="max-w-[1329px] mx-auto px-4 py-6">
//           <div className="overflow-x-auto">
//             <div className="flex flex-nowrap gap-4 w-max">
//               {[...Array(10)].map((_, i) => (
//                 <div key={i} className="flex-shrink-0">
//                   <Image
//                     src="/image/client-img.svg"
//                     alt={`Expert ${i + 1}`}
//                     width={300}
//                     height={300}
//                     className="rounded-lg  h-auto object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section className="bg-white py-10 px-4 md:px-8">
//           <div className="max-w-[1329px] mx-auto">
//             <h2 className="text-center text-lg font-semibold text-[#6D758F] mb-6">
//               Our most popular services
//             </h2>

//             <ul className="space-y-4">
//               {services.map((service, idx) => (
//                 <li key={idx}>
//                   <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-md px-4 py-3 text-[#6D758F] font-medium">
//                     <div className="flex items-center gap-4">
//                       {/* Placeholder image icon */}
//                       <div className="w-8 h-8 bg-white border rounded flex items-center justify-center">
//                         <Image
//                           src="/icons/image-placeholder.svg"
//                           alt=""
//                           width={20}
//                           height={20}
//                         />
//                       </div>
//                       <span className="text-sm md:text-base">{service}</span>
//                     </div>
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>
//         <footer className="bg-white text-gray-400 lg:border-[1px] border-[#E1E4ED] my-8  text-sm lg:h-[500px] flex items-center justify-center">
//           <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-8 py-10  flex items-center flex-col ">
//             <div className="flex flex-col md:flex-row md:justify-between gap-10">
//               {/* Left side: About + Social icons */}
//               <div className="md:max-w-md">
//                 <p className="text-xl text-[#808080] font-medium mb-4">
//                   <Image
//                     src="/logo.svg"
//                     width={100}
//                     height={100}
//                     alt="logo"
//                     className="w-auto"
//                   />
//                 </p>
//                 <p className="text-xl text-[#808080] font-medium mb-4 lg:flex hidden">
//                   Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
//                   mauris sed ma
//                 </p>
//                 <div className="flex space-x-4 mt-6 md:mt-10">
//                   {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
//                     (Icon, idx) => (
//                       <div
//                         key={idx}
//                         className="w-10 h-10 text-[white] bg-[#5188FF] flex items-center justify-center rounded-md"
//                       >
//                         <Icon />
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>

//               {/* Right side: Links */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
//                 {/* Column 1 */}
//                 <div>
//                   <h4 className="text-[#6D758F] font-semibold mb-4">
//                     For customers
//                   </h4>
//                   <ul className="space-y-2 text-[#808080]">
//                     <li>How it works?</li>
//                     <li>Pricing</li>
//                     <li>Find a worker</li>
//                     <li>Refund policy</li>
//                     <li>Discounts</li>
//                   </ul>
//                 </div>
//                 {/* Column 2 */}
//                 <div>
//                   <h4 className="text-[#6D758F] font-semibold mb-4">
//                     For businesses
//                   </h4>
//                   <ul className="space-y-2 text-[#808080]">
//                     <li>How to join?</li>
//                     <li>Fees</li>
//                     <li>Best practices</li>
//                     <li>Promotions</li>
//                     <li>Rules</li>
//                   </ul>
//                 </div>
//                 {/* Column 3 */}
//                 <div>
//                   <h4 className="text-[#6D758F] font-semibold mb-4">Info</h4>
//                   <ul className="space-y-2 text-[#808080]">
//                     <li>About us</li>
//                     <li>Help center</li>
//                     <li>Blog</li>
//                     <li>FAQ</li>
//                     <li>Contact us</li>
//                   </ul>
//                 </div>
//                 {/* Column 4 */}
//                 <div>
//                   <h4 className="text-[#6D758F] font-semibold mb-4">
//                     Services
//                   </h4>
//                   <ul className="space-y-2 text-[#808080]">
//                     <li>Near me</li>
//                     <li>The most popular</li>
//                     <li>By category</li>
//                     <li>Companies</li>
//                     <li>All services</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="my-10 border-t border-gray-200" />

//             {/* Bottom section */}
//             <div className="flex flex-col items-center justify-center md:flex-row gap-4 text-center text-[#808080]">
//               <p>Copyright © 2025 Rodo | All Rights Reserved</p>
//               <div className="space-x-4">
//                 <a href="#" className="underline">
//                   Terms and Conditions
//                 </a>
//                 <a href="#" className="underline">
//                   Privacy Policy
//                 </a>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </section>
//     </>
//   );
// }
// // "use client";

// // import { Search, MapPin, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Youtube, Bell, Menu, ChevronDown, X } from "lucide-react";
// // import { useState } from "react";
// // import Image from "next/image";

// // const services = [
// //   "Plumbing",
// //   "Home cleaning",
// //   "Electrical repairs",
// //   "School tutoring",
// //   "Carpentry",
// // ];

// // const stepOptions = [
// //   { label: "Emergency", img: "/image/a.svg" },
// //   { label: "Routine", img: "/image/b.svg" },
// //   { label: "Installation", img: "/image/c.svg" },
// // ];

// // export default function ExpertSearchSection() {
// //   const [service, setService] = useState("");
// //   const [location, setLocation] = useState("");
// //   const [showInitialModal, setShowInitialModal] = useState(false);
// //   const [showStepModal, setShowStepModal] = useState(false);
// //   const [step, setStep] = useState(0);
// //   const [stepValue, setStepValue] = useState("");
// //   const [customInput, setCustomInput] = useState("");

// //   const handleSearch = () => {
// //     if (location.trim()) {
// //       setShowInitialModal(true);
// //     }
// //   };

// //   const handleStartSteps = () => {
// //     setShowInitialModal(false);
// //     setStep(0);
// //     setStepValue("");
// //     setCustomInput("");
// //     setShowStepModal(true);
// //   };

// //   const handleNextStep = () => {
// //     if (!stepValue && !customInput.trim()) return;
// //     if (step < 2) {
// //       setStep((prev) => prev + 1);
// //       setStepValue("");
// //       setCustomInput("");
// //     } else {
// //       // Final step, redirect
// //       window.location.href = "/dashboard/client";
// //     }
// //   };
  
// //   // const closeModal = () => setSelectedProfile(null);
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   return (
// //     <>
// //       <section className="">
// //         <header className="bg-[#f3f5f9] shadow-sm text-[#6D758F]">
// //           <div className="max-w-[1500px] mx-auto px-4 py-4 flex justify-between items-center">
// //             {/* Logo */}
// //             <div className="text-3xl font-bold text-gray-700">
// //               <Image
// //                 src="/logo.svg"
// //                 width={100}
// //                 height={100}
// //                 alt="logo"
// //                 className="w-auto"
// //               />
// //             </div>

// //             {/* Desktop Menu */}
// //             <nav className="hidden md:flex items-center space-x-8 text-[#6D758F] font-medium">
// //               <a href="#" className="hover:text-[#6D758F] transition">
// //                 Home
// //               </a>
// //               <a href="#" className="hover:text-[#6D758F] transition">
// //                 About
// //               </a>
// //               <a href="#" className="hover:text-[#6D758F] transition">
// //                 Services
// //               </a>
// //             </nav>

// //             {/* Right Side */}
// //             <div className="flex items-center space-x-4">
// //               {/* Profile */}
// //               <div className="hidden md:flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm">
// //                 <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
// //                   <span role="img" aria-label="user">
// //                     👤
// //                   </span>
// //                 </div>
// //                 <span className="text-sm font-medium text-gray-700">PAUL</span>
// //                 <ChevronDown size={14} className="text-gray-500" />
// //               </div>

// //               {/* Notification Icon */}
// //               <div className="bg-white p-2 rounded-full shadow-sm hidden md:block">
// //                 <Bell className="text-blue-600 relative" size={18} />
// //                 <span className="absolute top-[10px] right-[90px] w-2 h-2 bg-red-500 rounded-full"></span>
// //               </div>

// //               {/* Hamburger Button */}
// //               <button
// //                 onClick={() => setMenuOpen(!menuOpen)}
// //                 className="bg-gray-200 p-2 rounded-full md:hidden"
// //               >
// //                 {menuOpen ? <X size={20} /> : <Menu size={20} />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Mobile Menu */}
// //           {menuOpen && (
// //             <div className="md:hidden px-4 pb-4">
// //               <nav className="flex flex-col space-y-2 text-gray-700">
// //                 <a href="#" className="hover:text-gray-900">
// //                   Home
// //                 </a>
// //                 <a href="#" className="hover:text-gray-900">
// //                   About
// //                 </a>
// //                 <a href="#" className="hover:text-gray-900">
// //                   Services
// //                 </a>
// //               </nav>
// //             </div>
// //           )}
// //         </header>
// //         <div>
// //           <section className="bg-[#6D758F] py-12">
// //             <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
// //               <div className="w-full md:w-1/2 flex justify-center md:justify-start">
// //                 <Image
// //                   src="/image/client-hero.svg"
// //                   alt="Expert Illustration"
// //                   width={400}
// //                   height={400}
// //                   className="w-full max-w-xs md:max-w-sm h-auto"
// //                 />
// //               </div>

// //               <div className="w-full md:w-1/2 text-center md:text-left">
// //                 <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
// //                   Choose the expert yourself!
// //                 </h2>
// //                 <p className="text-white text-sm md:text-base mb-6">
// //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// //                   Mollis sit aliquam sit nullam.
// //                 </p>

// //                 <div className="flex flex-col md:flex-row items-stretch gap-4">
// //                   <div className="flex flex-col md:flex-row bg-white rounded-md shadow-md border px-4 py-3 w-full">
// //                     <div className="flex items-center border-b md:border-none py-2 md:py-0 w-full md:w-auto">
// //                       <Search className="h-5 w-5 text-gray-400 mr-2" />
// //                       <select
// //                         value={service}
// //                         onChange={(e) => setService(e.target.value)}
// //                         className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
// //                       >
// //                         <option value="">Select a service</option>
// //                         {services.map((s) => (
// //                           <option key={s} value={s.toLowerCase()}>
// //                             {s}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                     <div className="hidden md:block w-px bg-gray-300 mx-4" />
// //                     <div className="flex items-center py-2 md:py-0 w-full md:w-auto">
// //                       <MapPin className="h-5 w-5 text-gray-400 mr-2" />
// //                       <input
// //                         type="text"
// //                         placeholder="Postcode"
// //                         value={location}
// //                         onChange={(e) => setLocation(e.target.value)}
// //                         className="w-full md:w-24 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
// //                       />
// //                     </div>
// //                   </div>
// //                   <button
// //                     onClick={handleSearch}
// //                     className="bg-white text-[#6D758F] font-semibold rounded-md shadow-md px-6 py-3 hover:bg-gray-100 transition"
// //                   >
// //                     Search
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </section>

// //           {/* Initial Modal */}
// //           {showInitialModal && (
// //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
// //               <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
// //                 <button
// //                   className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
// //                   onClick={() => setShowInitialModal(false)}
// //                 >
// //                   ✕
// //                 </button>
// //                 <h3 className="text-xl font-semibold text-center mb-4">
// //                   Let’s find the right expert for your project
// //                 </h3>
// //                 <p className="text-center text-gray-500 text-sm mb-6">
// //                   Answer a few brief questions to get matched with business pros
// //                   who have the skills, experience and availability to get your
// //                   project done
// //                 </p>
// //                 <div className="flex justify-center mb-6">
// //                   <Image
// //                     src="/image/expertt.svg"
// //                     alt="Expert"
// //                     width={120}
// //                     height={120}
// //                   />
// //                 </div>
// //                 <div className="text-sm text-center text-gray-500 mb-4">
// //                   <Image
// //                     src="/image/expertt.svg"
// //                     alt="icon"
// //                     width={20}
// //                     height={20}
// //                     className="inline-block mr-2"
// //                   />
// //                   Over 5,000 plumbers waiting for you
// //                 </div>
// //                 <button
// //                   onClick={handleStartSteps}
// //                   className="w-full bg-[#6D758F] text-white py-3 rounded-lg"
// //                 >
// //                   Find Pro Now
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           {/* Step Modal */}
// //           {showStepModal && step >= 0 && step <= 2 && (
// //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
// //               <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
// //                 <h3 className="text-xl font-semibold text-center mb-4">
// //                   Step {step + 1} of 3
// //                 </h3>
// //                 <div className="grid grid-cols-3 gap-4 mb-4">
// //                   {stepOptions.map((opt) => (
// //                     <div
// //                       key={opt.label}
// //                       className={`cursor-pointer border rounded-lg p-2 text-center ${
// //                         stepValue === opt.label
// //                           ? "border-[#6D758F]"
// //                           : "border-gray-200"
// //                       }`}
// //                       onClick={() => {
// //                         setStepValue(opt.label);
// //                         setCustomInput("");
// //                       }}
// //                     >
// //                       <Image
// //                         src={opt.img}
// //                         alt={opt.label}
// //                         width={60}
// //                         height={60}
// //                         className="mx-auto mb-2"
// //                       />
// //                       <span className="text-sm">{opt.label}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <input
// //                   type="text"
// //                   value={customInput}
// //                   onChange={(e) => {
// //                     setCustomInput(e.target.value);
// //                     setStepValue("");
// //                   }}
// //                   placeholder="Other (please specify)"
// //                   className="w-full border rounded-md px-3 py-2 text-sm mb-4"
// //                 />
// //                 <button
// //                   onClick={handleNextStep}
// //                   disabled={!stepValue && !customInput.trim()}
// //                   className={`w-full py-3 rounded-lg text-white ${
// //                     !stepValue && !customInput.trim()
// //                       ? "bg-gray-300 cursor-not-allowed"
// //                       : "bg-[#6D758F]"
// //                   }`}
// //                 >
// //                   Next
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //         <section className="max-w-[1329px] mx-auto px-4 py-6">
// //           <div className="overflow-x-auto">
// //             <div className="flex flex-nowrap gap-4 w-max">
// //               {[...Array(10)].map((_, i) => (
// //                 <div key={i} className="flex-shrink-0">
// //                   <Image
// //                     src="/image/client-img.svg"
// //                     alt={`Expert ${i + 1}`}
// //                     width={300}
// //                     height={300}
// //                     className="rounded-lg  h-auto object-cover"
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>
// //         <section className="bg-white py-10 px-4 md:px-8">
// //           <div className="max-w-[1329px] mx-auto">
// //             <h2 className="text-center text-lg font-semibold text-[#6D758F] mb-6">
// //               Our most popular services
// //             </h2>

// //             <ul className="space-y-4">
// //               {services.map((service, idx) => (
// //                 <li key={idx}>
// //                   <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-md px-4 py-3 text-[#6D758F] font-medium">
// //                     <div className="flex items-center gap-4">
// //                       {/* Placeholder image icon */}
// //                       <div className="w-8 h-8 bg-white border rounded flex items-center justify-center">
// //                         <Image
// //                           src="/icons/image-placeholder.svg"
// //                           alt=""
// //                           width={20}
// //                           height={20}
// //                         />
// //                       </div>
// //                       <span className="text-sm md:text-base">{service}</span>
// //                     </div>
// //                     <ChevronRight className="w-4 h-4" />
// //                   </button>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </section>
// //         <footer className="bg-white text-gray-400 lg:border-[1px] border-[#E1E4ED] my-8  text-sm lg:h-[500px] flex items-center justify-center">
// //           <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-8 py-10  flex items-center flex-col ">
// //             <div className="flex flex-col md:flex-row md:justify-between gap-10">
// //               {/* Left side: About + Social icons */}
// //               <div className="md:max-w-md">
// //                 <p className="text-xl text-[#808080] font-medium mb-4">
// //                   <Image
// //                     src="/logo.svg"
// //                     width={100}
// //                     height={100}
// //                     alt="logo"
// //                     className="w-auto"
// //                   />
// //                 </p>
// //                 <p className="text-xl text-[#808080] font-medium mb-4 lg:flex hidden">
// //                   Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
// //                   mauris sed ma
// //                 </p>
// //                 <div className="flex space-x-4 mt-6 md:mt-10">
// //                   {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
// //                     (Icon, idx) => (
// //                       <div
// //                         key={idx}
// //                         className="w-10 h-10 text-[white] bg-[#5188FF] flex items-center justify-center rounded-md"
// //                       >
// //                         <Icon />
// //                       </div>
// //                     )
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Right side: Links */}
// //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
// //                 {/* Column 1 */}
// //                 <div>
// //                   <h4 className="text-[#6D758F] font-semibold mb-4">
// //                     For customers
// //                   </h4>
// //                   <ul className="space-y-2 text-[#808080]">
// //                     <li>How it works?</li>
// //                     <li>Pricing</li>
// //                     <li>Find a worker</li>
// //                     <li>Refund policy</li>
// //                     <li>Discounts</li>
// //                   </ul>
// //                 </div>
// //                 {/* Column 2 */}
// //                 <div>
// //                   <h4 className="text-[#6D758F] font-semibold mb-4">
// //                     For businesses
// //                   </h4>
// //                   <ul className="space-y-2 text-[#808080]">
// //                     <li>How to join?</li>
// //                     <li>Fees</li>
// //                     <li>Best practices</li>
// //                     <li>Promotions</li>
// //                     <li>Rules</li>
// //                   </ul>
// //                 </div>
// //                 {/* Column 3 */}
// //                 <div>
// //                   <h4 className="text-[#6D758F] font-semibold mb-4">Info</h4>
// //                   <ul className="space-y-2 text-[#808080]">
// //                     <li>About us</li>
// //                     <li>Help center</li>
// //                     <li>Blog</li>
// //                     <li>FAQ</li>
// //                     <li>Contact us</li>
// //                   </ul>
// //                 </div>
// //                 {/* Column 4 */}
// //                 <div>
// //                   <h4 className="text-[#6D758F] font-semibold mb-4">
// //                     Services
// //                   </h4>
// //                   <ul className="space-y-2 text-[#808080]">
// //                     <li>Near me</li>
// //                     <li>The most popular</li>
// //                     <li>By category</li>
// //                     <li>Companies</li>
// //                     <li>All services</li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Divider */}
// //             <div className="my-10 border-t border-gray-200" />

// //             {/* Bottom section */}
// //             <div className="flex flex-col items-center justify-center md:flex-row gap-4 text-center text-[#808080]">
// //               <p>Copyright © 2025 Rodo | All Rights Reserved</p>
// //               <div className="space-x-4">
// //                 <a href="#" className="underline">
// //                   Terms and Conditions
// //                 </a>
// //                 <a href="#" className="underline">
// //                   Privacy Policy
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </footer>
// //       </section>
// //     </>
// //   );
// // }
"use client";

import {
  Search,
  MapPin,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Bell,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Cookies from "universal-cookie";
import md5 from "crypto-js/md5";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const services = [
  "Plumbing",
  "Home cleaning",
  "Electrical repairs",
  "School tutoring",
  "Carpentry",
];

const stepOptions = [
  { label: "Emergency", img: "/image/a.svg" },
  { label: "Routine", img: "/image/b.svg" },
  { label: "Installation", img: "/image/c.svg" },
];

interface User {
  id: string;
  email: string;
  role: "professional" | "client";
  name?: string;
  isEmailVerified?: boolean;
}

export default function ExpertSearchSection() {
  const cookies = new Cookies();
  const router = useRouter();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [showStepModal, setShowStepModal] = useState(false);
  const [step, setStep] = useState(0);
  const [stepValue, setStepValue] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Retrieve user data from cookie on mount
  useEffect(() => {
    const metadata = cookies.get("session_metadata");
    if (metadata) {
      setCurrentUser(metadata);
    } else {
      setCurrentUser(null);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate Gravatar URL based on email
  const getGravatarUrl = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = md5(trimmedEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}?s=24&d=mp`;
  };

  // Handle logout
  const handleLogout = () => {
    cookies.remove("session_metadata", { path: "/" });
    cookies.remove("auth_token", { path: "/" }); // If applicable
    setCurrentUser(null);
    setDropdownOpen(false);
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    router.push("/auth/sign-in");
  };

  const handleSearch = () => {
    if (location.trim()) {
      setShowInitialModal(true);
    }
  };

  const handleStartSteps = () => {
    setShowInitialModal(false);
    setStep(0);
    setStepValue("");
    setCustomInput("");
    setShowStepModal(true);
  };

  const handleNextStep = () => {
    if (!stepValue && !customInput.trim()) return;
    if (step < 2) {
      setStep((prev) => prev + 1);
      setStepValue("");
      setCustomInput("");
    } else {
      window.location.href = "/dashboard/client";
    }
  };

  return (
    <>
      <section className="">
        <header className="bg-[#f3f5f9] shadow-sm text-[#6D758F]">
          <div className="max-w-[1500px] mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-3xl font-bold text-gray-700">
              <Image
                src="/logo.svg"
                width={100}
                height={100}
                alt="logo"
                className="w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8 text-[#6D758F] font-medium">
              <a href="#" className="hover:text-[#6D758F] transition">
                Home
              </a>
              <a href="#" className="hover:text-[#6D758F] transition">
                About
              </a>
              <a href="#" className="hover:text-[#6D758F] transition">
                Services
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Profile with Dropdown */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm"
                >
                  {currentUser ? (
                    <>
                      <img
                        src={getGravatarUrl(currentUser.email)}
                        // width={24}
                        // height={24}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {currentUser.name || currentUser.email.split("@")[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                        <span role="img" aria-label="user">
                          👤
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Guest
                      </span>
                    </>
                  )}
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                    {currentUser ? (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <a
                        href="/auth/sign-in"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign In
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Notification Icon */}
              <div className="bg-white p-2 rounded-full shadow-sm hidden md:block">
                <Bell className="text-blue-600 relative" size={18} />
                <span className="absolute top-[10px] right-[90px] w-2 h-2 bg-red-500 rounded-full"></span>
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-gray-200 p-2 rounded-full md:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4">
              <nav className="flex flex-col space-y-2 text-gray-700">
                <a href="#" className="hover:text-gray-900">
                  Home
                </a>
                <a href="#" className="hover:text-gray-900">
                  About
                </a>
                <a href="#" className="hover:text-gray-900">
                  Services
                </a>
                {currentUser ? (
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                ) : (
                  <a href="/auth/sign-in" className="hover:text-gray-900">
                    Sign In
                  </a>
                )}
              </nav>
            </div>
          )}
        </header>
        {/* Rest of the component remains unchanged */}
        <div>
          <section className="bg-[#6D758F] py-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <Image
                  src="/image/client-hero.svg"
                  alt="Expert Illustration"
                  width={400}
                  height={400}
                  className="w-full max-w-xs md:max-w-sm h-auto"
                />
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Choose the expert yourself!
                </h2>
                <p className="text-white text-sm md:text-base mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mollis sit aliquam sit nullam.
                </p>

                <div className="flex flex-col md:flex-row items-stretch gap-4">
                  <div className="flex flex-col md:flex-row bg-white rounded-md shadow-md border px-4 py-3 w-full">
                    <div className="flex items-center border-b md:border-none py-2 md:py-0 w-full md:w-auto">
                      <Search className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s.toLowerCase()}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="hidden md:block w-px bg-gray-300 mx-4" />
                    <div className="flex items-center py-2 md:py-0 w-full md:w-auto">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Postcode"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full md:w-24 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-white text-[#6D758F] font-semibold rounded-md shadow-md px-6 py-3 hover:bg-gray-100 transition"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Initial Modal */}
          {showInitialModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowInitialModal(false)}
                >
                  ✕
                </button>
                <h3 className="text-xl font-semibold text-center mb-4">
                  Let’s find the right expert for your project
                </h3>
                <p className="text-center text-gray-500 text-sm mb-6">
                  Answer a few brief questions to get matched with business pros
                  who have the skills, experience and availability to get your
                  project done
                </p>
                <div className="flex justify-center mb-6">
                  <Image
                    src="/image/expertt.svg"
                    alt="Expert"
                    width={120}
                    height={120}
                  />
                </div>
                <div className="text-sm text-center text-gray-500 mb-4">
                  <Image
                    src="/image/expertt.svg"
                    alt="icon"
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  Over 5,000 plumbers waiting for you
                </div>
                <button
                  onClick={handleStartSteps}
                  className="w-full bg-[#6D758F] text-white py-3 rounded-lg"
                >
                  Find Pro Now
                </button>
              </div>
            </div>
          )}

          {/* Step Modal */}
          {showStepModal && step >= 0 && step <= 2 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
                <h3 className="text-xl font-semibold text-center mb-4">
                  Step {step + 1} of 3
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {stepOptions.map((opt) => (
                    <div
                      key={opt.label}
                      className={`cursor-pointer border rounded-lg p-2 text-center ${
                        stepValue === opt.label
                          ? "border-[#6D758F]"
                          : "border-gray-200"
                      }`}
                      onClick={() => {
                        setStepValue(opt.label);
                        setCustomInput("");
                      }}
                    >
                      <Image
                        src={opt.img}
                        alt={opt.label}
                        width={60}
                        height={60}
                        className="mx-auto mb-2"
                      />
                      <span className="text-sm">{opt.label}</span>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => {
                    setCustomInput(e.target.value);
                    setStepValue("");
                  }}
                  placeholder="Other (please specify)"
                  className="w-full border rounded-md px-3 py-2 text-sm mb-4"
                />
                <button
                  onClick={handleNextStep}
                  disabled={!stepValue && !customInput.trim()}
                  className={`w-full py-3 rounded-lg text-white ${
                    !stepValue && !customInput.trim()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#6D758F]"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        <section className="max-w-[1329px] mx-auto px-4 py-6">
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap gap-4 w-max">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-shrink-0">
                  <Image
                    src="/image/client-img.svg"
                    alt={`Expert ${i + 1}`}
                    width={300}
                    height={300}
                    className="rounded-lg h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white py-10 px-4 md:px-8">
          <div className="max-w-[1329px] mx-auto">
            <h2 className="text-center text-lg font-semibold text-[#6D758F] mb-6">
              Our most popular services
            </h2>

            <ul className="space-y-4">
              {services.map((service, idx) => (
                <li key={idx}>
                  <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-md px-4 py-3 text-[#6D758F] font-medium">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-white border rounded flex items-center justify-center">
                        <Image
                          src="/icons/image-placeholder.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className="text-sm md:text-base">{service}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <footer className="bg-white text-gray-400 lg:border-[1px] border-[#E1E4ED] my-8 text-sm lg:h-[500px] flex items-center justify-center">
          <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-8 py-10 flex items-center flex-col">
            <div className="flex flex-col md:flex-row md:justify-between gap-10">
              <div className="md:max-w-md">
                <p className="text-xl text-[#808080] font-medium mb-4">
                  <Image
                    src="/logo.svg"
                    width={100}
                    height={100}
                    alt="logo"
                    className="w-auto"
                  />
                </p>
                <p className="text-xl text-[#808080] font-medium mb-4 lg:flex hidden">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
                  mauris sed ma
                </p>
                <div className="flex space-x-4 mt-6 md:mt-10">
                  {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
                    (Icon, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 text-[white] bg-[#5188FF] flex items-center justify-center rounded-md"
                      >
                        <Icon />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">
                    For customers
                  </h4>
                  <ul className="space-y-2 text-[#808080]">
                    <li>How it works?</li>
                    <li>Pricing</li>
                    <li>Find a worker</li>
                    <li>Refund policy</li>
                    <li>Discounts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">
                    For businesses
                  </h4>
                  <ul className="space-y-2 text-[#808080]">
                    <li>How to join?</li>
                    <li>Fees</li>
                    <li>Best practices</li>
                    <li>Promotions</li>
                    <li>Rules</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">Info</h4>
                  <ul className="space-y-2 text-[#808080]">
                    <li>About us</li>
                    <li>Help center</li>
                    <li>Blog</li>
                    <li>FAQ</li>
                    <li>Contact us</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#6D758F] font-semibold mb-4">
                    Services
                  </h4>
                  <ul className="space-y-2 text-[#808080]">
                    <li>Near me</li>
                    <li>The most popular</li>
                    <li>By category</li>
                    <li>Companies</li>
                    <li>All services</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-10 border-t border-gray-200" />

            <div className="flex flex-col items-center justify-center md:flex-row gap-4 text-center text-[#808080]">
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
      </section>
      <ToastContainer />
    </>
  );
}