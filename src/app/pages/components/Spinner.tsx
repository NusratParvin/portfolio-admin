"use client";

const Spinner = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const spinnerSize = size === "lg" ? "w-16 h-16" : "w-8 h-8"; // Adjust size based on prop

  return (
    <div
      className={`border-t-4 border-blue-500 ${spinnerSize} border-solid rounded-full animate-spin`}
    />
  );
};

export default Spinner;
