"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "./login/page";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // If the user is authenticated, redirect to the dashboard
    if (localStorage.getItem("isAuthenticated")) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1> */}
      <Login />
    </div>
  );
};

export default Home;
