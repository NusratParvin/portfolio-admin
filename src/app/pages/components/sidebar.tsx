"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST", // POST request to clear the cookie
      });

      if (response.ok) {
        // If logout is successful, redirect to the login page
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="h-[94vh] w-64 fixed bg-gray-200 text-black p-8 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl mb-8">Admin Panel</h2>
        <ul>
          <li>
            <Link
              href="/admin/about"
              className="block py-2 px-4 hover:bg-gray-300 rounded"
            >
              About Me
            </Link>
          </li>
          <li>
            <Link
              href="/admin/projects"
              className="block py-2 px-4 hover:bg-gray-300 rounded"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/admin/blogs"
              className="block py-2 px-4 hover:bg-gray-300 rounded"
            >
              Blogs
            </Link>
          </li>
        </ul>
      </div>
      {/* Logout button at the bottom */}
      <button
        onClick={handleLogout}
        className="mt-auto py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
