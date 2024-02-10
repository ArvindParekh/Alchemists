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
        <footer className="absolute left-2 right-2 bottom-4 border rounded-sm shadow-sm flex items-center justify-evenly gap-4 px-2 text-center">
          <Link href="/">one</Link>
          <Link href="/">two</Link>
          <Link href="/identify">Disease Identification</Link>
          <Link href="/">helo</Link>
          <Link href="/">four</Link>
        </footer>
      </div>
    </main>
  );
};

export default Dashboard;
