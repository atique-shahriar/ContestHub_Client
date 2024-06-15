import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Providers/AuthProvider";

const AddContest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleAddContest = (e) => {
    e.preventDefault();
    const contestName = e.target.contestName.value;
    const contestImageUrl = e.target.contestImageUrl.value;
    const contestDescription = e.target.contestDescription.value;
    const contestPrice = e.target.contestPrice.value;
    const contestPriceMoney = e.target.contestPriceMoney.value;
    const contestSubmissionInstruction = e.target.contestSubmissionInstruction.value;
    const contestType = e.target.contestType.value;
    const contestDeadline = startDate;
    const contestCreatorEmail = user.email;
    const contestCreatorName = user.name;
    const contestParticipants = 0;
    const confirmation = false;
    const contestInfo = {
      contestName,
      contestImageUrl,
      contestDescription,
      contestPrice,
      contestPriceMoney,
      contestSubmissionInstruction,
      contestType,
      contestDeadline,
      contestCreatorEmail,
      contestCreatorName,
      contestParticipants,
      confirmation,
    };

    axiosSecure.post("/contests", contestInfo).then((res) => {
      console.log(res.data);
    });

    Swal.fire("Contest Added Successfully");
  };
  return (
    <div className="px-20">
      <h2 className="text-xl font-bold text-[#FF3811] mb-4 text-center">Add Contest</h2>
      <form onSubmit={handleAddContest}>
        <div>
          <label className="block font-bold mb-2">Contest Name</label>
          <input
            type="text"
            name="contestName"
            placeholder="Type the name of contest"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none "
          />
        </div>

        <div className="mb-4 mt-4">
          <label className="block font-bold mb-2">Contest Image URL</label>
          <input
            type="text"
            name="contestImageUrl"
            placeholder="Type contest image url"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none "
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Contest Description</label>
          <textarea
            name="contestDescription"
            required
            rows="4"
            placeholder="Write contest description . . . . . . "
            className="w-full px-4 py-2 border  resize-none rounded-md comment focus:outline-none "></textarea>
        </div>

        <div className="mb-4 mt-4">
          <label className="block font-bold mb-2">Contest Price</label>
          <input
            type="text"
            name="contestPrice"
            placeholder="Type contest price"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none "
          />
        </div>

        <div className="mb-4 mt-4">
          <label className="block font-bold mb-2">Contest Price Money</label>
          <input
            type="text"
            name="contestPriceMoney"
            placeholder="Type contest price money"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none "
          />
        </div>

        <div className="mb-4 mt-4">
          <label className="block font-bold mb-2">Submission Instruction</label>
          <input
            type="text"
            name="contestSubmissionInstruction"
            placeholder="Type submission instruction"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none "
          />
        </div>

        <div className="flex pb-2 flex-col">
          <label className="block font-bold mb-2">Contest Type</label>
          <select
            name="contestType"
            className="select w-full border select-bordered"
            defaultValue={"default"}>
            <option
              disabled
              value="default">
              Select Contest Type
            </option>
            <option value="imageDesignContests">Image Design Contests</option>
            <option value="articleWriting">Article Writing</option>
            <option value="gamingReview">Gaming Review</option>
            <option value="bookReview">Book Review</option>
            <option value="movieReview">Movie Review</option>
          </select>
        </div>

        <div className="mb-4 ">
          <label className="block font-bold mb-2">Contest Deadline</label>
          <DatePicker
            className="w-full px-4 py-2 border rounded-md focus:outline-none "
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#6ab8fa] hover:bg-[#199DFF] text-white font-medium px-4 py-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
