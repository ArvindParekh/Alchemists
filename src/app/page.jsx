'use client'
import Image from "next/image";
import VideoRecorder, { CameraComponent } from "./identify/Camera";
import Link from "next/link";

export default function Home() {
  return (
    // <CameraComponent></CameraComponent>
    <Link href='/dashboard'>Get Started</Link>
    // <Dashboard />
  );
};