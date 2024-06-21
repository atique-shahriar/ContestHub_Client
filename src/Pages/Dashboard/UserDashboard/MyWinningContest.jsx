import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyWinningContest = () => {
  const {user} = useContext(AuthContext);

  const [winContests, setWinContests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/winners").then((res) => {
      setWinContests(res.data);
    });
  }, [axiosSecure]);

  const myWinContest = winContests.filter((item) => item.participantEmail == user.email);
  console.log(myWinContest);

  return (
    <div>
      <h3 className="text-3xl font-bold text-[#3672B7] text-center mt-6 mb-4">Winning Contests: {myWinContest.length}</h3>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Contest Name</th>
              <th>Participants</th>
              <th>Price (BDT)</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myWinContest.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.participantContestName}</td>
                <td>{contest.participantNumber}</td>
                <td>{contest.participantPrize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWinningContest;
