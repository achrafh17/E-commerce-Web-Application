"use client";

import { Zap, Eye, EyeOff, Check, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const extensionPhoneRef = useRef<HTMLSelectElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement | null>(null);
  const [isFirstNameValid, setisFirstNameValid] = useState(true);
  const [isLastNameValid, setisLastNameValid] = useState(true);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isEmailValid, setisEmailValid] = useState(true);
  const phoneRegex = /^0?(6|7)[0-9]{8}$/;
  const [isPhoneValid, setisPhoneValid] = useState(true);
  const firstNameChangeVerification = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!/^[A-Za-z]+$/.test(e.target.value) && e.target.value !== "") {
      setisFirstNameValid(false);
      return;
    }
    setisFirstNameValid(true);
  };
  const LastNameChangeVerification = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!/^[A-Za-z]+$/.test(e.target.value) && e.target.value !== "") {
      setisLastNameValid(false);
      return;
    }
    setisLastNameValid(true);
  };
  const emailChangeVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailRegex.test(e.target.value) && e.target.value !== "") {
      setisEmailValid(false);
      return;
    }
    setisEmailValid(true);
  };

  const phoneChangeVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!phoneRegex.test(e.target.value) && e.target.value !== "") {
      setisPhoneValid(false);
      return;
    }
    setisPhoneValid(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-gradient-to-br from-indigo-50 via-indigo-50 to-pink-50">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-pink-600 p-3 rounded-2xl transform transition-transform duration-500">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              MegaMart
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Create your account and start shopping!
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          {/* Social Sign Up Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center cursor-pointer space-x-3 bg-white border-2 border-gray-200 rounded-xl py-3 px-4 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-semibold text-gray-700">
                Sign up with Google
              </span>
            </button>

            <button className="w-full flex items-center justify-center cursor-pointer space-x-3 bg-white border-2 border-gray-200 rounded-xl py-3 px-4 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-semibold text-gray-700">
                Sign up with Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="space-y-4">
            {/* Name Inputs Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  ref={firstNameRef}
                  onChange={firstNameChangeVerification}
                  placeholder="Enter your first name"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isFirstNameValid
                      ? "border-gray-200 focus:border-indigo-500 "
                      : "border-red-600 focus:border-red-600 "
                  } focus:outline-none transition-colors`}
                />
                {!isFirstNameValid && (
                  <p className="mt-1 text-sm text-red-500 tracking-wide">
                    First Name invalid
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  ref={lastNameRef}
                  onChange={LastNameChangeVerification}
                  placeholder="Enter your last name"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isLastNameValid
                      ? "border-gray-200 focus:border-indigo-500 "
                      : "border-red-600 focus:border-red-600 "
                  } focus:outline-none transition-colors`}
                />
                {!isLastNameValid && (
                  <p className="mt-1 text-sm text-red-500 tracking-wide">
                    Last Name invalid
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                ref={emailRef}
                onChange={emailChangeVerification}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  isEmailValid
                    ? "border-gray-200 focus:border-indigo-500 "
                    : "border-red-600 focus:border-red-600 "
                } focus:outline-none transition-colors`}
              />
              {!isEmailValid && (
                <p className="mt-1 text-sm text-red-500 tracking-wide">
                  Email invalid
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-3">
                <select
                  ref={extensionPhoneRef}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors bg-white"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+212">🇲🇦 +212</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                </select>
                <input
                  type="tel"
                  ref={phoneRef}
                  onChange={phoneChangeVerification}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isPhoneValid
                      ? "border-gray-200 focus:border-indigo-500 "
                      : "border-red-600 focus:border-red-600 "
                  } focus:outline-none transition-colors`}
                />
               
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <button
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  className="absolute right-3 top-4 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  ref={confirmedPasswordRef}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <button
                  onMouseDown={() => setShowConfirmPassword(true)}
                  onMouseUp={() => setShowConfirmPassword(false)}
                  className="absolute right-3 top-4 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2 pt-2">
              <button
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  acceptedTerms
                    ? "bg-indigo-600 border-indigo-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {acceptedTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <label className="text-sm text-gray-600 cursor-pointer select-none">
                I agree to the{" "}
                <span className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center space-x-2 mt-6">
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <button className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
