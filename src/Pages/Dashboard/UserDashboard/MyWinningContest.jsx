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
      <h3 className="text-center text-3xl">Total Contests: {myWinContest.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Deadline</th>
              <th>Total Participants</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myWinContest.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.participantContestName}</td>
                <td>{contest.participantName}</td>
                <td>{contest.participantEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWinningContest;
