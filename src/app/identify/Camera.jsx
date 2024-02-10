import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft, faArrowLeft, faMicrophone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Textarea } from "@/components/ui/textarea"
import { Audio } from "./Audio";
import useGlobalState from "../Components/globalstate";

export const CameraComponent = () => {
  const [result, setResult] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [url, setUrl] = useState("");
  const { prompt } = useGlobalState();
  const {setPrompt} = useGlobalState();
  const fileInputRef = React.useRef(null); 
  const handleFileChange = (event) => {
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
    setImage(file); // Store the file for later use
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
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
      const imageUrl = cloudinaryResult.secure_url;
      console.log("Cloudinary URL:", imageUrl);

      // Optionally send the Cloudinary URL to your server along with the prompt
      // Adjust the URL to your server endpoint
      const serverResponse = await fetch("http://localhost:3003/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          prompt: prompt,
        }),
      });

      if (!serverResponse.ok) {
        throw new Error("Failed to process image on the server");
      }

      const serverResult = await serverResponse.json();
      setResult(serverResult);
      console.log(serverResult) // Adjust according to how you want to use the server's response
      alert("Image processed successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing image");
    }
  };
  return (
    <div>
    <div className="p-5 text-green-500 absolute w-full shadow-sm">
      <div className="flex items-center">
        <div className="w-1/3 flex items-center justify-start">
          <FontAwesomeIcon icon={faAngleLeft} className="text-[25px] cursor-pointer" />
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <h1 className="text-[25px] text-center">Scanner</h1>
        </div>
        <div className="w-1/3 flex items-center justify-end">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
    <div className="p-4 min-h-screen flex justify-center items-center">
      <div>
        <div className="mb-2">
          {/* Visually hide the original file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
          {/* Stylish Tailwind button that triggers the file input */}
          {
            (imagePreview=="")?( <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold  hover:shadow-md rounded-full w-[70px] h-[70px] cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >       <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
            </button>):(<></>)
          }
          

        </div>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-[400px] h-[400px] object-cover mt-2" />
        )}
         {imagePreview && (<div className="mt-5 flex gap-1">
          <Textarea placeholder="Explain your problem" value={prompt} onChange={(event)=>{
setPrompt(event.target.value)
          }}></Textarea>
          <Audio onComplete={(value) => setPrompt(value)} />
          <button className="text-white px-3 py-2 bg-green-500 rounded-md"  onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></button>
        </div>
        )}
        

        <div className="max-w-full break-words flex flex-col gap-2 my-4">
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="break-words underline">
              View Image
            </a>
          )}
          {result && <p className="font-medium">{result.result}</p>}
        </div>
      </div>
    </div>
  </div>
  );
};

export default CameraComponent;
