import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CommentModal = ({contest}) => {
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axiosSecure
      .put(`contestsComment/${contest._id}`, {comment})
      .then((res) => {
        console.log(res.data);
        toast.success("Updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to update");
        console.error("There was an error updating the comment!", error);
      });
  };

  return (
    <div className="modal-box">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleCommentSubmit}>
        <div className="flex items-center justify-center mb-4">
          <h4 className="text-2xl font-bold">Write Your Comment</h4>
        </div>
        <div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="comment"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)} // Update the state on change
          />
        </div>

        <div className="w-full flex justify-center">
          <input className="px-6 text-white hover:text-[#199DFF] bg-[#199DFF] py-2 mt-4 border-[#199DFF] border-2 font-medium rounded-lg hover:border-[#199DFF] hover:bg-white hover:bg-opacity-10" type="submit" value="Comment" />
        </div>
      </form>
      <form method="dialog">
        <button className="btn btn-sm bg-gray-300 hover:bg-[#3672B7] text-white hover:text-black btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  );
};

CommentModal.propTypes = {
  contest: PropTypes.object.isRequired,
};

export default CommentModal;
