import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { CgProfile } from "react-icons/cg";
import { Link, useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ContestDetail = () => {
  const {id} = useParams();
  const contests = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [contestOver, setContestOver] = useState(false);

  const contestsInfo = contests.find((item) => item._id == id);
  const {_id, contestName, contestImageUrl, contestDescription, contestPrice, contestPriceMoney, contestDeadline, contestCreatorEmail, contestCreatorName, contestParticipants} = contestsInfo;

  const [winContests, setWinContests] = useState([]);
  const [selectContest, setSelectContest] = useState(null);

  useEffect(() => {
    axiosSecure.get("/winners").then((res) => {
      setWinContests(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    const selectedContest = winContests.find((item) => item.participantContestId == _id);
    setSelectContest(selectedContest);
  }, [winContests, _id]);

  return (
    <div className="shadow-lg mb-1">
      <div className="w-10/12 lg:w-3/4 mx-auto py-10">
        <h3 className="text-3xl font-bold mb-2 text-[#3672B7] text-center">{contestName}</h3>
        <div className="flex items-center justify-center text-center mb-8 text-lg md:text-2xl font-medium">
          <Countdown
            date={contestDeadline}
            renderer={({days, hours, minutes, seconds, completed}) => {
              if (completed) {
                setContestOver(true);
                return <span className="text-red-600"> Contest time is over.</span>;
              } else {
                return (
                  <span className="text-green-600">
                    {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                  </span>
                );
              }
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className=" flex flex-col justify-center items-center">
            <div
              className="hero h-60 w-60 md:h-80 md:w-80 rounded-[100%] bg-cover shadow-xl  mb-6"
              style={{
                backgroundImage: `url(${contestImageUrl})`,
              }}
            >
              <div className="hero-overlay bg-opacity-40 h-60 w-60 md:h-80 md:w-80 rounded-[100%]"></div>
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <p className="text-justify">
                <span className="font-bold">Description: </span>
                {contestDescription}
              </p>
              <p className="text-justify">
                <span className="font-bold ">Contest Entry: </span>
                {contestPrice} BDT
              </p>
              <p className="text-justify">
                <span className="font-bold">Winning Prize: </span>
                {contestPriceMoney} BDT
              </p>
              <p className="text-justify">
                <span className="font-bold">Participants: </span>
                {contestParticipants}
              </p>

              <p className="pb-6">
                <span className="font-bold text-lg text-[#3672B7]">Created By:</span>
                <ul className="ml-10">
                  <li className="list-disc font-semibold">
                    Name: <span className="font-normal">{contestCreatorName}</span>
                  </li>
                  <li className="list-disc font-semibold">
                    Email: <span className="font-normal">{contestCreatorEmail}</span>
                  </li>
                </ul>
              </p>
              <div className="my-4">
                {contestOver ? (
                  <button className="btn px-6 py-3 rounded-lg font-bold btn-disabled">Cannot Register</button>
                ) : (
                  <Link to={`/payment/${_id}`}>
                    <button className="bg-[#3672B7] hover:bg-[#0b5ebd] px-6 py-3 rounded-lg font-bold text-white">Contest Registration</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-6 pb-10">
        <h3 className="text-2xl font-bold mb-2 text-[#3672B7] text-center">Winner Info</h3>
        {contestOver ? (
          selectContest ? (
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center my-4">{selectContest.participantPhotoUrl ? <img src={selectContest.participantPhotoUrl} alt="User Photo" className="w-40 h-40 rounded-full" /> : <CgProfile className="w-32 h-32 rounded-full" />}</div>
              <div className="flex flex-col items-center">
                {selectContest.participantName ? (
                  <p>
                    <span className="font-bold ">Name:</span> {selectContest.participantName}
                  </p>
                ) : (
                  <p className="text-2xl font-semibold">Name not available</p>
                )}
                <p>
                  <span className="font-bold ">Email: </span>
                  {selectContest.participantEmail}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-red-600">No winner has been selected yet.</p>
          )
        ) : (
          <p className="text-green-600">Winner will be selected after ending of the contest</p>
        )}
      </div>
    </div>
  );
};

export default ContestDetail;
