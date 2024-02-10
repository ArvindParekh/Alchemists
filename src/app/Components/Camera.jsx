"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const CameraComponent = () => {
   const webcamRef = useRef(null);
   const [capturing, setCapturing] = useState(false);
   const [capturedImage, setCapturedImage] = useState(null);
   const [prompt, setPrompt] = useState("");
   const handleStartCapture = () => {
      setCapturing(true);
   };

   // Access your API key (see "Set up your API key" above)
   const genAI = new GoogleGenerativeAI(
      "AIzaSyAXHmtulh-E58AHJkGOL4hOjvSg6UPMsHU"
   );

   const handleCapture = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      const filename = "image.jpg";
      const file = base64ToFile(imageSrc, filename);
      
      console.log(file);
      run(file);
   };

   // Converts a File object to a GoogleGenerativeAI.Part object.
   async function fileToGenerativePart(file) {
      const base64EncodedDataPromise = new Promise((resolve) => {
         const reader = new FileReader();
         reader.onloadend = () => resolve(reader.result.split(",")[1]);
         reader.readAsDataURL(file);
      });
      return {
         inlineData: {
            data: await base64EncodedDataPromise,
            mimeType: file.type,
         },
      };
   }



   

   async function run(file) {
      // For text-and-images input (multimodal), use the gemini-pro-vision model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      // No need to select an input element since we have the file from the webcam capture
      const imageParts = await fileToGenerativePart(file);

      const result = await model.generateContent([prompt, imageParts]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
   }

   //  run();

   function base64ToFile(dataUrl, filename) {
      // Extract the base64 part and MIME type from the data URL
      const arr = dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);

      // Convert the base64 string to a byte array
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
         u8arr[n] = bstr.charCodeAt(n);
      }

      // Create a File object from the byte array
      const file = new File([u8arr], filename, { type: mime });
      console.log(file);
      return file;
   }

   const handleDownload = () => {
      const blob = dataURItoBlob(capturedImage);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "captured_photo.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
   };

   // Convert Data URI to Blob
   const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
         ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
   };

   return (
      <div>
         <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            videoConstraints={{
               width: 1280,
               height: 720,
               facingMode: "user",
            }}
         />
         <input
            className='border-2'
            value={prompt}
            onChange={(event) => {
               setPrompt(event.target.value);
            }}
         ></input>
         {capturing ? (
            <>
               <button onClick={handleStopCapture}>Stop Capture</button>
            </>
         ) : (
            <button onClick={handleCapture}>Capture</button>
            // <button onClick={handleStartCapture}>Start Capture</button>
         )}
         {capturedImage && (
            <>
               <img src={capturedImage} alt='Captured' />
               <button onClick={handleDownload}>Download Photo</button>
            </>
         )}
      </div>
   );
};

export default CameraComponent;


