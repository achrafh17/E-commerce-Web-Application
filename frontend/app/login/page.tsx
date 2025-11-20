"use client";

import Loading from "@/components/loading";
import { ArrowRight, Eye, EyeOff, ZapIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [isEmailValid, setisEmailValid] = useState(true);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // to check the email form
  const emailChangeVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(emailRegex.test(e.target.value));
    if (emailRegex.test(e.target.value)) setisEmailValid(true);
    else setisEmailValid(false);
  };
  const login = () => {
    setisLoading(true);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 mt-14">
      {isLoading && <Loading />}
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-3 rounded-2xl transform transition-transform duration-500 ">
              <ZapIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              MegaMart
            </h1>
          </div>

          <p className="text-gray-600 mt-2">
            Welcome back! Please login to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          {/* Social Login Buttons */}
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
                Continue with Google
              </span>
            </button>

            <button className="w-full flex items-center justify-center cursor-pointer space-x-3 bg-white border-2 border-gray-200 rounded-xl py-3 px-4 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-semibold text-gray-700">
                Continue with Facebook
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
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Enter your email"
                  onChange={emailChangeVerification}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isEmailValid
                      ? "border-gray-200 focus:border-fuchsia-500 "
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
              <div className="relative flex ">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-fuchsia-500 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => {
                    setshowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-4 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="w-3 h-3" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-fuchsia-600 focus:ring-fuchsia-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all duration-300 flex items-center justify-center space-x-2"
              onClick={login}
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            Don&apos;t have an account?{" "}
            <button className="font-bold text-fuchsia-600 hover:text-fuchsia-700 transition-colors">
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
