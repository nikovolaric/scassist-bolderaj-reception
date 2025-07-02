import Header from "../components/Header";
import DailyStats from "../features/dashboard/DailyStats";
import WelcomeSection from "../features/dashboard/WelcomeSection";

function Dashboard() {
  return (
    <div className="my-16 flex flex-col gap-25">
      <Header />
      <WelcomeSection />
      <div className="grid grid-cols-[2fr_1fr]">
        <DailyStats />
      </div>
    </div>
  );
}

export default Dashboard;
