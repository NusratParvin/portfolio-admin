import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className=" h-full w-1/2 mx-auto flex justify-center items-center gap-8 ">
      <Link
        href="/admin/about/create"
        className=" p-28 bg-gray-100 hover:bg-gray-200 hover:shadow-md shadow-xl text-2xl font-bold text-gray-600"
      >
        Create
      </Link>
      <Link
        href="/admin/about/update"
        className=" p-28 bg-gray-100 hover:bg-gray-200 hover:shadow-md shadow-xl text-2xl font-bold text-gray-600"
      >
        Update
      </Link>
    </div>
  );
};

export default page;
