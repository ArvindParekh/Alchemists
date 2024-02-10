import React, { useState } from 'react';

import { AssemblyAI } from 'assemblyai'
export const CameraComponent = () => {
  const [result, setResult] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [url,setUrl]=useState('')
  const [prompt,setPrompt]=useState('')
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log('No file selected.');
      return;
    }

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'vcyhizgs');

   
    const uploadUrl = `https://api.cloudinary.com/v1_1/dsjkch2eh/image/upload/`;

    try {
      const cloudinaryResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        
      });

      if (!cloudinaryResponse.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const cloudinaryResult = await cloudinaryResponse.json();
      console.log(cloudinaryResult)
      setUrl(cloudinaryResult.secure_url)


      const serverResponse = await fetch(' https://b932-14-194-211-58.ngrok-free.app/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: cloudinaryResult.secure_url,
          prompt: prompt,
        }),
      });

      if (!serverResponse.ok) {
        throw new Error('Failed to process image on the server');
      }

      const serverResult = await serverResponse.json();
      setResult(JSON.stringify(serverResult));
    } catch (error) {
      console.error('Error:', error);
      setResult('Error uploading or processing image');
    }
  };

  return (
    <div>
      <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
      <button onClick={() => {}}>Upload Image</button> {/* The upload is handled by the file input change */}
      <input className='border-2' value={prompt} onChange={(event)=>{
        setPrompt(event.target.value)
      }}></input>
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
      Url:{url}
      {result && <p>{result}</p>}
    </div>
  );
};

export default CameraComponent;
