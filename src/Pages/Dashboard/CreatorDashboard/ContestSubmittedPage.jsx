import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ContestSubmittedPage = () => {
  const [contests, setContests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/contests").then((res) => {
      setContests(res.data);
    });
  }, [axiosSecure]);

  let displayContests = contests.filter((item) => item.confirmation == true);

  return (
    <div>
      <h3 className="text-3xl font-bold text-[#3672B7] text-center mt-6 mb-4">All Sumbitted Contest: {displayContests.length}</h3>
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr>
              <th>SL</th>
              <th>Contest Name</th>
              <th>Prize Money</th>
            </tr>
          </thead>
          <tbody>
            {displayContests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td className="text-blue-600">
                  <Link to={`/dashboard/contestSubmittedPage/titleWiseContest/${contest._id}`}>{contest.contestName}</Link>
                </td>
                <td>{contest.contestPriceMoney}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestSubmittedPage;
