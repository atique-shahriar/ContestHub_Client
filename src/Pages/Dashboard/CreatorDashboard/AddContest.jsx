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
    const contestPriceMoney = e.target.contestPrizeMoney.value;
    const contestSubmissionInstruction = e.target.contestSubmissionInstruction.value;
    const contestType = e.target.contestType.value;
    const contestDeadline = startDate;
    const contestCreatorEmail = user.email;
    const contestCreatorName = user.name;
    const contestCreatorPhoto = user.photoURL;
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
      contestCreatorPhoto,
      contestParticipants,
      confirmation,
    };

    axiosSecure.post("/contests", contestInfo).then((res) => {
      console.log(res.data);
    });

    Swal.fire("Contest Added Successfully");
  };
  return (
    <div className="">
      <h2 className="text-3xl font-bold text-[#3672B7] text-center mt-6 mb-4">Add Contest</h2>
      <form onSubmit={handleAddContest}>
        <div className="flex gap-6 flex-col md:flex-row w-full items-center mb-4">
          <div className="w-full">
            <label className="block font-bold mb-2">Contest Name</label>
            <input type="text" name="contestName" placeholder="Type the name of contest" required className="w-full px-4 py-2 border rounded-md focus:outline-none " />
          </div>

          <div className="w-full">
            <label className="block font-bold mb-2">Contest Image URL</label>
            <input type="text" name="contestImageUrl" placeholder="Type contest image url" required className="w-full px-4 py-2 border rounded-md focus:outline-none " />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Contest Description</label>
          <textarea name="contestDescription" required rows="4" placeholder="Write contest description . . . . . . " className="w-full px-4 py-2 border  resize-none rounded-md comment focus:outline-none "></textarea>
        </div>

        <div className="flex gap-6 flex-col md:flex-row w-full items-center mb-4">
          <div className="w-full">
            <label className="block font-bold mb-2">Contest Price</label>
            <input type="text" name="contestPrice" placeholder="Type contest price" required className="w-full px-4 py-2 border rounded-md focus:outline-none " />
          </div>

          <div className="w-full">
            <label className="block font-bold mb-2">Contest Prize Money</label>
            <input type="text" name="contestPrizeMoney" placeholder="Type contest prize money" required className="w-full px-4 py-2 border rounded-md focus:outline-none " />
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="block font-bold mb-2">Submission Instruction</label>
          <input type="text" name="contestSubmissionInstruction" placeholder="Type submission instruction" required className="w-full px-4 py-2 border rounded-md focus:outline-none " />
        </div>

        <div className="flex gap-6 flex-col md:flex-row w-full mb-4">
          <div className="w-full flex flex-col">
            <label className="block font-bold mb-2">Contest Type</label>
            <select name="contestType" className="select min-h-10 h-10 w-full border select-bordered" defaultValue={"default"}>
              <option disabled value="default">
                Select Contest Type
              </option>
              <option value="imageDesignContests">Image Design Contests</option>
              <option value="articleWriting">Article Writing</option>
              <option value="gamingReview">Gaming Review</option>
              <option value="bookReview">Book Review</option>
              <option value="movieReview">Movie Review</option>
            </select>
          </div>

          <div className="w-full flex flex-col">
            <label className="block font-bold mb-2">Contest Deadline</label>
            <DatePicker className="w-full h-10 px-4 py-2 border rounded-md focus:outline-none" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-12 py-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
