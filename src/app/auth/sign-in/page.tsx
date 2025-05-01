
// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface FormErrors {
//   [key: string]: string | undefined;
// }

// interface SignInResponse {
//   user?: { userType: "business" | "client" };
// }

// const API_URL = "https://api.myrodo.com/auth/login";

// export default function SignIn() {
//   const router = useRouter();
//   const [isBusinessClient, setIsBusinessClient] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("Omitoyinayomide20@gmail.com");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "email") setEmail(value);
//     else if (name === "password") setPassword(value);
//   };

//   const validate = (): FormErrors => {
//     const newErrors: FormErrors = {};
//     if (!email.trim()) newErrors.email = "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       newErrors.email = "Invalid email format";
//     if (!password) newErrors.password = "Password is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setApiError(null);

//     const formErrors = validate();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       setIsLoading(false);
//       return;
//     }

//     const apiPayload = {
//       email,
//       password,
//       userType: isBusinessClient ? "business" : "client",
//     };

//     try {
//       console.log("Sending request to:", API_URL, "with payload:", apiPayload);
//       const response = await axios.post<SignInResponse>(API_URL, apiPayload, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true, // Enable cookies
//       });

//       console.log("Sign-in success:", response.data);

//       // Determine userType from response or payload
//       const userType = response.data.user?.userType || apiPayload.userType;

//       setApiError(null);

//       // Redirect based on userType
//       if (userType === "business") {
//         router.push("/business/dashboard/dashboard");
//       } else {
//         router.push("/client/client");
//       }
//     } catch (error: any) {
//       console.error("Sign-in failed:", error);
//       if (error.code === "ERR_NETWORK") {
//         setApiError(
//           "Unable to connect to the server. Please check your internet connection or try again later."
//         );
//       } else if (error.response) {
//         setApiError(
//           error.response.data?.message ||
//             `Sign-in failed with status ${error.response.status}. Please check your credentials and try again.`
//         );
//       } else {
//         setApiError("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     // Expire the auth_token cookie
//     document.cookie =
//       "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict";
//     router.push("/auth/sign-in");
//   };

//   // Check for auth_token cookie (client-side approximation)
//   const isSignedIn = document.cookie.includes("auth_token=");

//   return (
//     <>
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap"
//           rel="stylesheet"
//         />
//         <meta
//           httpEquiv="Content-Security-Policy"
//           content="script-src 'self'; object-src 'none';"
//         />
//       </Head>
//       <div
//         className="flex items-center justify-center outfit-font bg-no-repeat bg-center bg-cover"
//         style={{ backgroundImage: "url('/sign.svg')" }}
//       >
//         <div className="min-h-screen flex flex-col bg-white bg-no-repeat bg-center bg-cover lg:flex-row items-center justify-center max-w-[1280px] mx-auto">
//           <div
//             style={{ backgroundImage: "url('/signs.svg')" }}
//             className="hidden lg:flex lg:w-1/2 flex-col justify-center bg-no-repeat bg-center ml-4 bg-cover p-12 rounded-3xl lg:h-[906px] lg:w-[500px]"
//           >
//             {isBusinessClient ? (
//               <>
//                 <h1 className="text-[48px] hidden font-bold text-[#6D758F] mb-6 lg:leading-[60px]">
//                   Welcome Back, Business Client!
//                 </h1>
//                 <p className="text-[#6D758F] hidden text-[20px] leading-[24px]">
//                   Log in to manage your projects, connect with talent, and grow
//                   your business with MyRodo.
//                 </p>
//               </>
//             ) : (
//               <>
//                 <h1 className="text-[48px] hidden font-bold text-[#6D758F] mb-6 lg:leading-[60px]">
//                   Welcome Back, Private Client!
//                 </h1>
//                 <p className="text-[#6D758F] hidden text-[20px] leading-[24px]">
//                   Log in to find skilled artisans and trusted freelancers for
//                   your projects with MyRodo.
//                 </p>
//               </>
//             )}
//           </div>
//           <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10">
//             <div className="w-full max-w-md">
//               <h2 className="flex justify-center lg:justify-end mb-8">
//                 <Link href="/">
//                   <Image
//                     src="/logo.svg"
//                     width={100}
//                     height={100}
//                     alt="logo"
//                     className="w-auto"
//                   />
//                 </Link>
//               </h2>

