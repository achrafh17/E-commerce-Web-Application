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
} from "lucide-react";

export default function MegaMartHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
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
    { name: "Fashion", icon: Shirt, color: "from-pink-500 to-rose-500" },
    { name: "Home ", icon: Home, color: "from-blue-500 to-cyan-500" },
    { name: "Beauty", icon: Sparkles, color: "from-fuchsia-500 to-pink-500" },
    {
      name: "Smartphones",
      icon: Smartphone,
      color: "from-indigo-500 to-blue-500",
    },
    { name: "Laptops", icon: Laptop, color: "from-purple-500 to-violet-500" },
    { name: "Audio", icon: Headphones, color: "from-green-500 to-emerald-500" },
    { name: "Cameras", icon: Camera, color: "from-orange-500 to-red-500" },
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
      badgeColor: "from-violet-600 to-fuchsia-600",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 399.99,
      originalPrice: 599.99,
      rating: 4.9,
      reviews: 2341,
      image: "⌚",
      badge: "Hot Deal",
      badgeColor: "from-orange-600 to-red-600",
    },
    {
      id: 3,
      name: "4K Action Camera",
      price: 249.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviews: 876,
      image: "📷",
      badge: "Trending",
      badgeColor: "from-blue-600 to-cyan-600",
    },
    {
      id: 4,
      name: "Gaming Laptop",
      price: 1299.99,
      originalPrice: 1799.99,
      rating: 4.9,
      reviews: 456,
      image: "💻",
      badge: "New",
      badgeColor: "from-green-600 to-emerald-600",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 3421,
      image: "🔊",
      badge: "Popular",
      badgeColor: "from-pink-600 to-rose-600",
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.5,
      reviews: 987,
      image: "🖱️",
      badge: "Sale",
      badgeColor: "from-purple-600 to-violet-600",
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
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0  bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 animate-pulse"></div>

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
          <h2 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <button className="text-fuchsia-600 font-semibold flex items-center space-x-2 hover:space-x-3 transition-all">
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

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-600 mt-2">Handpicked items just for you</p>
          </div>
          <button className="text-fuchsia-600 font-semibold flex items-center space-x-2 hover:space-x-3 transition-all">
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                  {product.image}
                </div>

                {/* Badge */}
                <div
                  className={`absolute top-4 left-4 bg-gradient-to-r ${product.badgeColor} text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg`}
                >
                  {product.badge}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-fuchsia-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-fuchsia-50 transition-colors">
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-fuchsia-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <span className="text-green-600 font-semibold text-sm">
                    Save{" "}
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    %
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all duration-300 flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-8 py-12 text-center text-white">
            <h2 className="text-4xl font-black mb-4">Stay in the Loop!</h2>
            <p className="text-xl mb-8 text-white/90">
              Subscribe to get exclusive deals and updates
            </p>
            <div className="flex justify-center">
              <div className="flex bg-white rounded-2xl overflow-hidden shadow-2xl max-w-md w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 text-gray-800 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 font-bold hover:shadow-xl transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spacer */}
      <div className="h-12"></div>
    </div>
  );
}
