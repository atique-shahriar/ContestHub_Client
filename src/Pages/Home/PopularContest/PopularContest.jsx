import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import PopularContestCard from "./PopularContestCard";

const PopularContest = () => {
  const [contests, setContests] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/contests").then((res) => {
      setContests(res.data);
    });
  }, [axiosPublic]);

  let displayContests = contests.filter((item) => item.confirmation == true);

  if (displayContests.length > 6) {
    displayContests = contests.slice(0, 6);
  }
  console.log(displayContests);

  return (
    <div className="w-11/12 lg:w-4/5 mx-auto my-10 space-y-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <h3 className="text-3xl font-bold text-[#3672B7]">Popular Contest</h3>
        <p className=" max-w-screen-lg">Join our most popular contests and showcase your talents. Compete in various categories, win exciting prizes, and gain recognition in our vibrant community!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {displayContests.map((contest) => (
          <PopularContestCard key={contest._id} contest={contest}></PopularContestCard>
        ))}
      </div>
    </div>
  );
};

export default PopularContest;
