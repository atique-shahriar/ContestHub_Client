import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa";
import { Link } from "react-router-dom";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

SwiperCore.use([EffectCoverflow, Pagination]);

const ContestCreator = () => {
  const [contests, setContests] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/contests").then((res) => {
      setContests(res.data);
    });
  }, [axiosPublic]);

  let displayContests = contests.filter((item) => item.confirmation == true);

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      className="mySwiper"
    >
      {contests.map((contest) => (
        <SwiperSlide key={contest._id}>
          <div className="flex justify-center items-center gap-6 px-4 md:px-8 min-h-[200px]">
            <div className="w-[100px]">
              <img src={contest.contestImageUrl} alt="" className="rounded-[100%] border-white border-4" />
            </div>
            <div className="text-left space-y-1 w-[300px]">
              <h3 className="text-lg font-bold">{contest.contestName}</h3>
              <p className="text-xs">{contest.contestDescription}</p>
              <p className="text-xs">Participants: {contest.contestParticipants}</p>
              <p className="text-xs">Deadline: {new Date(contest.contestDeadline).toLocaleDateString()}</p>
              <hr className="my-2" />
              <p className="text-amber-400 flex justify-between items-center">
                <button className="tooltip bg-[#199DFF] text-white hover:text-black rounded-[100%] px-2 py-1" data-tip="Click to see contest details">
                  <Link to={`/contestdetails/${contest._id}`}>
                    <FaArrowRightLong />
                  </Link>
                </button>
              </p>
            </div>
            <div className="w-[100px]">{getCreatorData(contest.contestCreatorEmail) && <img src={getCreatorData(contest.contestCreatorEmail).photoUrl} alt="" className="rounded-[100%] border-white border-4" />}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ContestCreator;
