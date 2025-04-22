"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EmailVerification() {
  const CODE_LENGTH = 4;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(90);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length !== CODE_LENGTH) {
      alert("Please enter all 4 digits.");
      return;
    }
    alert(`Verifying code: ${fullCode}`);
  };

  const handleResend = () => {
    setTimer(90);
    alert("Verification code resent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 outfit-font">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold text-[#6D758F] tracking-tight flex items-center justify-center">  <Link href="/">
                <Image
                  src="/logo.svg"
                  width={100}
                  height={100}
                  alt="logo"
                  className="w-auto"
                />
                </Link></h1>
        <div>
          <h2 className="text-[32px] font-semibold text-[#6D758F]">Verification Code Sent!</h2>
          <p className="text-[#6D758F] text-sm mt-1">
            We've sent a verification code to your email. Enter the code sent to your email to proceed
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
              ref={(el) => (inputRefs.current[i] = el!)}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-14 h-14 border-2 border-[#6D758F] rounded-md text-2xl text-center focus:outline-none focus:border-gray-600"
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
            Didn't receive the code?{" "}
            <button onClick={handleResend} className="text-blue-600 underline">
              Resend code
            </button>
          </p>
          <p className="mt-2">{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")} secs. left`}</p>
        </div>
      </div>
    </div>
  );
}
