// "use client"

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function EmailVerification() {
//   const CODE_LENGTH = 4;
//   const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
//   const [timer, setTimer] = useState(90);
//   const inputRefs = useRef<HTMLInputElement[]>([]);

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(countdown);
//   }, []);

//   const handleChange = (index: number, value: string) => {
//     if (!/^\d?$/.test(value)) return;
//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);

//     if (value && index < CODE_LENGTH - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerify = () => {
//     const fullCode = code.join("");
//     if (fullCode.length !== CODE_LENGTH) {
//       alert("Please enter all 4 digits.");
//       return;
//     }
//     alert(`Verifying code: ${fullCode}`);
//   };

//   const handleResend = () => {
//     setTimer(90);
//     alert("Verification code resent!");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4 outfit-font">
//       <div className="max-w-md w-full space-y-6 text-center">
//         <h1 className="text-4xl font-bold text-[#6D758F] tracking-tight flex items-center justify-center">  <Link href="/">
//                 <Image
//                   src="/logo.svg"
//                   width={100}
//                   height={100}
//                   alt="logo"
//                   className="w-auto"
//                 />
//                 </Link></h1>
//         <div>
//           <h2 className="text-[32px] font-semibold text-[#6D758F]">Verification Code Sent!</h2>
//           <p className="text-[#6D758F] text-sm mt-1">
//             We&apos;ve sent a verification code to your email. Enter the code sent to your email to proceed
//           </p>
//         </div>

//         {/* Input Boxes */}
//         <div className="flex justify-center gap-3">
//           {code.map((digit, i) => (
//            <input
//   key={i}
//   type="text"
//   inputMode="numeric"
//   maxLength={1}
//   value={digit}
//   ref={(el) => {
//     inputRefs.current[i] = el!;
//   }}
//   onChange={(e) => handleChange(i, e.target.value)}
//   onKeyDown={(e) => handleKeyDown(e, i)}
//   className="w-14 h-14 border-2 border-[#6D758F] rounded-md text-2xl text-center focus:outline-none focus:border-gray-600"
// />

//           ))}
//         </div>

//         {/* Verify Button */}
//         <button
//           onClick={handleVerify}
//           className="w-full bg-[#6D758F] hover:bg-gray-600 text-white py-3 rounded-md font-medium"
//         >
//           Verify Now
//         </button>

//         {/* Resend & Timer */}
//         <div className="text-sm text-[#6D758F]">
//           <p>
//             Didn&apos;t receive the code?{" "}
//             <button onClick={handleResend} className="text-blue-600 underline">
//               Resend code
//             </button>
//           </p>
//           <p className="mt-2">{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")} secs. left`}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmailVerification() {
  const CODE_LENGTH = 4;
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; // Get email from query params (passed from signup)
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(90);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Allow only single digits
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input if value entered
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== CODE_LENGTH) {
      toast.error("Please enter all 4 digits.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://api.myrodo.com/auth/verify-email",
        { token: fullCode },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message || "Email verified successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      router.push("/auth/sign-in");
    } catch (error: any) {
      console.error("Verification failed:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.code === "ERR_NETWORK") {
        errorMessage =
          "Unable to connect to the server. Please check your internet connection.";
      } else if (error.response) {
        const { message, error: apiError } = error.response.data || {};
        errorMessage =
          message ||
          apiError ||
          `Verification failed with status ${error.response.status}.`;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Email not provided. Please sign up again.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://api.myrodo.com/auth/send-verification-email",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setTimer(90);
      setIsResendDisabled(true);
      setCode(Array(CODE_LENGTH).fill("")); // Clear previous code
      inputRefs.current[0]?.focus(); // Focus first input

      toast.success(response.data.message || "Verification code resent!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error: any) {
      console.error("Resend failed:", error);
      let errorMessage =
        "Failed to resend verification code. Please try again.";

      if (error.code === "ERR_NETWORK") {
        errorMessage =
          "Unable to connect to the server. Please check your internet connection.";
      } else if (error.response) {
        const { message, error: apiError } = error.response.data || {};
        errorMessage =
          message ||
          apiError ||
          `Resend failed with status ${error.response.status}.`;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 outfit-font">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold text-[#6D758F] tracking-tight flex items-center justify-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={100}
              height={100}
              alt="logo"
              className="w-auto"
            />
          </Link>
        </h1>
        <div>
          <h2 className="text-[32px] font-semibold text-[#6D758F]">
            Verification Code Sent!
          </h2>
          <p className="text-[#6D758F] text-sm mt-1">
            Weapos;ve sent a verification code to your email. Enter the code to
            proceed.
          </p>
        </div>

        {/* Input Boxes */}
        <div className="flex justify-center gap-3">
          {code.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {
                if (el) inputRefs.current[i] = el;
              }}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-14 h-14 border-2 border-[#6D758F] rounded-md text-2xl text-center focus:outline-none focus:border-gray-600"
              aria-label={`Verification code digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-[#6D758F] hover:bg-gray-600 text-white py-3 rounded-md font-medium"
        >
          Verify Now
        </button>

        {/* Resend & Timer */}
        <div className="text-sm text-[#6D758F]">
          <p>
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={isResendDisabled}
              className={`${
                isResendDisabled ? "text-gray-400" : "text-blue-600 underline"
              }`}
            >
              Resend code
            </button>
          </p>
          <p className="mt-2">{`${Math.floor(timer / 60)}:${String(
            timer % 60
          ).padStart(2, "0")} secs. left`}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}