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
      <div className="text-center space-y-4 flex flex-col items-center">
        <h3 className="text-3xl font-bold text-[#199DFF]">Popular Contest</h3>
        <p className=" max-w-screen-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui quis assumenda doloribus id amet ducimus! Perspiciatis blanditiis inventore incidunt laboriosam.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
        {displayContests.map((contest) => (
          <PopularContestCard
            key={contest._id}
            contest={contest}></PopularContestCard>
        ))}
      </div>
    </div>
  );
};

export default PopularContest;
