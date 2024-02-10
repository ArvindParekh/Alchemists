import React, { useState, useRef } from "react";

export const Audio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    // navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    //   const mediaRecorder = new MediaRecorder(stream);
    //   mediaRecorderRef.current = mediaRecorder;
    //   mediaRecorder.start();
    //   const audioChunks = [];
    //   mediaRecorder.ondataavailable = event => {
    //     audioChunks.push(event.data);
    //   };
    //   mediaRecorder.onstop = () => {
    //     console.log('audioChunks',audioChunks);
    //     const audioBlob = new Blob([audioChunks], {type : 'audio/ogg'});
    //     var blobUrl = URL.createObjectURL(audioBlob);

    //     // const audioBlob = new Blob(audioChunks);
    //     console.log(blobUrl);
    //     setAudioBlob(audioBlob);
    //   };
    //   setIsRecording(true);
    // });
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create a MediaRecorder object
    const recorder = new MediaRecorder(stream);

    // Start recording
    recorder.start();

    // Create an empty array to store the audio chunks
    const audioChunks = [];

    // Add an event listener for the 'dataavailable' event
    recorder.addEventListener("dataavailable", (event) => {
      // Add the audio chunk to the array
      audioChunks.push(event.data);
    });

    // Add an event listener for the 'stop' event
    recorder.addEventListener("stop", (event) => {
      // Create a blob from the audio chunks
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      setAudioBlob(audioBlob);
      console.log(audioBlob);
      setIsRecording(false);

      // Do something with the blob, e.g. save it to a file or upload it to a server
    });

    // Stop recording after 5 seconds
    setTimeout(() => {
      recorder.stop();
    }, 5000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSubmit = async () => {
    if (!audioBlob) {
      alert("No recording available to submit");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob);

    console.log(formData, audioBlob);

    // Replace '/api/transcribe' with your API route
    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Error submitting audio for transcription");
      return;
    }

    const data = await response.json();
    console.log(data); // Handle/display the response from your API route
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <button onClick={handleSubmit} disabled={!audioBlob}>
        Submit Recording
      </button>
    </div>
  );
};
