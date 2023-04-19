
// leaderboard Page
import Image from "next/image";
import Card from "@/components/containers/Card";
import LeaderboardTabs from "@/components/navigation/LeaderboardTabs";

const Page = async () => {

  return (
    <div className="content">
      <span className="text-h1 mb-4">Leaderboards</span>
      <div className="flex flex-col lg:flex-row gap-4 w-full justify-center">
        <div className="flex flex-col gap-y-4">
          <Card className="bg-seafoam max-w-sm">
            <div className="flex justify-between">
              <span>My Rank</span>
              <span>My Score</span>
            </div>
            <div className="flex justify-between uppercase text-lg  font-semibold">
              <span>1st Place</span>
              <span>95</span>
            </div>
          </Card>
          <Card className="bg-taffy text-center items-center max-w-sm">
            <div className="flex flex-col space-y-4">
              <span className="text-2xl font-normal">First Place Last Month</span>
              <Image
                src="https://i.imgur.com/MgYBxfS.jpeg"
                alt="profile pic"
                className="rounded-full mx-auto"
                width={128}
                height={128}
              />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">Username</span>
                <span className="text-sm">0xD34D..833F</span>
              </div>
            </div>
          </Card>

        </div>
        <Card className="bg-chocolate text-center items-center max-w-xl">
          <LeaderboardTabs />
        </Card>
      </div>
    </div>
  );
}

export default Page;