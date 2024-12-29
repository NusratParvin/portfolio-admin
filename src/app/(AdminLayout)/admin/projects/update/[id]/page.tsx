// "use client";

// import React, { useState, useEffect } from "react";
// import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
// // import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";

// import dynamic from "next/dynamic";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const UpdateProject = () => {
//   const searchParams = useSearchParams();
//   const projectId = searchParams.get("id");

//   const [projectName, setProjectName] = useState("");
//   const [image, setImage] = useState<string | null>(null);
//   const [techs, setTechs] = useState<string[]>([]);
//   const [liveSite, setLiveSite] = useState("");
//   const [githubClient, setGithubClient] = useState("");
//   const [githubBackend, setGithubBackend] = useState("");
//   const [summary, setSummary] = useState("");
//   const [description, setDescription] = useState("");
//   const { toast } = useToast();
//   const router = useRouter();

//   // Fetch existing project data
//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const response = await fetch(`/api/projects/${projectId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setProjectName(data.name);
//           setImage(data.image);
//           setTechs(data.techs || []);
//           setLiveSite(data.liveSite);
//           setGithubClient(data.githubClient);
//           setGithubBackend(data.githubBackend);
//           setSummary(data.summary);
//           setDescription(data.description);
//         } else {
//           toast({ title: "Failed to fetch project data." });
//         }
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//         toast({ title: "An error occurred while fetching data." });
//       }
//     };

//     fetchProjectData();
//   }, [projectId, toast]);

//   const handleTechChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const newTechs = [...techs];
//     newTechs[index] = e.target.value;
//     setTechs(newTechs);
//   };

//   const handleAddTech = () => {
//     setTechs([...techs, ""]);
//   };

//   const handleRemoveTech = (index: number) => {
//     const newTechs = techs.filter((_, i) => i !== index);
//     setTechs(newTechs);
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const fileUrl = await uploadImageToCloudinary(e.target.files[0]);
//       setImage(fileUrl);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const projectData = {
//       name: projectName,
//       image,
//       techs,
//       liveSite,
//       githubClient,
//       githubBackend,
//       summary,
//       description,
//     };

//     try {
//       const response = await fetch(`/api/projects/${projectId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(projectData),
//       });

//       if (response.ok) {
//         toast({ title: "Project updated successfully!" });
//         router.push("/projects"); // Navigate back to the projects page
//       } else {
//         const errorData = await response.json();
//         toast({ title: errorData.error || "Error updating project" });
//       }
//     } catch (error) {
//       console.error("Error updating project:", error);
//       toast({ title: "An error occurred. Please try again." });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-full mx-auto p-6 space-y-8">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Update Project</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Input
//             type="text"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             placeholder="Project Name"
//             className="w-full"
//           />

//           <div>
//             <Input type="file" onChange={handleImageUpload} className="mt-4" />
//             {image && (
//               <div className="mt-4">
//                 <Image
//                   src={image}
//                   alt="Project Image"
//                   width={500}
//                   height={300}
//                   className="object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="mt-4">
//             <h3 className="text-lg font-medium">Tech Stack</h3>
//             {techs.map((tech, index) => (
//               <div key={index} className="flex space-x-2 mb-2">
//                 <Input
//                   type="text"
//                   value={tech}
//                   onChange={(e) => handleTechChange(e, index)}
//                   placeholder="Technology"
//                   className="w-full"
//                 />
//                 <Button type="button" onClick={() => handleRemoveTech(index)}>
//                   Remove
//                 </Button>
//               </div>
//             ))}
//             <Button type="button" onClick={handleAddTech}>
//               Add Tech
//             </Button>
//           </div>

//           <Input
//             type="text"
//             value={liveSite}
//             onChange={(e) => setLiveSite(e.target.value)}
//             placeholder="Live Site URL"
//             className="w-full mt-4"
//           />
//           <Input
//             type="text"
//             value={githubClient}
//             onChange={(e) => setGithubClient(e.target.value)}
//             placeholder="GitHub Client Repo URL"
//             className="w-full mt-4"
//           />
//           <Input
//             type="text"
//             value={githubBackend}
//             onChange={(e) => setGithubBackend(e.target.value)}
//             placeholder="GitHub Backend Repo URL"
//             className="w-full mt-4"
//           />