//               <div className="flex justify-center mb-6">
//                 <div className="flex w-full max-w-sm bg-[#F0F0F0] rounded-full p-1">
//                   {["Private Client", "Business Client"].map((label, idx) => (
//                     <button
//                       key={label}
//                       type="button"
//                       onClick={() => setIsBusinessClient(idx === 1)}
//                       className={`flex-1 py-2 rounded-full font-semibold ${
//                         (isBusinessClient && idx === 1) ||
//                         (!isBusinessClient && idx === 0)
//                           ? "bg-[#6D758F] text-white"
//                           : "text-gray-600"
//                       }`}
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <h3 className="text-xl font-semibold text-[#6D758F] mb-1">
//                 Sign In to MyRodo
//               </h3>
//               <p className="text-sm text-[#6D758F] mb-6">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               </p>

//               {apiError && (
//                 <p className="text-red-500 text-sm mb-4 text-center">
//                   {apiError}
//                 </p>
//               )}

//               {isSignedIn && (
//                 <div className="text-center mb-4">
//                   <p className="text-[#6D758F]">Already signed in</p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-[#6D758F] font-semibold underline"
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               )}

//               {!isSignedIn && (
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                   <div>
//                     <label className="block text-sm font-medium text-[#6D758F] mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={email}
//                       onChange={handleChange}
//                       className="w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#6D758F] mb-1">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={password}
//                         onChange={handleChange}
//                         className="w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
//                         placeholder="Enter your password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         className="absolute right-3 inset-y-0 flex items-center text-[#6D758F] hover:text-gray-700"
//                       >
//                         {showPassword ? (
//                           <EyeOff size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                     {errors.password && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.password}
//                       </p>
//                     )}
//                   </div>

