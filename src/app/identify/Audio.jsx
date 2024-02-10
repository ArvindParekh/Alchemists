// src/components/Audio.js
import React, { useState, useRef } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import useGlobalState from "../Components/globalstate";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-vX_WudF4qGkdtUTpoZwW_iSdpjUkDRE",
    authDomain: "donorplate.firebaseapp.com",
    databaseURL: "https://donorplate-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "donorplate",
    storageBucket: "donorplate.appspot.com",
    messagingSenderId: "373333971918",
    appId: "1:373333971918:web:d7044f9f83312cba2f919f",
    measurementId: "G-WBQ9WNMMP3"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);


export const Audio = ({onComplete}) => {
    const { setPrompt } = useGlobalState();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const [Url,setUrl]=useState('')
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    let audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      setAudioBlob(audioBlob);
      audioChunks = []; // Reset chunks array for the next recording
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
   
   
  };
  const sendAudioUrlToServer = async (audioUrl) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio_url:audioUrl }),
      });
      const data = await response.json();
      setPrompt(data.text); 
      onComplete(data.text)
      console.log("Server response:", data.text);
    } catch (error) {
      console.error("Error sending audio URL to server:", error);
    }
  };
  const handleSubmit = async () => {
    if (!audioBlob) {
      alert("No recording available to submit");
      return;
    }

    const audioFileName = `audio_${new Date().getTime()}.wav`;
    const audioRef = ref(storage, `audios/${audioFileName}`);

    try {
      await uploadBytes(audioRef, audioBlob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("Uploaded audio URL:", url);
          setUrl(url)
          alert(`Audio uploaded successfully. URL: ${url}`);
          sendAudioUrlToServer(url)
        });
      });
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Error submitting audio for transcription");
    }
  };

  return (
    <div>
        
      <button className="text-white px-3 py-2 bg-green-500 rounded-md" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? (<FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>) :( <FontAwesomeIcon icon={faStop}></FontAwesomeIcon>)}
      </button>
      <button className="text-white px-3 py-2 bg-green-500 rounded-md" onClick={ handleSubmit}>
      <FontAwesomeIcon icon={faExchange}></FontAwesomeIcon>
      </button>
     
    </div>
  );
};
