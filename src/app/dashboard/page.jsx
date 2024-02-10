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
import { LanguageSwitcher } from "../../components/lang-switcher";

const Dashboard = () => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-green-100 px-4 sm:px-6 lg:px-8">
      <LanguageSwitcher />
      {/* main dashboard */}
      <div className="w-full max-w-2xl mb-8">
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
      <div className="flex items-center justify-center z-10">
        <footer className="absolute bottom-4 border h-16 rounded-2xl shadow-lg flex items-center justify-evenly gap-4 mx-4 w-full px-2 text-center bg-green-500">
          <Link href="/marketplace">
            <FaHome />
          </Link>
          <Link href="/identify">
            <FaCameraRetro />
          </Link>
          <Link href="/community">
            <FaPeopleRobbery />
          </Link>
          <Link href="/expertChat">
            <IoChatboxEllipses />
          </Link>
        </footer>
      </div>
    </main>
  );
};
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
