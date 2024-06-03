import { PropTypes } from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PopularContestCard = ({contest}) => {
  const {_id, name, image, participants, description} = contest;
  return (
    <div className="p-4 border border-[#e8f5ff] rounded-lg shadow-md shadow-orange-100">
      <div className="flex justify-center items-center">
        <img
          src={image}
          alt="Not Found"
          className="h-[150px] w-[150px] shadow-md rounded-[100%] p-3"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-center">{name}</h3>
      </div>
      <div className="flex justify-center gap-4 my-2">
        <span className="px-2 font-medium bg-[#ceeaff] rounded-lg text-sm text-gray-600">Total Participants: {participants}</span>
      </div>

      <div className="flex justify-center mt-2">
        <Link
          to={`/contests/${_id}`}
          className=" font-medium text-[#199DFF] border hover:border-2 border-[#199DFF] rounded-lg px-4 hover:font-bold flex items-center gap-2">
          <span>More Details</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

PopularContestCard.propTypes = {
  contest: PropTypes.object,
};

export default PopularContestCard;
