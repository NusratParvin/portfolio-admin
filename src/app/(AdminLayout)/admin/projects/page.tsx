"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const router = useRouter();

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  console.log(projects);
  const handleCheckboxChange = (projectId: string) => {
    setSelectedProject(projectId);
    router.push(`/admin/projects/update/${projectId}`);
  };

  return (
    <div className="flex flex-col">
      {/* Link for adding a new project */}
      <Link
        href="/admin/projects/create"
        className="p-2 mb-4 bg-gray-100 hover:bg-gray-200 hover:shadow-md shadow-xl text-2xl font-bold text-gray-600"
      >
        Add New Project
      </Link>

      {/* List of projects */}
      <div className="p-4 bg-gray-50 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects</h2>
        <ul className="space-y-2">
          {projects.map((project: { _id: string; name: string }) => (
            <li
              key={project?._id}
              className="flex items-center justify-between p-2 border rounded-md bg-white hover:shadow"
            >
              <span className="text-gray-800">{project.name}</span>
              <input
                type="checkbox"
                className="w-5 h-5"
                onChange={() => handleCheckboxChange(project._id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
