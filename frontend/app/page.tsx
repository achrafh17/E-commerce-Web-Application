"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Star,
  Zap,
  Heart,
  Eye,
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
  Award,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Shirt,
  Home,
  Sparkles,
  ArrowRight,
  Dumbbell,
  PenTool,
  BabyIcon,
  Utensils,
} from "lucide-react";
import Link from "next/link";

export default function MegaMartHomePage() {
  interface Product {
    id: number;
    title: string;
    description?: string | null;
    price: number;
    reference?: string | null;
    imageUrl?: string | null;
    images: string[];
    stock: number;
    created_at: string;
    update_at: string;
    ownerId: number;
    category: string;
    ownerName: string;
  }
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setproducts] = useState<Product[]>([]);
  const heroSlides = [
    {
      title: "Smartphone Deals",
      subtitle: "Up to 40% OFF on latest iPhone & Samsung models",
      gradient: "from-blue-600 via-cyan-500 to-green-400",
      image: "/smartphones-deal.jpeg",
    },
    {
      title: "Home Appliances Sale",
      subtitle: "Save big on Kitchen & Laundry Essentials",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      image: "/home-category.jpeg",
    },
    {
      title: "Fashion Trends",
      subtitle: "New season collection up to 50% OFF",
      gradient: "from-purple-600 via-pink-500 to-red-400",
      image: "/clothes-category.jpeg",
    },
    {
      title: "Electronics",
      subtitle: "Exclusive deals on laptops, consoles, and accessories",
      gradient: "from-gray-800 via-indigo-700 to-blue-600",
      image: "/gadgets-category.jpg",
    },
  ];

  const categories = [
    { name: "Electronics", icon: Zap, color: "from-violet-500 to-purple-500" },
    // { name: "Fashion", icon: Shirt, color: "from-pink-500 to-rose-500" },
    // { name: "Home ", icon: Home, color: "from-blue-500 to-cyan-500" },
    // { name: "Beauty", icon: Sparkles, color: "from-indigo-500 to-pink-500" },
    // {
    //   name: "Kids",
    //   icon: BabyIcon,z
    //   color: "from-indigo-500 to-blue-500",
    // },
    // { name: "Food", icon: Utensils, color: "from-purple-500 to-violet-500" },
    // { name: "Sport", icon: Dumbbell, color: "from-green-500 to-emerald-500" },
    // { name: "School", icon: PenTool, color: "from-orange-500 to-red-500" },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 499.99,
      rating: 4.8,
      reviews: 1234,
      image: "🎧",
      badge: "Best Seller",
      badgeColor: "from-violet-600 to-indigo-600",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% protected",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30-day guarantee",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "Certified products",
      color: "from-violet-500 to-indigo-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    fetch(`${API_BASE}/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setproducts(data);
      });
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

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
                >
                  {/* <img src="/smartphones-deal.jpeg" alt="" /> */}
                </div>
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

      {products && products.length > 0 ? (
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-indigo-600  bg-clip-text text-transparent">
                  Top Electronics Picks{" "}
                </h2>
                <p className="text-gray-600 mt-2">
                  Discover the latest gadgets just for you{" "}
                </p>
              </div>
              <Link
                href="category/electronics"
                className="text-indigo-600 font-semibold cursor-pointer flex items-center space-x-2 hover:space-x-3 transition-all"
              >
                <span>View All</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(
                  (product: Product) => product.category === "electronics"
                )
                .slice(0, 4)
                .map((product, index) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300  border border-gray-200 cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="relative h-66 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 transition-opacity"></div>
                      <div
                        className=" absolute inset-0  bg-cover  bg-no-repeat "
                        style={{
                          backgroundImage: `url(${product.imageUrl})`,
                        }}
                      ></div>
                      {/* Badge */}
                      <div
                        className={`absolute top-4 left-4 bg-gradient-to-r ${product.badgeColor} text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg`}
                      >
                        {product.badge ? product.badge : ""}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors">
                          <Heart className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors">
                          <Eye className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className=" text-lg text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        <span className="font-bold">{product.title}</span>-{" "}
                        <span className="font-semibold">
                          {" "}
                          {product.description}
                        </span>
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-red-400 fill-red-400"
                                  : "text-red-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800 mb-2  ">
                          Sold By{" "}
                          <span className="font-bold text-indigo-400 text-md">
                            {product.ownerName}
                          </span>
                        </h3>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                            {product.price}{" "}
                            <span className="text-sm text-black">DH</span>
                          </span>
                        </div>
                        {/* Add to Cart Button */}
                        <button className="w-12 h-12 cursor-pointer bg-indigo-600 text-white rounded-3xl font transition-all duration-300 flex items-center justify-center  hover:shadow-lg hover:scale-110">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="h-8 w-64 rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse"></div>
            </div>
            <div className="h-5 w-24 rounded-md bg-gray-200 animate-pulse"></div>
          </div>

          {/* grid skeleton cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200"
              >
                {/* Image skeleton */}
                <div className="h-40 w-full bg-gray-200 animate-pulse"></div>

                {/* Content skeleton */}
                <div className="p-6 space-y-3">
                  <div className="h-4 w-3/4 rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="h-4 w-1/2 rounded-md bg-gray-200 animate-pulse"></div>

                  {/* Rating skeleton */}
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div
                        key={j}
                        className="h-4 w-4 rounded-full bg-gray-300 animate-pulse"
                      ></div>
                    ))}
                  </div>

                  {/* Owner skeleton */}
                  <div className="h-4 w-32 rounded-md bg-gray-200 animate-pulse"></div>

                  {/* Price + button skeleton */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 w-20 rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Fashion Products */}
      {products && products.length > 0 ? (
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-indigo-600  bg-clip-text text-transparent">
                  Fashion{" "}
                </h2>
                <p className="text-gray-600 mt-2">
                  Explore trendy outfits, shoes, and accessories that match your
                  style.{" "}
                </p>
              </div>
              <Link
                href="category/fashion"
                className="text-indigo-600 font-semibold cursor-pointer flex items-center space-x-2 hover:space-x-3 transition-all"
              >
                <span>View All</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((product: Product) => product.category === "fashion")
                .slice(0, 4)
                .map((product, index) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300  border border-gray-200 cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="relative h-66 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 transition-opacity"></div>
                      <div
                        className=" absolute inset-0  bg-cover  bg-no-repeat "
                        style={{
                          backgroundImage: `url(${product.imageUrl})`,
                        }}
                      ></div>
                      {/* Badge */}
                      <div
                        className={`absolute top-4 left-4 bg-gradient-to-r ${product.badgeColor} text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg`}
                      >
                        {product.badge ? product.badge : ""}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors">
                          <Heart className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors">
                          <Eye className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className=" text-lg text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        <span className="font-bold">{product.title}</span>-{" "}
                        <span className="font-semibold">
                          {" "}
                          {product.description}
                        </span>
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-red-400 fill-red-400"
                                  : "text-red-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800 mb-2  ">
                          Sold By{" "}
                          <span className="font-bold text-indigo-400 text-md">
                            {product.ownerName}
                          </span>
                        </h3>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                            {product.price}{" "}
                            <span className="text-sm text-black">DH</span>
                          </span>
                        </div>
                        {/* Add to Cart Button */}
                        <button className="w-12 h-12 cursor-pointer bg-indigo-600 text-white rounded-3xl font transition-all duration-300 flex items-center justify-center  hover:shadow-lg hover:scale-110">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="h-8 w-64 rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse"></div>
            </div>
            <div className="h-5 w-24 rounded-md bg-gray-200 animate-pulse"></div>
          </div>

          {/* grid skeleton cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200"
              >
                {/* Image skeleton */}
                <div className="h-40 w-full bg-gray-200 animate-pulse"></div>

                {/* Content skeleton */}
                <div className="p-6 space-y-3">
                  <div className="h-4 w-3/4 rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="h-4 w-1/2 rounded-md bg-gray-200 animate-pulse"></div>

                  {/* Rating skeleton */}
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div
                        key={j}
                        className="h-4 w-4 rounded-full bg-gray-300 animate-pulse"
                      ></div>
                    ))}
                  </div>

                  {/* Owner skeleton */}
                  <div className="h-4 w-32 rounded-md bg-gray-200 animate-pulse"></div>

                  {/* Price + button skeleton */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 w-20 rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Footer Spacer */}
      <div className="h-12"></div>
    </div>
  );
}
