import Link from "next/link";
import UserInfo from "../Components/user-info";
import WeatherInfo from "../Components/weather";
import SoilInfo from "../Components/soil-info";
import GovernmentSchemes from "../Components/government-scheme";
import { FaHome } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { FaPeopleRobbery } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";

const Dashboard = () => {
   return (
      <main className='w-screen h-screen '>
         {/* main dashboard */}

         {/* main heading */}
         <UserInfo />

         {/* weather information */}
         <WeatherInfo />

         {/* soil information */}
         <SoilInfo />

         {/* Government schemes */}
         <GovernmentSchemes />

         {/* footer */}
         <div className="flex items-center justify-center z-10">
            <footer className='absolute bottom-4 border h-[10%] rounded-2xl shadow-lg flex items-center justify-evenly gap-4 mx-4 w-[90%] px-2 text-center'>
               {/* <Link href='/'></Link> */}
               <Link href='/'><FaHome /></Link>
               <Link href='/identify'><FaCameraRetro /></Link>
               <Link href='/'><FaPeopleRobbery /></Link>
               <Link href='/'><IoChatboxEllipses /></Link>
            </footer>
         </div>
      </main>
   );
};

export default Dashboard;
