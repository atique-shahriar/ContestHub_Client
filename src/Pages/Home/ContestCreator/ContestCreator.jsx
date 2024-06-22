import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import "../ContestCreator/Creator.css";

const ContestCreator = () => {
  const [contests, setContests] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/contests").then((res) => {
      setContests(res.data);
    });
  }, [axiosPublic]);

  // Filter confirmed contests and remove duplicates by contestCreatorEmail
  const displayContests = contests
    .filter((item) => item.confirmation == true)
    .reduce((acc, contest) => {
      if (!acc.find((item) => item.contestCreatorEmail === contest.contestCreatorEmail)) {
        acc.push(contest);
      }
      return acc;
    }, []);

  return (
    <div className="my-16 w-11/12 lg:w-4/5 mx-auto space-y-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <h3 className="text-3xl font-bold text-[#3672B7]">Top Contest Creators</h3>
        <p className="max-w-screen-lg">Celebrating the Outstanding Talent and Dedication of Creators Who Design Engaging and Innovative Contests, Inspiring Participation and Fostering Creativity Across Various Fields</p>
      </div>
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
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {displayContests.map((contest) => (
          <SwiperSlide key={contest._id}>
            <div className="flex justify-center items-center gap-6 px-4 md:px-8 min-h-[200px]">
              <div className="w-[100px]">
                <img src={contest.contestCreatorPhoto} alt="" className="rounded-[100%] border-white border-4" />
              </div>
              <div className="text-left space-y-1 w-[300px]">
                <h3 className="text-ll font-bold">{contest.contestCreatorName}</h3>
                <p className="text-xs">Contest: {contest.contestName}</p>
                <hr />
                <p>Participants: {contest.contestParticipants}</p>
                <p>Entry Fee: {contest.contestPrice} BDT</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContestCreator;
