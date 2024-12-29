import axios from "axios";

// Get Cloudinary credentials from environment variables
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (file: File) => {
  if (!UPLOAD_PRESET) {
    throw new Error("Cloudinary upload preset is not defined.");
  }

  if (!file) {
    throw new Error("No file provided for upload.");
  }

  try {
    // Create a FormData object and append the file and upload preset
    const formData = new FormData();
    formData.append("file", file); // file must be a valid File object
    formData.append("upload_preset", UPLOAD_PRESET); // preset is guaranteed to be a string

    // Send the POST request to Cloudinary
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Return the secure URL of the uploaded image
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};
