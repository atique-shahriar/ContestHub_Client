import Advertise from "../Advertise/Advertise";
import Banner from "../Banner/Banner";
import ContestCreator from "../ContestCreator/ContestCreator";
import PopularContest from "../PopularContest/PopularContest";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContest></PopularContest>
      <Advertise></Advertise>
      <ContestCreator></ContestCreator>
    </div>
  );
};

export default Home;
