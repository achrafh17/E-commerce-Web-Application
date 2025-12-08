import { Product } from "@/app/types/product";
import { UserPayload } from "@/app/types/userPayload";
import {
  Cat,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoadingFavorite } from "../loading";
import { Favorite } from "@/app/types/Favorite";
import { categoryHeaders } from "@/app/data/homeData";

export default function CategorySection({
  Category,
  products,
  user,
  token,
  setProducts,
}: {
  Category: string;
  products: Product[];
  user?: UserPayload;

  token: string;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  console.log("product from childre", products);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;


  const [loadingFavorite, setloadingFavorite] = useState<
    Record<number, boolean>
  >({});
  const [header, setheader] = useState(
    categoryHeaders.find((h) => h.category === Category)
  );

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
    setloadingFavorite((prev) => ({ ...prev, [productId]: true }));
    if (isFavorited !== true && isFavorited !== false) {
      console.log("isFavorited null", productId);
      setloadingFavorite((prev) => ({ ...prev, [productId]: false }));
      return;
    }
    if (!productId) return;
    if (!token) {
      console.log("You need to Sign In first");
      toast.error("You need to Sign In first");
      setloadingFavorite((prev) => ({ ...prev, [productId]: false }));
      return;
    }
    const method = isFavorited ? "DELETE" : "POST";
    try {
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
            setloadingFavorite((prev) => ({ ...prev, [productId]: false }));
            return toast.error("You need to sign In First");
          }
          if (!isFavorited) toast.success("Product added to your favorites");
          else toast.success("Product removed from favorites");
          setProducts((prev) =>
            prev.map((p) =>
              p.id === productId
                ? {
                    ...p,
                    favoritedBy: isFavorited
                      ? p.favoritedBy.filter(
                          (f: Favorite) => f.userId !== user?.id
                        )
                      : [...p.favoritedBy, { userId: user?.id }],
                  }
                : p
            )
          );
        })
        .finally(() =>
          setloadingFavorite((prev) => ({ ...prev, [productId]: false }))
        );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //
  return (
    products.filter((product: Product) => product.category === Category).length > 0 &&
    (products && products.length > 0 ? (
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-indigo-600  bg-clip-text text-transparent">
                {header?.title}
              </h2>
              <p className="text-gray-600 mt-2">{header?.subtitle} </p>
            </div>
            <Link
              href={`/${Category}`}
              className="text-indigo-600 font-semibold cursor-pointer flex items-center space-x-2 hover:space-x-3 transition-all"
            >
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter((product: Product) => product.category === Category).slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300  border border-gray-200 cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative h-66 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 transition-opacity"></div>
                  {!loadingFavorite[product.id] && (
                    <div
                      className=" absolute inset-0  bg-cover  bg-no-repeat "
                      style={{
                        backgroundImage: `url(${product.imageUrl})`,
                      }}
                    ></div>
                  )}
                  {loadingFavorite[product.id] && <LoadingFavorite />}{" "}
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
    ))
  );
}
