import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import CommentModal from "./CommentModal";
import DateEditModal from "./DateEditModal";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const [contestValue, setContestValue] = useState(null);
  const [editContest, setEditContest] = useState(null);

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

  const handleEditDateContest = (contest) => {
    setEditContest(contest);
    document.getElementById("editModal").showModal();
  };

  return (
    <div>
      <dialog id="commentModal" className="modal">
        <CommentModal contest={contestValue}></CommentModal>
      </dialog>
      <dialog id="editModal" className="modal">
        <DateEditModal contest={editContest}></DateEditModal>
      </dialog>
      <h3 className="text-3xl font-bold text-[#3672B7] text-center mt-6 mb-4">Total Contests: {contests.length}</h3>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Details</th>
              <th>Participants</th>
              <th>Delete</th>
              <th>Update Date (Winning Purpose)</th>
              <th>Confirmation</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>
                  {contest.contestName} <br />
                  <span className="font-bold">Creator: </span> {contest.contestCreatorName}
                </td>
                <td>{contest.contestParticipants}</td>

                <td>
                  <button className="text-2xl hover:text-3xl text-red-600" onClick={() => handleDeleteContest(contest)}>
                    <MdDeleteOutline />
                  </button>
                </td>
                <td>
                  {" "}
                  <button className="text-2xl hover:text-3xl text-green-700" onClick={() => handleEditDateContest(contest)}>
                    <FaEdit />
                  </button>
                </td>

                <td>
                  {contest.confirmation == true ? (
                    <>
                      <span className="disabled text-green-700 font-bold">Confirmed</span>
                    </>
                  ) : (
                    <>
                      <button className="text-2xl hover:text-3xl text-green-700" onClick={() => handleConfirmContest(contest)}>
                        <GiConfirmed />
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <button className="text-2xl hover:text-3xl text-blue-700" onClick={() => handleComment(contest)}>
                    <AiOutlineComment />
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
