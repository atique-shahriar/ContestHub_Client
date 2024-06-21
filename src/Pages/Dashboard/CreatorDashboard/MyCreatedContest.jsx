import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyCreatedContest = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext);
  const {email} = user;
  console.log(email);

  const {data: contests = []} = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      const creatorContestData = res.data;
      const creatorContest = creatorContestData.filter((item) => item.contestCreatorEmail === email);
      return creatorContest;
    },
  });
  console.log(contests);
  return (
    <div>
      {" "}
      <h3 className="text-center text-3xl">Total Contests: {contests.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Participants</th>
              <th>Delete</th>
              <th>Block Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.contestName}</td>
                <td>{contest.participants}</td>

                <td>
                  {contest.confirmation == true ? (
                    <>
                      <button className="btn disabled">Can&apos;t Delete</button>
                    </>
                  ) : (
                    <>
                      <button className="btn">Delete</button>
                    </>
                  )}
                </td>
                <td>
                  {contest.confirmation == true ? (
                    <>
                      <button className="btn disabled">Can&apos;t Edit</button>
                    </>
                  ) : (
                    <>
                      <button className="btn">Edit</button>
                    </>
                  )}
                </td>
                <td>
                  {contest.confirmation == true ? (
                    <>
                      <p className="">Accepted</p>
                    </>
                  ) : (
                    <>
                      <p className="">Pending</p>
                    </>
                  )}
                </td>
                <td>
                  <Link to="/dashboard/contestSubmittedPage" className="btn">
                    Submission
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCreatedContest;
