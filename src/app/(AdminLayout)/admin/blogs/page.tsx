// "use client";

// import React, { useState } from "react";
// import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Image from "next/image";

// const CreateBlog = () => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState<string | null>(null);
//   const [stack, setStack] = useState<string[]>([]);
//   const [details, setDetails] = useState("");
//   const { toast } = useToast();

//   const handleStackChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const newStack = [...stack];
//     newStack[index] = e.target.value;
//     setStack(newStack);
//   };

//   const handleAddStack = () => {
//     setStack([...stack, ""]);
//   };

//   const handleRemoveStack = (index: number) => {
//     const newStack = stack.filter((_, i) => i !== index);
//     setStack(newStack);
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const fileUrl = await uploadImageToCloudinary(e.target.files[0]);
//       setImage(fileUrl);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const blogData = {
//       name,
//       image,
//       stack,
//       details,
//     };

//     try {
//       const response = await fetch("/api/blogs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(blogData),
//       });

//       if (response.ok) {
//         toast({ title: "Blog created successfully!" });
//         setName("");
//         setImage(null);
//         setStack([]);
//         setDetails("");
//       } else {
//         const errorData = await response.json();
//         toast({ title: errorData.error || "Error creating blog" });
//       }
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       toast({ title: "An error occurred. Please try again." });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-full mx-auto p-6 space-y-8">
//       <div className="space-y-4">
//         <Input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Blog Name"
//           className="w-full"
//         />
//         <Input
//           type="file"
//           onChange={handleImageUpload}
//           placeholder="Upload Image"
//           className="w-full"
//         />
//         {image && (
//           <Image
//             src={image}
//             alt="Uploaded Blog"
//             width={500} // Fixed width
//             height={300} // Fixed height
//             className="w-32 h-32 object-cover mt-2"
//           />
//         )}

//         <div className="space-y-2">
//           <h3 className="text-lg font-medium">Stack (Technologies)</h3>
//           {stack.map((tech, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <Input
//                 type="text"
//                 value={tech}
//                 onChange={(e) => handleStackChange(e, index)}
//                 placeholder="Technology"
//                 className="w-full"
//               />
//               <Button type="button" onClick={() => handleRemoveStack(index)}>
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <Button type="button" onClick={handleAddStack}>
//             Add Stack
//           </Button>
//         </div>

//         <ReactQuill
//           value={details}
//           onChange={setDetails}
//           className="mt-4"
//           modules={{
//             toolbar: [
//               [{ font: [] }],
//               [{ size: ["small", false, "large", "huge"] }],
//               ["bold", "italic", "underline", "strike"],
//               [{ color: [] }, { background: [] }],
//               [{ list: "ordered" }, { list: "bullet" }],
//               [{ align: [] }],
//               ["link", "image"],
//               ["clean"],
//             ],
//           }}
//         />
//       </div>

//       <Button type="submit" className="w-full">
//         Save Blog
//       </Button>
//     </form>
//   );
// };

// export default CreateBlog;

"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Suspense } from "react";

// Dynamically load ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CreateBlog = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [stack, setStack] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const { toast } = useToast();

  // Ensure the component renders only on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStackChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newStack = [...stack];
    newStack[index] = e.target.value;
    setStack(newStack);
  };

  const handleAddStack = () => {
    setStack([...stack, ""]);
  };

  const handleRemoveStack = (index: number) => {
    const newStack = stack.filter((_, i) => i !== index);
    setStack(newStack);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = await uploadImageToCloudinary(e.target.files[0]);
      setImage(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogData = {
      name,
      image,
      stack,
      details,
    };

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        toast({ title: "Blog created successfully!" });
        setName("");
        setImage(null);
        setStack([]);
        setDetails("");
      } else {
        const errorData = await response.json();
        toast({ title: errorData.error || "Error creating blog" });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast({ title: "An error occurred. Please try again." });
    }
  };

  if (!isMounted) {
    return null; // Prevent SSR rendering
  }

  return (
    <Suspense fallback={<div>Loading Blog Editor...</div>}>
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto p-6 space-y-8"
      >
        <div className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Blog Name"
            className="w-full"
          />
          <Input
            type="file"
            onChange={handleImageUpload}
            placeholder="Upload Image"
            className="w-full"
          />
          {image && (
            <Image
              src={image}
              alt="Uploaded Blog"
              width={500}
              height={300}
              className="w-32 h-32 object-cover mt-2"
            />
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Stack (Technologies)</h3>
            {stack.map((tech, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="text"
                  value={tech}
                  onChange={(e) => handleStackChange(e, index)}
                  placeholder="Technology"
                  className="w-full"
                />
                <Button type="button" onClick={() => handleRemoveStack(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddStack}>
              Add Stack
            </Button>
          </div>

          <ReactQuill
            value={details}
            onChange={setDetails}
            className="mt-4"
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>

        <Button type="submit" className="w-full">
          Save Blog
        </Button>
      </form>
    </Suspense>
  );
};

export default CreateBlog;
