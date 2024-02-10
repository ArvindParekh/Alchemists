import React, { useState } from "react";
import { FilePicker } from "@capawesome/capacitor-file-picker";

// pass base64 version of the image to gemini

export const CameraComponent = () => {
   const [result, setResult] = useState("");
   const [imagePreview, setImagePreview] = useState(""); // Add state for image preview

   const pickAndUploadImage = async () => {
      try {
         const pickedFile = await FilePicker.pickFiles({
            types: ["image/jpeg", "image/png"],
            multiple: false,
         });

         if (!pickedFile.files.length) {
            console.log("No file selected.");
            return;
         }

         //   const fileUri = pickedFile.files[0].uri;
         //   setImagePreview(fileUri); // Set image preview URI
         //   const imageParts = [
         //     fileToGenerativePart(fileUri, 'image/jpeg')
         //   ]

         //   const response = await fetch(fileUri);
         //   const blob = await response.blob();

         const formData = new FormData();
         //   console.log(blob)
         console.log(pickedFile);
         //   formData.append('file', blob, pickedFile.files[0].name); // Use the actual file name
         formData.append("file", pickedFile);
         formData.append("prompt", "What's different between these pictures?");

         const uploadResponse = await fetch(
            "https://4112-14-194-211-58.ngrok-free.app/process-image",
            {
               method: "POST",
               body: formData,
            }
         );

         if (!uploadResponse.ok) {
            throw new Error("Failed to upload image");
         }

         const uploadResult = await uploadResponse.json();
         setResult(JSON.stringify(uploadResult));
      } catch (error) {
         console.error("Error:", error);
         setResult("Error uploading image");
      }

      function fileToGenerativePart(path, mimeType) {
         return {
            inlineData: {
               data: Buffer.from(fs.readFileSync(path)).toString("base64"),
               mimeType,
            },
         };
      }
   };

   return (
      <div>
         <button onClick={pickAndUploadImage}>Upload Image</button>
         {imagePreview && (
            <img
               src={imagePreview}
               alt='Preview'
               style={{ width: "100px", height: "100px" }}
            />
         )}
         {result && <p>{result}</p>}
      </div>
   );
};

export default CameraComponent;
