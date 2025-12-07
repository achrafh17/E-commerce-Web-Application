"use client";
import React, { useState, useEffect, startTransition } from "react";
import {
  ChevronRight,
  Star,
  Heart,
  Eye,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { categories, heroSlides } from "./data/homeData";
import { Product } from "./types/product";
import { UserPayload } from "./types/userPayload";
import { Favorite } from "./types/Favorite";

export default function MegaMartHomePage() {
  const pathName = usePathname();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [loading, setloading] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setproducts] = useState<Product[]>([]);
  const [rendering, setRendering] = useState(false);
  const [user, setUser] = useState<UserPayload>();
  const [token, setToken] = useState("");
  //--------------extract token-----------------------
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("token is null");
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
  //----------fetch product data----------------------------------------------
  useEffect(() => {
    fetch(`${API_BASE}/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("GET PRODUCT", data);
        setproducts(data);
      });
    return () => {};
  }, [API_BASE, loading, pathName, rendering]);
  useEffect(() => {
    console.log("test the rendring", rendering);
    return () => {};
  }, [rendering]);

  //------------------check if a product favorited by a User-------------------------------------

  const checkProductFavorited = (productId: number) => {
    try {
      const product = products.find((prod) => prod.id === productId);
      if (!product || !product.favoritedBy) return false;
      return product.favoritedBy.some(
        (favorite: Favorite) => favorite.userId === user?.id
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //----------------toggle favorite--------------------------------------------------------
  const toggleFavorite = (productId: number, isFavorited: boolean) => {
    if (isFavorited !== true && isFavorited !== false) {
      console.log("isFavorited null", productId);
      return;
    }
    if (!productId) return;
    if (!token) {
      console.log("You need to Sign In first");
      return;
    }
    const method = isFavorited ? "DELETE" : "POST";
    try {
      // if the product is not in the favorited list
      fetch(`${API_BASE}/products/favoritedProduct/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: method,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data from favorite", data);
          if (
            typeof data.message === "string" &&
            ["tokenexpirederror", "unauthorized"].includes(
              data.message.toLowerCase()
            )
          ) {
            return toast.error("You need to sign In First");
          }
          if (!isFavorited) toast.success("Product added to your favorites");
          else toast.success("Product removed from favorites");
          setRendering((prev) => !prev);
        });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

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
                        <button
                          onClick={() => {
                            toggleFavorite(
                              product.id,
                              checkProductFavorited(product.id)
                            );
                          }}
                          className="bg-white p-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              checkProductFavorited(product.id)
                                ? "text-indigo-500 fill-indigo-500"
                                : "text-indigo-500"
                            }  }`}
                          />
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
                .reverse()
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
                        <button
                          onClick={() => {
                            toggleFavorite(
                              product.id,
                              checkProductFavorited(product.id)
                            );
                          }}
                          className="bg-white p-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              checkProductFavorited(product.id)
                                ? "text-indigo-500 fill-indigo-500"
                                : "text-indigo-500"
                            }  }`}
                          />
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

      {/* home products */}
      {products && products.length > 0 ? (
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-indigo-600  bg-clip-text text-transparent">
                  Home & Living
                </h2>
                <p className="text-gray-600 mt-2">
                  Upgrade your space with furniture, decor, lighting, and cozy
                  home essentials.{" "}
                </p>
              </div>
              <Link
                href="category/home&living"
                className="text-indigo-600 font-semibold cursor-pointer flex items-center space-x-2 hover:space-x-3 transition-all"
              >
                <span>View All</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((product: Product) => product.category === "home")
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
                        <button
                          onClick={() => {
                            toggleFavorite(
                              product.id,
                              checkProductFavorited(product.id)
                            );
                          }}
                          className="bg-white p-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              checkProductFavorited(product.id)
                                ? "text-indigo-500 fill-indigo-500"
                                : "text-indigo-500"
                            }  }`}
                          />
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
