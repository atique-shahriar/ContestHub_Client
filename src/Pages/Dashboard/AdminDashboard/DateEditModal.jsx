import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DateEditModal = ({contest}) => {
  const [date, setStartDate] = useState(contest?.contestDeadline);

  const axiosSecure = useAxiosSecure();

  const handleDateSubmit = (e) => {
    e.preventDefault();

    axiosSecure
      .put(`contestsDate/${contest._id}`, {date})
      .then((res) => {
        console.log(res.data);
        toast.success("Updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to update");
        console.error("There was an error updating the date!", error);
      });

    axiosSecure
      .put(`paymentDateUpdate/${contest._id}`, {date})
      .then((res) => {
        console.log(res.data);
        toast.success("Updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to update");
        console.error("There was an error updating the date!", error);
      });
  };

  return (
    <div className="modal-box">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 min-h-96" onSubmit={handleDateSubmit}>
        <div className="flex items-center justify-center mb-4">
          <h4 className="text-2xl font-bold">Select Your Date</h4>
        </div>
        <div className="flex items-center justify-center">
          <DatePicker className="w-full h-10 px-4 py-2 border rounded-md focus:outline-none" selected={date} onChange={(date) => setStartDate(date)} />
        </div>

        <div className="w-full flex justify-center">
          <input className="px-6 text-white hover:text-[#199DFF] bg-[#199DFF] py-2 mt-4 border-[#199DFF] border-2 font-medium rounded-lg hover:border-[#199DFF] hover:bg-white hover:bg-opacity-10" type="submit" value="Update" />
        </div>
      </form>
      <form method="dialog">
        <button className="btn btn-sm bg-gray-300 hover:bg-[#3672B7] text-white hover:text-black btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  );
};

DateEditModal.propTypes = {
  contest: PropTypes.object.isRequired,
};

export default DateEditModal;
