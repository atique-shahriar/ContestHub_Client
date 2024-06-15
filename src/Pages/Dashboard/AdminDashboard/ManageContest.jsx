import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import CommentModal from "./CommentModal";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const [contestValue, setContestValue] = useState(null);

  const {data: contests = [], refetch} = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
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

  const handleConfirmContest = (contest) => {
    Swal.fire({
      title: "Are you sure to confirm this one?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.put(`/contests/${contest._id}`).then((res) => {
          refetch();
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Confirmed",
              text: "Contest is Confirmed",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleComment = (contest) => {
    setContestValue(contest);
    document.getElementById("commentModal").showModal();
  };

  return (
    <div>
      <dialog
        id="commentModal"
        className="modal">
        <CommentModal contest={contestValue}></CommentModal>
      </dialog>
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
                <td>
                  {contest.contestName} <br />
                  {contest.contestCreatorName}
                </td>
                <td>{contest.participants}</td>

                <td>
                  <button
                    className="btn"
                    onClick={() => handleDeleteContest(contest)}>
                    Delete
                  </button>
                </td>
                <td>
                  {contest.confirmation == true ? (
                    <>
                      <button className="btn disabled">Confirmed</button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn"
                        onClick={() => handleConfirmContest(contest)}>
                        Confirm
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleComment(contest)}>
                    Comments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContest;
