import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

export const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleStartCapture = () => {
    setCapturing(true);
  };

  const handleStopCapture = () => {
    setCapturing(false);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const handleDownload = () => {
    const blob = dataURItoBlob(capturedImage);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captured_photo.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Convert Data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
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
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: 'user',
        }}
      />
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
          <img src={capturedImage} alt="Captured" />
          <button onClick={handleDownload}>Download Photo</button>
        </>
      )}
    </div>
  );
};

export default CameraComponent;
