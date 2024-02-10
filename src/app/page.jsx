"use client";
import Image from "next/image";
import VideoRecorder, { CameraComponent } from "./identify/Camera";
import Link from "next/link";

export default function Home() {
  return (
    // <CameraComponent></CameraComponent>
    <div className="min-h-screen flex justify-center items-center">
      <Link
        href="/dashboard"
        className="bg-green-600 text-white px-6 py-3 rounded-sm cursor-pointer"
      >
        Get Started
      </Link>
    </div>
    // <Dashboard />
  );
}
