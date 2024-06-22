import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Advertise = () => {
  const [winContests, setWinContests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/winners").then((res) => {
      setWinContests(res.data);
    });
  }, [axiosSecure]);

  const {data: contests = []} = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  const {data: payments = []} = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  return (
    <div className="w-11/12 lg:w-4/5 mx-auto my-10 space-y-8">
      <div className="text-center space-y-2 flex flex-col items-center py-8">
        <h3 className="text-3xl font-bold text-[#3672B7]">Contest Winners</h3>
        <p className=" max-w-screen-lg">Celebrating the creativity and talent of our participants. Join the contest, showcase your skills, and stand a chance to be our next champion!</p>
      </div>

      <div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={2000} // Adjusted autoplay speed
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {winContests.map((contest) => (
            <div key={contest._id}>
              <div className="p-4 flex flex-col items-center justify-center gap-1">
                <img src={contest.participantPhotoUrl} alt="Participant photo" className="w-40 h-40 mb-2 border-4 border-blue-600  rounded-[100%]" />
                <h3 className="text-lg font-bold">{contest.participantContestName}</h3>
                <p className="text-sm">Name: {contest.participantName}</p>
                <p className="text-sm">Email: {contest.participantEmail}</p>
                <p className="text-sm">Winning Prize: {contest.participantPrize} BDT</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="text-center space-y-2 flex flex-col items-center py-2">
        <h3 className="text-xl font-semibold text-[#3672B7] text-center mt-6 mb-2">Join Our Next Contest!</h3>
        <p className=" max-w-screen-lg">Be a part of our exciting contests and showcase your talent. Donot miss out on the chance to win amazing prizes and gain recognition.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h4 className="text-3xl font-bold text-blue-600 mb-2">{contests.length}+</h4>
            <p className="text-gray-600 text-lg">Total Contests</p>
          </div>
        </div>
        <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h4 className="text-3xl font-bold text-green-600 mb-2">{payments.length}+</h4>
            <p className="text-gray-600 text-lg">Participants</p>
          </div>
        </div>
        <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h4 className="text-3xl font-bold text-red-600 mb-2">{winContests.length}+</h4>
            <p className="text-gray-600 text-lg">Total Winners</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
