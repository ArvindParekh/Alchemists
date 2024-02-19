"use client";

import UserInfo from "../Components/user-info";
import Link from "next/link";
import WeatherInfo from "../Components/weather";
import SoilInfo from "../Components/soil-info";
import GovernmentSchemes from "../Components/government-scheme";
import { FaHome } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { FaPeopleRobbery } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Import } from "lucide-react";

function Dashboard() {
   const router = useRouter();
   const [crops, setCrops] = useState(null);
   const [externalData, setExternalData] = useState(null);
   const searchParams = useSearchParams(); // Call the hook at the top level

   useEffect(() => {
      // Get the 'crops' value from the search params
      const cropsQueryParam = searchParams.get("crops");
      if (cropsQueryParam) {
         const decodedCrops = JSON.parse(decodeURIComponent(cropsQueryParam));
         setCrops(decodedCrops);
      }
   }, [searchParams]); // Empty dependency array means this effect runs once on mount

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${import.meta.env.VITE_GOV_DATA_API_KEY}&format=json`
            );
            const data = await response.json();
            setExternalData(data);
            console.log(data.records[0].commodity);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      fetchData();
   }, []);
   return (
      <main className='flex flex-col items-center min-h-screen bg-green-100 px-4 sm:px-6 lg:px-8'>
         {/* main dashboard */}
         <div className='w-full max-w-2xl mb-8'>
            {/* main heading */}
            <UserInfo />

            {/* weather information */}
            <WeatherInfo />

            {/* soil information */}
            <SoilInfo />

            {/* Government schemes */}
            <GovernmentSchemes />
         </div>

         {/* footer */}
         <div className='flex items-center justify-center z-10'>
            <footer className='absolute bottom-4 border h-16 rounded-2xl shadow-lg flex items-center justify-evenly gap-4 mx-4 w-full px-2 text-center bg-green-500'>
               <Link href='/marketplace'>
                  <FaHome />
               </Link>
               <Link href='/identify'>
                  <FaCameraRetro />
               </Link>
               <Link href='/community'>
                  <FaPeopleRobbery />
               </Link>
               <div
            className=" cursor-pointer"
            onClick={() => {
              fetch("https://rest.nexmo.com/sms/json", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  from: "Farmour",
                  text: "Hey there, Looking for a guidence here is my no: +918939894913",
                  to: "917283820013",
                  api_key: import.meta.env.VITE_VONAGE_API_KEY,
                  api_secret: import.meta.env.VITE_VONAGE_API_SECRET,
                }),
              })
                .then((response) => {
                  alert("Sms sent successfully");
                })
                .catch((error) => {
                  alert("Failed sending sms");
                  console.log(error);
                });
            }}
          >
            <IoChatboxEllipses />
          </div>
            </footer>
         </div>
      </main>
   );
}
export default Dashboard;
// import Link from "next/link";
// import UserInfo from "../Components/user-info";
// import WeatherInfo from "../Components/weather";
// import SoilInfo from "../Components/soil-info";
// import GovernmentSchemes from "../Components/government-scheme";
// import { FaHome } from "react-icons/fa";
// import { FaCameraRetro } from "react-icons/fa";
// import { FaPeopleRobbery } from "react-icons/fa6";
// import { IoChatboxEllipses } from "react-icons/io5";

// const Dashboard = () => {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-green-100 py-2 px-4 sm:px-6 lg:px-8">
//       {/* main dashboard */}
//       <div className="w-full max-w-2xl mb-8">
//         {/* main heading */}
//         <UserInfo />

//         {/* weather information */}
//         <WeatherInfo />

//         {/* soil information */}
//         <SoilInfo />

//         {/* Government schemes */}
//         <GovernmentSchemes />
//       </div>

//       {/* footer */}
//       <div className="flex items-center justify-center z-10">
//         <footer className="absolute bottom-4 border h-16 rounded-2xl shadow-lg flex items-center justify-evenly gap-4 mx-4 w-full px-2 text-center bg-green-500">
//           <Link href="/"><FaHome /></Link>
//           <Link href="/identify"><FaCameraRetro /></Link>
//           <Link href="/community"><a className="text-white"><FaPeopleRobbery /></a>import Link from "next/link";

// export default Dashboard;
// </Link>
//           <Link href="/"><a className="text-white"><IoChatboxEllipses /></a></Link>
//         </footer>
//       </div>
//     </main>
//   );
// };
