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
      <h3 className="text-center text-3xl">Total Contests: {displayContests.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Contest Prize Money</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {displayContests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>
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
