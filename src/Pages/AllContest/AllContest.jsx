import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TypeContest from "./TypeContest";

const AllContest = () => {
  const [contests, setContests] = useState([]);
  const axiosPublic = useAxiosPublic();

  const {type} = useParams();
  const allTypes = ["all", "movieReview", "gamingReview", "bookReview", "articleWriting", "imageDesignContests"];

  useEffect(() => {
    axiosPublic.get("/contests").then((res) => {
      setContests(res.data);
    });
  }, [axiosPublic]);

  let displayContests = contests.filter((item) => item.confirmation == true);

  const all = displayContests;

  const movieReview = displayContests.filter((item) => item.contestType === "Movie Review");
  const gamingReview = displayContests.filter((item) => item.contestType === "Gaming Review");
  const bookReview = displayContests.filter((item) => item.contestType === "Book Review");
  const articleWriting = displayContests.filter((item) => item.contestType === "Article Writing");
  const imageDesignContests = displayContests.filter((item) => item.contestType === "Image Design Contests");

  const initialIndex = allTypes.indexOf(type);
  const [tabIndex, setTabIndex] = useState(initialIndex);

  return (
    <div>
      <Tabs
        defaultIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        className="lg:max-w-7xl mx-auto px-10">
        <TabList>
          <Tab>All Contest</Tab>
          <Tab>Movie Review</Tab>
          <Tab>Gaming Review</Tab>
          <Tab>Book Review</Tab>
          <Tab>Article Writing</Tab>
          <Tab>Image Design Contests</Tab>
        </TabList>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {all.map((item) => (
              <TypeContest
                key={item._id}
                contestType={item}></TypeContest>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movieReview.map((item) => (
              <TypeContest
                key={item._id}
                contestType={item}></TypeContest>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamingReview.map((item) => (
              <TypeContest
                key={item._id}
                contestType={item}></TypeContest>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookReview.map((item) => (
              <TypeContest
                key={item._id}
                contestType={item}></TypeContest>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articleWriting.map((item) => (
              <TypeContest
                key={item._id}
                contestType={item}></TypeContest>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageDesignContests.map((item) => (
              <TypeContest
                key={item._id}
                contestType={item}></TypeContest>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AllContest;