//           <Input
//             type="text"
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             placeholder="Project Summary"
//             className="w-full mt-4"
//           />

//           <ReactQuill
//             value={description}
//             onChange={setDescription}
//             className="mt-4"
//             modules={{
//               toolbar: [
//                 [{ font: [] }],
//                 [{ size: ["small", false, "large", "huge"] }],
//                 ["bold", "italic", "underline", "strike"],
//                 [{ color: [] }, { background: [] }],
//                 [{ list: "ordered" }, { list: "bullet" }],
//                 [{ align: [] }],
//                 ["link", "image"],
//                 ["clean"],
//               ],
//             }}
//           />
//         </CardContent>
//       </Card>

//       <Button type="submit" className="w-full">
//         Update Project
//       </Button>
//     </form>
//   );
// };

// export default UpdateProject;

"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

const UpdateProject = () => {
  // const searchParams = useSearchParams();
  // const projectId = searchParams.get("id");

  const { id } = useParams();
  const projectId = id;

  console.log(projectId);

  const [isMounted, setIsMounted] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [techs, setTechs] = useState<string[]>([]);
  const [liveSite, setLiveSite] = useState("");
  const [githubClient, setGithubClient] = useState("");
  const [githubBackend, setGithubBackend] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch existing project data
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return;

      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setProjectName(data.name);
          setImage(data.image);
          setTechs(data.techs || []);
          setLiveSite(data.liveSite);
          setGithubClient(data.githubClient);
          setGithubBackend(data.githubBackend);
          setSummary(data.summary);
          setDescription(data.description);
        } else {
          toast({ title: "Failed to fetch project data." });
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        toast({ title: "An error occurred while fetching data." });
      }
    };

    fetchProjectData();
  }, [projectId, toast]);
  if (!isMounted) return null;

  const handleTechChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTechs = [...techs];
    newTechs[index] = e.target.value;
    setTechs(newTechs);
  };

  const handleAddTech = () => setTechs([...techs, ""]);
  const handleRemoveTech = (index: number) =>
    setTechs(techs.filter((_, i) => i !== index));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = await uploadImageToCloudinary(e.target.files[0]);
      setImage(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      name: projectName,
      image,
      techs,
      liveSite,
      githubClient,
      githubBackend,
      summary,
      description,
    };

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        toast({ title: "Project updated successfully!" });
        router.push("/admin/projects");
      } else {
        const errorData = await response.json();
        toast({ title: errorData.error || "Error updating project" });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({ title: "An error occurred. Please try again." });
    }
  };

  if (!isMounted) return null; // Prevent SSR issues

  return (
    <Suspense fallback={<div>Loading Project...</div>}>
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto p-6 space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Update Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="w-full"
            />

            <div>
              <Input
                type="file"
                onChange={handleImageUpload}
                className="mt-4"
              />
              {image && (
                <div className="mt-4">
                  <Image
                    src={image}
                    alt="Project Image"
                    width={500}
                    height={300}
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium">Tech Stack</h3>
              {techs.map((tech, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechChange(e, index)}
                    placeholder="Technology"
                    className="w-full"
                  />
                  <Button type="button" onClick={() => handleRemoveTech(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddTech}>
                Add Tech
              </Button>
            </div>

            <Input
              type="text"
              value={liveSite}
              onChange={(e) => setLiveSite(e.target.value)}
              placeholder="Live Site URL"
              className="w-full mt-4"
            />
            <Input
              type="text"
              value={githubClient}
              onChange={(e) => setGithubClient(e.target.value)}
              placeholder="GitHub Client Repo URL"
              className="w-full mt-4"
            />
            <Input
              type="text"
              value={githubBackend}
              onChange={(e) => setGithubBackend(e.target.value)}
              placeholder="GitHub Backend Repo URL"
              className="w-full mt-4"
            />
            <Input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Project Summary"
              className="w-full mt-4"
            />

            <ReactQuill
              value={description}
              onChange={setDescription}
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
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Update Project
        </Button>
      </form>
    </Suspense>
  );
};

export default UpdateProject;
