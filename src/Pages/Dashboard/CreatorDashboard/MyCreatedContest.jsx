import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyCreatedContest = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext);
  const {email} = user;
  console.log(email);

  const {data: contests = [], refetch} = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      const creatorContestData = res.data;
      const creatorContest = creatorContestData.filter((item) => item.contestCreatorEmail === email);
      return creatorContest;
    },
  });

  const handleDeleteContest = (contest) => {
    console.log(contest);
    Swal.fire({
      title: "Are you sure to delete this one?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`contests/${contest._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Contest is deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  console.log(contests);
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold text-[#3672B7] text-center mt-6 mb-4">Created Contest: {contests.length}</h3>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead className="">
            <tr>
              <th>SL</th>
              <th>Contest Name</th>
              <th>Participants</th>
              <th>Delete</th>
              <th>Edit</th>
              <th>Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.contestName}</td>
                <td>{contest.contestParticipants}</td>
                <td>
                  {contest.confirmation == true ? (
                    <>
                      <span className="text-blue-700 font-semibold">Can&apos;t Delete</span>
                    </>
                  ) : (
                    <>
                      <button className="text-2xl hover:text-3xl text-red-600" onClick={() => handleDeleteContest(contest)}>
                        <MdDeleteOutline />
                      </button>
                    </>
                  )}
                </td>
                <td>
                  {contest.confirmation == true ? (
                    <>
                      <span className="text-blue-700 font-semibold">Can&apos;t Edit</span>
                    </>
                  ) : (
                    <>
                      <button className="text-2xl hover:text-3xl text-green-700">
                        <FaEdit />
                      </button>
                    </>
                  )}
                </td>
                <td>
                  {contest.confirmation == true ? (
                    <>
                      <p className="text-blue-600 font-semibold">Accepted</p>
                    </>
                  ) : (
                    <>
                      <p className="text-red-600 font-semibold">Pending</p>
                    </>
                  )}
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
