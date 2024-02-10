import Link from "next/link";
import UserInfo from "../Components/user-info";
import WeatherInfo from "../Components/weather";
import SoilInfo from "../Components/soil-info";
import GovernmentSchemes from "../Components/government-scheme";

const Dashboard = () => {
  return (
    <main className="h-screen p-2">
      {/* main dashboard */}

      {/* main heading */}
      <UserInfo />

      {/* weather information */}
      <WeatherInfo />

      {/* soil information */}
      <SoilInfo />

      {/* Government schemes */}
      <GovernmentSchemes />

      <div className="z-10 w-full">
        <footer className="absolute left-2 right-2 bottom-8 border rounded-sm shadow-sm gap-4 px-2 text-center">
          <div className="relative h-6 w-full flex items-center justify-center gap-12">
            <Link
              href="/identify"
              className=" h-10 w-10 bg-red-100 rounded-full flex justify-center items-center border"
            >
              A
            </Link>
            <Link
              href="/identify"
              className=" h-14 w-14 bg-red-100 rounded-full flex justify-center items-center border"
            >
              A
            </Link>
            <Link
              href="/identify"
              className=" h-10 w-10 bg-red-100 rounded-full flex justify-center items-center border"
            >
              A
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Dashboard;
