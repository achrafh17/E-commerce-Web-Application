"use client";
import React, { useState, useEffect, startTransition } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { categories, heroSlides } from "./data/homeData";
import { Product } from "./types/product";
import { UserPayload } from "./types/userPayload";
import CategorySection from "@/components/home/categorySection";
import Loading from "@/components/loading";

export default function MegaMartHomePage() {
  const pathName = usePathname();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [loading, setloading] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState<UserPayload>();
  const [token, setToken] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  //--------------extract token-----------------------
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn("token is null");
      return;
    }
    startTransition(() => setToken(token));
  }, [pathName]);

  // caroussel logic--------------------------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  //-------------fetch the user data if the token exists--------------------
  useEffect(() => {
    if (token)
      fetch(`${API_BASE}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
        })
        .catch((error) => {
          const message =
            error instanceof Error
              ? error.message
              : "unknown error at fetching user data";
          console.log(message);
        });
    return () => {};
  }, [API_BASE, token, pathName]);
  //----------------fetch the products data--------------------
  useEffect(() => {
    fetch(`${API_BASE}/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("GET PRODUCT", data);
        setProducts(data);
      });
    return () => {};
  }, [API_BASE, loading, pathName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
      <Loading state={loading} />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0  bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-pink-600/20 animate-pulse"></div>

            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`  absolute inset-0 transition-opacity duration-1000   ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`absolute inset-0  bg-cover bg-center bg-no-repeat `}
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                <div className="relative h-full flex items-center justify-between px-12">
                  <div className="text-white max-w-xl">
                    <h2 className="text-5xl font-black mb-4 drop-shadow-2xl">
                      {slide.title}
                    </h2>
                    <p className="text-2xl mb-8 text-white/90 drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                      <span>Shop Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <button className="text-indigo-600 font-semibold flex items-center space-x-2 hover:space-x-3 transition-all">
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                ></div>
                <div className="relative">
                  <div
                    className={`bg-gradient-to-br ${category.color} p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 text-center">
                    {category.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Electronics Products */}

      <CategorySection
        Category="electronics"
        products={products}
        setProducts={setProducts}
        user={user}
        token={token}
      />
      {/* Fashion Products */}
      <CategorySection
        Category="fashion"
        products={products}
        setProducts={setProducts}
        user={user}
        token={token}
      />

      {/* home products */}
      <CategorySection
        Category="home"
        products={products}
        setProducts={setProducts}
        user={user}
        token={token}
      />
      {/* Sport */}
      <CategorySection
        Category="sport"
        products={products}
        setProducts={setProducts}
        user={user}
        token={token}
      />
      {/* Toys */}
      <CategorySection
        Category="toys"
        products={products}
        setProducts={setProducts}
        user={user}
        token={token}
      />
      {/* books */}
      <CategorySection
        Category="books"
        products={products}
        setProducts={setProducts}
        user={user}
        token={token}
      />
      {/* office */}
      <CategorySection
        Category="office"
        products={products}
        setProducts={setProducts}
        user={user}
        token={token}
      />
      {/* Footer Spacer */}
      <div className="h-12"></div>
    </div>
  );
}
