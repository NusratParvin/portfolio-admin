"use client";

import { useState, useEffect, Suspense } from "react";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import "react-quill/dist/quill.snow.css";
import { Book, Briefcase, Code, Minus, Plus, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import Spinner from "@/app/pages/components/Spinner";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const UpdateAboutMe = () => {
  // const quillRef = useRef(null);
  const { toast } = useToast();

  // State for the sections (Techs, Education, Work, Strengths)
  const [aboutMe, setAboutMe] = useState("");
  const [techs, setTechs] = useState([{ icon: "", name: "" }]);
  const [education, setEducation] = useState([{ degree: "", institute: "" }]);
  const [work, setWork] = useState({
    currentStatus: "",
    previous: [
      {
        company: "",
        location: "",
        designation: "",
        techs: "",
        responsibilities: "",
      },
    ],
  });
  const [strengths, setStrengths] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch current data to populate form for update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/aboutMe");
        if (response.ok) {
          const data = await response.json();
          //   console.log(data);
          setAboutMe(data.aboutMe);
          setTechs(data.techs);
          setEducation(data.education);
          setWork(data.work);
          setStrengths(data.strengths);
        } else {
          toast({ title: "Failed to load data" });
        }
      } catch (error) {
        console.error("Error fetching About Me data:", error);
        toast({ title: "Error fetching data" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(work);
  const handleAddTech = () => {
    setTechs([...techs, { icon: "", name: "" }]);
  };

  const handleRemoveTech = (index: number) => {
    const newTechs = techs.filter((_, i) => i !== index);
    setTechs(newTechs);
  };

  const handleAddWork = () => {
    setWork((prevWork) => ({
      ...prevWork,
      previous: [
        ...prevWork.previous,
        {
          company: "",
          location: "",
          designation: "",
          techs: "",
          responsibilities: "",
        },
      ],
    }));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRemoveWork = (index: number) => {
    const newPreviousWork = work.previous.filter((_, i) => i !== index);
    setWork({ ...work, previous: newPreviousWork });
  };

  const handleRemoveStrength = (index: number) => {
    const newStrengths = strengths.filter((_, i) => i !== index);
    setStrengths(newStrengths);
  };

  const handleAddStrength = () => {
    setStrengths([...strengths, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(aboutMe, techs, education, work, strengths);
    try {
      const response = await fetch("/api/aboutMe", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aboutMe,
          techs,
          education,
          work,
          strengths,
        }),
      });

      if (response.ok) {
        toast({ title: "About Me Info updated successfully" });
      } else {
        const errorData = await response.json();
        toast({ title: errorData.error });
      }
    } catch (error) {
      console.error("Error during the API request", error);
      toast({ title: "An error occurred. Please try again." });
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <Suspense fallback={<div>Loading Project...</div>}>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-full mx-auto p-6 space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactQuill
                  value={aboutMe}
                  onChange={setAboutMe}
                  // ref={quillRef}
                  className="mt-2 "
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

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Code className="mr-2" /> Techs I Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                {techs.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <Input
                      type="text"
                      value={tech.name}
                      onChange={(e) => {
                        const newTechs = [...techs];
                        newTechs[index].name = e.target.value;
                        setTechs(newTechs);
                      }}
                      placeholder="Tech name"
                      className="flex-grow"
                    />
                    <Input
                      type="file"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const fileUrl = await uploadImageToCloudinary(
                            e.target.files[0]
                          );
                          const newTechs = [...techs];
                          newTechs[index].icon = fileUrl;
                          setTechs(newTechs);
                        }
                      }}
                      className="flex-grow"
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveTech(index)}
                      type="button"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddTech} type="button" className="mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Add Tech
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Book className="mr-2" /> Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start items-start space-y-4 mb-4"
                    >
                      <Input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEducation = [...education];
                          newEducation[index].degree = e.target.value;
                          setEducation(newEducation);
                        }}
                        placeholder="Degree"
                        className="flex-grow"
                      />
                      <Input
                        type="text"
                        value={edu.institute}
                        onChange={(e) => {
                          const newEducation = [...education];
                          newEducation[index].institute = e.target.value;
                          setEducation(newEducation);
                        }}
                        placeholder="Institute"
                        className="flex-grow"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Zap className="mr-2" /> Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 mb-4"
                    >
                      <Input
                        type="text"
                        value={strength}
                        onChange={(e) => {
                          const newStrengths = [...strengths];
                          newStrengths[index] = e.target.value;
                          setStrengths(newStrengths);
                        }}
                        placeholder="Strength"
                        className="flex-grow"
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveStrength(index)}
                        type="button"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={handleAddStrength}
                    type="button"
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Strength
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Briefcase className="mr-2" /> Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                {work.previous.map((job, index) => (
                  <div
                    key={index}
                    className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex space-x-4">
                      <Input
                        type="text"
                        value={job.company}
                        onChange={(e) => {
                          const newWork = { ...work };
                          newWork.previous[index].company = e.target.value;
                          setWork(newWork);
                        }}
                        placeholder="Company"
                        className="flex-grow"
                      />
                      <Input
                        type="text"
                        value={job.location}
                        onChange={(e) => {
                          const newWork = { ...work };
                          newWork.previous[index].location = e.target.value;
                          setWork(newWork);
                        }}
                        placeholder="Location"
                        className="flex-grow"
                      />
                      <Input
                        type="text"
                        value={job.designation}
                        onChange={(e) => {
                          const newWork = { ...work };
                          newWork.previous[index].designation = e.target.value;
                          setWork(newWork);
                        }}
                        placeholder="Designation"
                        className="w-full"
                      />
                    </div>

                    <ReactQuill
                      value={job.responsibilities}
                      onChange={(value) => {
                        const newWork = { ...work };
                        newWork.previous[index].responsibilities = value;
                        setWork(newWork);
                      }}
                      className="w-full mt-2"
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
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveWork(index)}
                      type="button"
                    >
                      Remove Work
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddWork} type="button" className="mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Add Work Experience
                </Button>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        )}
      </Suspense>
    </>
  );
};

export default UpdateAboutMe;
