

"use client";
import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface PrivateFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

interface BusinessFormData {
  companyName: string;
  email: string;
  phone: string;
  businessCategory: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export default function SignUp() {
  const [isBusinessClient, setIsBusinessClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [privateForm, setPrivateForm] = useState<PrivateFormData>({
    fullName: "",
    email: "Omitoyinayomide20@gmail.com",
    phone: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [businessForm, setBusinessForm] = useState<BusinessFormData>({
    companyName: "",
    email: "Omitoyinayomide20@gmail.com",
    phone: "",
    businessCategory: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  const isCheckbox = type === "checkbox";
  const inputValue = isCheckbox
    ? (e.target as HTMLInputElement).checked
    : value;

  const formState = isBusinessClient ? businessForm : privateForm;
  const setForm = isBusinessClient
    ? (setBusinessForm as React.Dispatch<React.SetStateAction<PrivateFormData | BusinessFormData>>)
    : (setPrivateForm as React.Dispatch<React.SetStateAction<PrivateFormData | BusinessFormData>>);

  setForm({
    ...formState,
    [name]: inputValue,
  });
};


const validate = (): FormErrors => {
  const newErrors: FormErrors = {};

  if (isBusinessClient) {
    const formData = businessForm;
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.businessCategory.trim())
      newErrors.businessCategory = "Business category is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreed) newErrors.agreed = "You must agree to the terms";
  } else {
    const formData = privateForm;
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreed) newErrors.agreed = "You must agree to the terms";
  }

  return newErrors;
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = isBusinessClient ? businessForm : privateForm;
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post("/api/signup", formData);
      console.log("Signup success:", response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const formData = isBusinessClient ? businessForm : privateForm;

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .outfit-font {
            font-family: 'Outfit', sans-serif;
          }
        `}</style>
      </Head>
      <div
        className="flex items-center justify-center outfit-font bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/sign.svg')" }}
      >
        <div className="min-h-screen flex flex-col lg:flex-row bg-white items-center justify-center max-w-[1280px] mx-auto">
          <div
            style={{ backgroundImage: "url('/signs.svg')" }}
            className="m-3 hidden lg:flex lg:w-1/2 flex-col justify-center bg-[#F1F3F7] lg:h-[1006px] p-12 rounded-3xl bg-no-repeat bg-center bg-cover"
          >
            {isBusinessClient ? (
              <>
                <h1 className="text-[48px] font-bold text-[#6D758F] mb-6 lg:leading-[60px]">
                  Showcase Your Talent, Gain Trust, and Get Booked — All in One
                  Place!
                </h1>
                <p className="text-[#6D758F] text-[20px] leading-[24px]">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli Lorem
                  ipsum dolor sit amet consectetur adipiscing eli Lorem ipsum
                  dolor sit amet consectetur adipiscing eli Lorem ipsum dolor
                  sit amet consectetur adipiscing eli Lorem ipsum dolor sit amet
                  consectetur adipiscing eli Lorem ipsum dolor sit amet
                  consectetur adipiscing eli
                </p>
              </>
            ) : (
              <>
                <h1 className="text-[48px] font-bold text-[#6D758F] mb-6 lg:leading-[60px]">
                  Find skilled artisans <br /> and trusted freelancers for your
                  projects
                </h1>
                <p className="text-[#6D758F] text-[20px] leading-[24px]">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli Lorem
                  ipsum dolor sit amet consectetur adipiscing eli Lorem ipsum
                  dolor sit amet consectetur adipiscing eli Lorem ipsum dolor
                  sit amet consectetur adipiscing eli Lorem ipsum dolor sit amet
                  consectetur adipiscing eli Lorem ipsum dolor sit amet
                  consectetur adipiscing eli
                </p>
              </>
            )}
          </div>

          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-bold  flex lg:items-end lg:justify-end items-center justify-center text-[#6D758F] text-center mb-8">
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
                <div className="flex bg-[#F0F0F0] rounded-full p-1 w-full max-w-sm">
                  <button
                    type="button"
                    onClick={() => setIsBusinessClient(false)}
                    className={`flex-1 py-2 rounded-full font-semibold ${
                      !isBusinessClient
                        ? "bg-[#6D758F] text-white"
                        : "text-gray-600"
                    }`}
                  >
                    Private Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBusinessClient(true)}
                    className={`flex-1 py-2 rounded-full font-semibold ${
                      isBusinessClient
                        ? "bg-[#6D758F] text-white"
                        : "text-gray-600"
                    }`}
                  >
                    Business Client
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#6D758F] mb-1">
                Join MyRodo Today!
              </h3>
              <p className="text-sm text-[#6D758F] mb-6">
                Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {isBusinessClient ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#6D758F]">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={businessForm.companyName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6D758F]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={businessForm.email}
                        readOnly
                        className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6D758F]">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={businessForm.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6D758F]">
                        Business Category
                      </label>
                      <select
                        name="businessCategory"
                        value={businessForm.businessCategory}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                      >
                        <option value="">Select business category</option>
                        <option value="Tech">Tech</option>
                        <option value="Construction">Construction</option>
                        <option value="Retail">Retail</option>
                      </select>
                      {errors.businessCategory && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.businessCategory}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#6D758F]">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={privateForm.fullName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6D758F]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={privateForm.email}
                        readOnly
                        className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6D758F]">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={privateForm.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#6D758F]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#F0F0F0] hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6D758F]">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-[#F0F0F0] p-3 focus:outline-none focus:ring-2 focus:ring-[#6D758F]"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="h-4 w-4 text-gray-600"
                  />
                  <label className="ml-2 block text-sm text-gray-600">
                    I agree to the terms and conditions
                  </label>
                </div>
                {errors.agreed && (
                  <p className="text-red-500 text-sm mt-1">{errors.agreed}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#F0F0F0] hover:bg-gray-600 text-white font-semibold py-3 rounded-md shadow-md"
                >
                  Sign Up
                </button>
              </form>
              <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-4 text-sm text-[#6D758F]">
                  Or sign up via
                </span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>
              <div className="flex justify-center gap-4">
                <button className="border border-gray-300 rounded-md p-3 w-1/2 flex justify-center items-center">
                  <p className="">
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
                  </p>
                </button>
                <button className="border border-gray-300 rounded-md p-3 w-1/2 flex justify-center items-center">
                  <p className="">
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
                  </p>
                </button>
              </div>

              <p className="text-center text-sm text-[#F0F0F0] mt-6">
                Already have an account?{" "}
                <Link href="/auth/sign-in">
                  <span className="text-[#6D758F] font-semibold cursor-pointer">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}