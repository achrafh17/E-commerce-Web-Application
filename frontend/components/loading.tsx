import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-violet-600 border-r-fuchsia-600 animate-spin"></div>
          </div>

          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
              <Zap className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          MegaMart
        </h1>
      </div>
    </div>
  );
}