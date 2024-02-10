import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CameraComponent = () => {
  const [result, setResult] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [url, setUrl] = useState("");
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vcyhizgs");

    // Cloudinary upload URL for your account
    const uploadUrl = `https://api.cloudinary.com/v1_1/dsjkch2eh/image/upload/`;

    try {
      const cloudinaryResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudinaryResult = await cloudinaryResponse.json();
      console.log(cloudinaryResult);
      setUrl(cloudinaryResult.secure_url);

      // Now send the Cloudinary URL to your server
      const serverResponse = await fetch(
        " https://b932-14-194-211-58.ngrok-free.app/process-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: cloudinaryResult.secure_url,
            prompt: "What's in  the picture?",
          }),
        }
      );

      if (!serverResponse.ok) {
        throw new Error("Failed to process image on the server");
      }

      const serverResult = await serverResponse.json();
      setResult(JSON.stringify(serverResult));
    } catch (error) {
      console.error("Error:", error);
      setResult("Error uploading or processing image");
    }
  };

  return (
    <div className="">
      <div className="p-5 text-green-500  shadow-sm">
        <div> </div>
        <h1 className=" text-[20px] text-center"> Scanner</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="p-4 min-h-screen flex justify-center items-center">
        <div className="">
          <div className="mb-2">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button onClick={() => {}}>Upload Image</button>{" "}
            {/* The upload is handled by the file input change */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <div className="max-w-[calc(100vw-16px)] break-words flex flex-col gap-2 my-4">
              <a href={url} target="_blank" className="break-words underline">
                {url}
              </a>
              {result && <p className="font-medium">{result}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
