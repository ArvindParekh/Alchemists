import Link from "next/link";
import UserInfo from "../Components/user-info";
import WeatherInfo from "../Components/weather";
import SoilInfo from "../Components/soil-info";
import GovernmentSchemes from "../Components/government-scheme";

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
               <Link href='/'>one</Link>
               <Link href='/'>two</Link>
               <Link href='/identify'>Disease Identification</Link>
               <Link href='/'>helo</Link>
               <Link href='/'>four</Link>
            </footer>
         </div>
      </main>
   );
};

export default Dashboard;
