import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          width: "400px",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "16px",
        },
      }}
    />
  );
}
