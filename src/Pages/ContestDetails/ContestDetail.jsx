import { useState } from "react";
import Countdown from "react-countdown";
import { Link, useLoaderData, useParams } from "react-router-dom";

const ContestDetail = () => {
  const {id} = useParams();
  const contests = useLoaderData();

  let contestsInfo = contests.find((item) => item._id == id);
  const {_id, contestName, contestImageUrl, contestDescription, contestPrice, contestPriceMoney, contestSubmissionInstruction, contestType, contestDeadline, contestCreatorEmail, contestCreatorName, contestParticipants, confirmation} = contestsInfo;

  const [contestOver, setContestOver] = useState(false);

  return (
    <div className="shadow-lg mb-1">
      <div className="w-10/12 lg:w-3/4 mx-auto py-10">
        <div className="grid grid-cols-1">
          <div className=" flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold mb-4 text-[#3672B7]">{contestName}</h3>
            <div
              className="hero h-[280px] md:h-[400px] lg:h-[550px] xl:h-[600px] bg-cover shadow-xl rounded-lg mb-6"
              style={{
                backgroundImage: `url(${contestImageUrl})`,
              }}
            >
              <div className="hero-overlay bg-opacity-40 rounded-lg"></div>
            </div>
          </div>
          <div className="flex justify-center gap-4 my-2">
            <span className="px-2 font-medium bg-[#ceeaff] rounded-lg text-sm text-gray-600">Total Participants: {contestParticipants}</span>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-lg">{contestDescription}</p>
            <p className="text-justify pb-3">
              <span className="font-bold text-lg text-[#3672B7]">Price: </span>
              {contestPrice}
            </p>
            <p>
              Availability:
              <Countdown
                date={contestDeadline}
                renderer={({days, hours, minutes, seconds, completed}) => {
                  if (completed) {
                    return <span> Not Availabe {setContestOver(true)}</span>;
                  } else {
                    return (
                      <span>
                        {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                      </span>
                    );
                  }
                }}
              />
            </p>

            <p className="pb-6">
              <span className="font-bold text-lg text-[#3672B7]">Created By:</span>
              <ul className="ml-10">
                <li className="list-disc font-semibold">Name: {contestCreatorName}</li>
                <li className="list-disc font-semibold">Email: {contestCreatorEmail}</li>
              </ul>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-12 mb-10">
          {contestOver == true ? (
            <>
              <button className="btn w-56 py-3 rounded-xl font-bold btn-disabled">Cannot Registration</button>
            </>
          ) : (
            <>
              {" "}
              <Link to={`/payment/${_id}`}>
                <button className="bg-[#6ab8fa] hover:bg-[#3672B7] w-56 py-3 rounded-xl font-bold text-white ">Contest Registration</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestDetail;
