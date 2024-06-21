import { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyParticipatedContest = () => {
  const {user} = useContext(AuthContext);

  const [allContests, setAllContests] = useState([]);
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/contests").then((res) => {
      setAllContests(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get("/payments").then((res) => {
      setPayments(res.data);
    });
  }, [axiosSecure]);

  const userPayment = payments.filter((item) => item.email == user.email);
  console.log(userPayment);

  const userContests = allContests.filter((item) => Array.isArray(item.contestRegistered) && item.contestRegistered.includes(user.email));

  const contests = userContests.sort((a, b) => {
    const dateA = new Date(a.contestDeadline);
    const dateB = new Date(b.contestDeadline);
    return dateA - dateB;
  });

  return (
    <div>
      <h3 className="text-3xl font-bold text-[#3672B7] text-center mt-6 mb-4">My Contests: {contests.length}</h3>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Contest Name</th>
              <th>Deadline</th>
              <th>Participants</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.contestName}</td>
                <td>
                  <Countdown
                    date={contest.contestDeadline}
                    renderer={({days, hours, minutes, seconds, completed}) => {
                      if (!completed) {
                        return (
                          <span>
                            {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                          </span>
                        );
                      } else {
                        return <span className="text-red-600 font-bold">Time Over</span>;
                      }
                    }}
                  />
                </td>

                <td>{contest.contestParticipants}</td>
                <td>Paid</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParticipatedContest;