//                   <p className="text-center text-sm text-[#6D758F] mt-4">
//                     <Link href="/auth/forgot-password">
//                       <span className="text-[#6D758F] font-semibold cursor-pointer">
//                         Forgot Password?
//                       </span>
//                     </Link>
//                   </p>

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-[#6D758F] hover:bg-gray-700 text-white font-semibold py-3 rounded-md shadow-md disabled:opacity-50"
//                   >
//                     {isLoading ? "Signing In..." : "Sign In"}
//                   </button>
//                 </form>
//               )}

//               <div className="my-6 flex items-center">
//                 <div className="flex-grow h-px bg-gray-300" />
//                 <span className="mx-4 text-sm text-[#6D758F]">
//                   Or sign in via
//                 </span>
//                 <div className="flex-grow h-px bg-gray-300" />
//               </div>

//               <div className="flex gap-4 justify-center">
//                 <button className="flex items-center justify-center w-1/2 p-3 border border-gray-300 rounded-md">
//                   <svg
//                     width="29"
//                     height="29"
//                     viewBox="0 0 29 29"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M26.3486 12.1338H25.3753V12.0837H14.5003V16.917H21.3292C20.333 19.7306 17.6559 21.7503 14.5003 21.7503C10.4965 21.7503 7.25033 18.5041 7.25033 14.5003C7.25033 10.4965 10.4965 7.25033 14.5003 7.25033C16.3485 7.25033 18.0299 7.94753 19.3101 9.08639L22.7279 5.66862C20.5698 3.65735 17.6831 2.41699 14.5003 2.41699C7.8273 2.41699 2.41699 7.8273 2.41699 14.5003C2.41699 21.1733 7.8273 26.5837 14.5003 26.5837C21.1733 26.5837 26.5837 21.1733 26.5837 14.5003C26.5837 13.6901 26.5003 12.8993 26.3486 12.1338Z"
//                       fill="#FFC107"
//                     />
//                     <path
//                       d="M3.80957 8.87614L7.77955 11.7876C8.85376 9.12808 11.4553 7.25033 14.4997 7.25033C16.3478 7.25033 18.0292 7.94753 19.3095 9.08639L22.7272 5.66862C20.5692 3.65735 17.6824 2.41699 14.4997 2.41699C9.85849 2.41699 5.83353 5.03726 3.80957 8.87614Z"
//                       fill="#FF3D00"
//                     />
//                     <path
//                       d="M14.5004 26.5833C17.6215 26.5833 20.4574 25.3888 22.6016 23.4464L18.8618 20.2818C17.6081 21.2358 16.0758 21.7516 14.5004 21.7499C11.3575 21.7499 8.68887 19.7459 7.68354 16.9492L3.74316 19.9852C5.74296 23.8983 9.80416 26.5833 14.5004 26.5833Z"
//                       fill="#4CAF50"
//                     />
//                     <path
//                       d="M26.3483 12.1332H25.375V12.083H14.5V16.9163H21.3289C20.8523 18.2554 19.9939 19.4256 18.8597 20.2822L18.8615 20.2809L22.6013 23.4456C22.3366 23.686 26.5833 20.5413 26.5833 14.4997C26.5833 13.6895 26.5 12.8986 26.3483 12.1332Z"
//                       fill="#1976D2"
//                     />
//                   </svg>
//                 </button>

//                 <button className="flex items-center justify-center w-1/2 p-3 border border-gray-300 rounded-md">
//                   <svg
//                     width="25"
//                     height="29"
//                     viewBox="0 0 25 29"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M12.0836 6.99376C11.7749 5.31096 12.5706 3.57918 13.5289 2.4121C14.5849 1.12437 16.3972 0.136844 17.946 0.0283203C18.2076 1.79262 17.4876 3.51161 16.5399 4.72751C15.5232 6.03376 13.7751 7.04672 12.0836 6.99376ZM21.1682 13.0914C21.6474 11.7543 22.5968 10.5514 24.0697 9.73969C22.5813 7.88234 20.4916 6.80401 18.5195 6.80401C15.9104 6.80401 14.8072 8.0471 12.9949 8.0471C11.128 8.0471 9.71173 6.80401 7.45171 6.80401C5.23553 6.80401 2.8765 8.15478 1.3804 10.4617C0.830305 11.3144 0.457666 12.3738 0.25444 13.5537C-0.309474 16.8637 0.532886 21.1751 3.04563 25.0033C4.26737 26.8609 5.89585 28.9532 8.02327 28.9715C9.91841 28.99 10.456 27.7598 13.0216 27.7471C15.5909 27.7325 16.0778 28.9842 17.9704 28.9661C20.0984 28.9482 21.8166 26.6326 23.0384 24.7752C23.9083 23.4424 24.2373 22.7691 24.9137 21.2622C21.4741 19.9651 20.0595 16.1749 21.1682 13.0914Z"
//                       fill="black"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <p className="text-center text-sm text-[#6D758F] mt-6">
//                 Don&apos;t have an account?{" "}
//                 <Link href="/auth/sign-up">
//                   <span className="text-[#6D758F] font-semibold cursor-pointer">
//                     Sign up
//                   </span>
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormErrors {
  [key: string]: string | undefined;
}

interface SignInResponse {
  success?: boolean;
  message?: string;
  data?: {
    user: { role: "professional" | "client"; email: string; id: string };
    token: string;
  };
}

interface User {
  id: string;
  email: string;
  role: "professional" | "client";
  isEmailVerified?: boolean;
}

const API_URL = "https://api.myrodo.com/auth/login";

export default function SignIn() {
  const router = useRouter();
  const cookies = new Cookies();
  const [isProfessional, setIsProfessional] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("Omitoyinayomide20@gmail.com");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check session metadata on mount
  useEffect(() => {
    const metadata = cookies.get("session_metadata");
    if (metadata) {
      setCurrentUser(metadata);
    } else {
      setCurrentUser(null);
    }
  }, [cookies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value.trim());
    else if (name === "password") setPassword(value);
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const formErrors = validate();
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     Object.values(formErrors).forEach((error) =>
  //       toast.error(error, { position: "top-right", autoClose: 5000 })
  //     );
  //     setIsLoading(false);
  //     return;
  //   }

  //   const apiPayload = {
  //     email,
  //     password,
  //     role: isProfessional ? "professional" : "client",
  //   };

  //   try {
  //     const response = await axios.post<SignInResponse>(API_URL, apiPayload, {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     });

  //     const user = response.data.user;
  //     if (!user) {
  //       throw new Error(
  //         response.data.message || "User data not returned from server"
  //       );
  //     }

  //     // Store non-sensitive metadata in session_metadata cookie
  //     const metadata: User = {
  //       id: user.id,
  //       email: user.email,
  //       role: user.role,
  //       isEmailVerified: true, // Assume verified unless API indicates otherwise
  //     };
  //     cookies.set("session_metadata", metadata, {
  //       path: "/",
  //       maxAge: 86400, // 24 hours
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //     });

  //     setCurrentUser(metadata);
  //     toast.success(response.data.message || "Signed in successfully!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });

  //     // Redirect based on role (only on success)
  //     if (user.role === "professional") {
  //       router.push("/business/dashboard/dashboard");
  //     } else {
  //       router.push("/client/client");
  //     }
  //   } catch (error: any) {
  //     console.error("Sign-in failed:", error);
  //     let errorMessage = "An unexpected error occurred. Please try again.";

  //     if (error.code === "ERR_NETWORK") {
  //       errorMessage =
  //         "Unable to connect to the server. Please check your internet connection.";
  //     } else if (error.response) {
  //       const { message, error: apiError } = error.response.data || {};
  //       errorMessage = message || apiError || "Sign-in failed.";

  //       // Handle email not verified
  //       if (
  //         errorMessage.toLowerCase().includes("email not verified") ||
  //         error.response.status === 403
  //       ) {
  //         errorMessage = "Please verify your email before signing in.";
  //         toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
  //         setTimeout(() => {
  //           router.push(
  //             `/auth/email-verify?email=${encodeURIComponent(email)}`
  //           );
  //         }, 3000);
  //         setIsLoading(false);
  //         return;
  //       }
  //     } else if (error.message) {
  //       errorMessage = error.message; // Use thrown error message
  //     }

  //     // Show all errors as toasts
  //     toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
  //     setIsLoading(false);
  //   }
  // };
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);

//   const formErrors = validate();
//   if (Object.keys(formErrors).length > 0) {
//     setErrors(formErrors);
//     Object.values(formErrors).forEach((error) =>
//       toast.error(error, { position: "top-right", autoClose: 5000 })
//     );
//     setIsLoading(false);
//     return;
//   }

//   const apiPayload = {
//     email,
//     password,
//     role: isProfessional ? "professional" : "client",
//   };

//   try {
//     const response = await axios.post<SignInResponse>(API_URL, apiPayload, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });

//     // Only proceed if success is true
//     if (!response.data.success) {
//       toast.error(response.data.message || "Login failed", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       setIsLoading(false);
//       return;
//     }

//     const user = response.data.data?.user;
//     const token = response.data.data?.token;

//     if (!user || !token) {
//       throw new Error("User data or token missing from response.");
//     }

//     const metadata: User = {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//       isEmailVerified: true,
//     };

//     cookies.set("session_metadata", metadata, {
//       path: "/",
//       maxAge: 86400,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     setCurrentUser(metadata);

//     // ✅ Redirect only on success, without toast
//     if (user.role === "professional") {
//       router.push("/business/dashboard/dashboard");
//     } else {
//       router.push("/client/client");
//     }
//   } catch (error: any) {
//     console.error("Sign-in failed:", error);
//     let errorMessage = "An unexpected error occurred. Please try again.";

//     if (error.code === "ERR_NETWORK") {
//       errorMessage =
//         "Unable to connect to the server. Please check your internet connection.";
//     } else if (error.response) {
//       const { message, error: apiError } = error.response.data || {};
//       errorMessage = message || apiError || "Sign-in failed.";

//       if (
//         errorMessage.toLowerCase().includes("email not verified") ||
//         error.response.status === 403
//       ) {
//         errorMessage = "Please verify your email before signing in.";
//         toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
//         setTimeout(() => {
//           router.push(`/auth/email-verify?email=${encodeURIComponent(email)}`);
//         }, 3000);
//         setIsLoading(false);
//         return;
//       }
//     } else if (error.message) {
//       errorMessage = error.message;
//     }

//     toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
//     setIsLoading(false);
//   }
// };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const formErrors = validate();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    Object.values(formErrors).forEach((error) =>
      toast.error(error, { position: "top-right", autoClose: 5000 })
    );
    setIsLoading(false);
    return;
  }

  const apiPayload = {
    email,
    password,
    role: isProfessional ? "professional" : "client",
  };

  try {
    const response = await axios.post<SignInResponse>(API_URL, apiPayload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // Only proceed if success is true
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Login failed");
    }

    const user = response.data.data.user;
    const token = response.data.data.token;

    if (!user || !token) {
      throw new Error("User data or token missing from response.");
    }

    // Store non-sensitive metadata in session_metadata cookie
    const metadata: User = {
      id: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: true,
    };
    cookies.set("session_metadata", metadata, {
      path: "/",
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Redirect immediately without updating currentUser state
    if (user.role === "professional") {
      router.push("/business/dashboard/dashboard");
    } else {
      router.push("/client/client");
    }
  } catch (error: any) {
    console.error("Sign-in failed:", error);
    let errorMessage = "An unexpected error occurred. Please try again.";

    if (error.code === "ERR_NETWORK") {
      errorMessage =
        "Unable to connect to the server. Please check your internet connection.";
    } else if (error.response) {
      const { message, error: apiError } = error.response.data || {};
      errorMessage = message || apiError || "Sign-in failed.";

      if (
        errorMessage.toLowerCase().includes("email not verified") ||
        error.response.status === 403
      ) {
        errorMessage = "Please verify your email before signing in.";
        toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
        setTimeout(() => {
          router.push(`/auth/email-verify?email=${encodeURIComponent(email)}`);
        }, 3000);
        setIsLoading(false);
        return;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
    setIsLoading(false);
  }
};
  const handleLogout = () => {
    // Clear cookies
    cookies.remove("session_metadata", { path: "/" });
    cookies.remove("auth_token", { path: "/" }); // May not work if HttpOnly
    setCurrentUser(null);
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    router.push("/auth/sign-in");
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self'; object-src 'none';"
        />
      </Head>
      <div
        className="flex items-center justify-center outfit-font bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/sign.svg')" }}
      >
        <div className="min-h-screen flex flex-col bg-white bg-no-repeat bg-center bg-cover lg:flex-row items-center justify-center max-w-[1280px] mx-auto">
          <div
            style={{ backgroundImage: "url('/signs.svg')" }}
            className="hidden lg:flex lg:w-1/2 flex-col justify-center bg-no-repeat bg-center ml-4 bg-cover p-12 rounded-3xl lg:h-[906px] lg:w-[500px]"
          >
            {isProfessional ? (
              <>
                <h1 className="text-[48px] hidden font-bold text-[#6D758F] mb-6 lg:leading-[60px]">
                  Welcome Back, Professional!
                </h1>
                <p className="text-[#6D758F] hidden text-[20px] leading-[24px]">
                  Log in to manage your projects, connect with clients, and grow
                  your business with MyRodo.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-[48px] hidden font-bold text-[#6D758F] mb-6 lg:leading-[60px]">
                  Welcome Back, Client!
                </h1>
                <p className="text-[#6D758F] hidden text-[20px] leading-[24px]">
                  Log in to find skilled professionals for your projects with
                  MyRodo.
                </p>
              </>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <h2 className="flex justify-center lg:justify-end mb-8">
                <Link href="/">
                  <Image
                    src="/logo.svg"
                    width={100}
                    height={100}
                    alt="logo"
                    className="w-auto"
                  />
                </Link>
              </h2>

              <div className="flex justify-center mb-6">
                <div className="flex w-full max-w-sm bg-[#F0F0F0] rounded-full p-1">
                  {["Client", "Professional"].map((label, idx) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setIsProfessional(idx === 1)}
                      className={`flex-1 py-2 rounded-full font-semibold ${
                        (isProfessional && idx === 1) ||
                        (!isProfessional && idx === 0)
                          ? "bg-[#6D758F] text-white"
                          : "text-gray-600"
                      }`} // Removed depósito
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#6D758F] mb-1">
                Sign In to MyRodo
              </h3>
              <p className="text-sm text-[#6D758F] mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              {currentUser && (
                <div className="text-center mb-4">
                  <p className="text-[#6D758F]">
                    Signed in as {currentUser.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-[#6D758F] font-semibold underline"
                  >
                    Log Out
                  </button>
                </div>
              )}

              {!currentUser && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-[#6D758F] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                      aria-label="Email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6D758F] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                        placeholder="Enter your password"
                        aria-label="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 inset-y-0 flex items-center text-[#6D758F] hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <p className="text-center text-sm text-[#6D758F] mt-4">
                    <Link href="/auth/forgot-password">
                      <span className="text-[#6D758F] font-semibold cursor-pointer">
                        Forgot Password?
                      </span>
                    </Link>
                  </p>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#6D758F] hover:bg-gray-700 text-white font-semibold py-3 rounded-md shadow-md disabled:opacity-50"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              )}

              <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-4 text-sm text-[#6D758F]">
                  Or sign in via
                </span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  className="flex items-center justify-center w-1/2 p-3 border border-gray-300 rounded-md"
                  aria-label="Sign in with Google"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.3486 12.1338H25.3753V12.0837H14.5003V16.917H21.3292C20.333 19.7306 17.6559 21.7503 14.5003 21.7503C10.4965 21.7503 7.25033 18.5041 7.25033 14.5003C7.25033 10.4965 10.4965 7.25033 14.5003 7.25033C16.3485 7.25033 18.0299 7.94753 19.3101 9.08639L22.7279 5.66862C20.5698 3.65735 17.6831 2.41699 14.5003 2.41699C7.8273 2.41699 2.41699 7.8273 2.41699 14.5003C2.41699 21.1733 7.8273 26.5837 14.5003 26.5837C21.1733 26.5837 26.5837 21.1733 26.5837 14.5003C26.5837 13.6901 26.5003 12.8993 26.3486 12.1338Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M3.80957 8.87614L7.77955 11.7876C8.85376 9.12808 11.4553 7.25033 14.4997 7.25033C16.3478 7.25033 18.0292 7.94753 19.3095 9.08639L22.7272 5.66862C20.5692 3.65735 17.6824 2.41699 14.4997 2.41699C9.85849 2.41699 5.83353 5.03726 3.80957 8.87614Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M14.5004 26.5833C17.6215 26.5833 20.4574 25.3888 22.6016 23.4464L18.8618 20.2818C17.6081 21.2358 16.0758 21.7516 14.5004 21.7499C11.3575 21.7499 8.68887 19.7459 7.68354 16.9492L3.74316 19.9852C5.74296 23.8983 9.80416 26.5833 14.5004 26.5833Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M26.3483 12.1332H25.375V12.083H14.5V16.9163H21.3289C20.8523 18.2554 19.9939 19.4256 18.8597 20.2822L18.8615 20.2809L22.6013 23.4456C22.3366 23.686 26.5833 20.5413 26.5833 14.4997C26.5833 13.6895 26.5 12.8986 26.3483 12.1332Z"
                      fill="#1976D2"
                    />
                  </svg>
                </button>

                <button
                  className="flex items-center justify-center w-1/2 p-3 border border-gray-300 rounded-md"
                  aria-label="Sign in with Apple"
                >
                  <svg
                    width="25"
                    height="29"
                    viewBox="0 0 25 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0836 6.99376C11.7749 5.31096 12.5706 3.57918 13.5289 2.4121C14.5849 1.12437 16.3972 0.136844 17.946 0.0283203C18.2076 1.79262 17.4876 3.51161 16.5399 4.72751C15.5232 6.03376 13.7751 7.04672 12.0836 6.99376ZM21.1682 13.0914C21.6474 11.7543 22.5968 10.5514 24.0697 9.73969C22.5813 7.88234 20.4916 6.80401 18.5195 6.80401C15.9104 6.80401 14.8072 8.0471 12.9949 8.0471C11.128 8.0471 9.71173 6.80401 7.45171 6.80401C5.23553 6.80401 2.8765 8.15478 1.3804 10.4617C0.830305 11.3144 0.457666 12.3738 0.25444 13.5537C-0.309474 16.8637 0.532886 21.1751 3.04563 25.0033C4.26737 26.8609 5.89585 28.9532 8.02327 28.9715C9.91841 28.99 10.456 27.7598 13.0216 27.7471C15.5909 27.7325 16.0778 28.9842 17.9704 28.9661C20.0984 28.9482 21.8166 26.6326 23.0384 24.7752C23.9083 23.4424 24.2373 22.7691 24.9137 21.2622C21.4741 19.9651 20.0595 16.1749 21.1682 13.0914Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-center text-sm text-[#6D758F] mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/auth/sign-up">
                  <span className="text-[#6D758F] font-semibold cursor-pointer">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}