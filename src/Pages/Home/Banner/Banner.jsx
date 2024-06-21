import { useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [search, setSearch] = useState("all");

  const contestTypes = ["Image Design Contests", "Article Writing", "Gaming Review", "Book Review", "Movie Review"];

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    const uppValue = value.charAt(0).toLowerCase() + value.slice(1);
    setSearch(uppValue);
    console.log(uppValue);
  };

  return (
    <div className="mx-auto">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="https://images.ctfassets.net/hrltx12pl8hq/78GOHusrtmGVPzjWWqlII4/b5a14a498b053a55e5e0d49c9cd92a74/artists-images.jpg?fit=fill&w=1200&h=630" className="w-full h-[400px] md:h-[500px] lg:h-[600px]" />
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-75"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Showcase Your Design Talent</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Participate in our exciting image design contests and put your creativity to the test. Win amazing prizes and gain recognition for your artistic skills!</p>

            <div className="flex">
              <div className="relative w-40 md:w-60 lg:w-72">
                <input type="text" placeholder="Search contest..." onChange={handleInputChange} className="input w-full px-4 rounded-none text-black py-2 font-medium" list="contestTypes" />
                <datalist id="contestTypes">
                  {contestTypes.map((type, index) => (
                    <option key={index} value={type} />
                  ))}
                </datalist>
              </div>
              <Link to={`/allContest/${search}`} type="submit" className="px-8 bg-[#3672B7] py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">
                Search
              </Link>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-x-1/2 bottom-3 left-1/2 gap-4">
            {/* absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 */}
            <a href="#slide3" className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://writeitsideways.com/wp-content/uploads/2016/01/the-pros-and-cons-of-entering-writing-contests.jpg" className="w-full  h-[400px] md:h-[500px] lg:h-[600px]" />
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-75"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Unleash Your Writing Potential</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Join our article writing contests and share your thoughts and ideas with a wider audience. Enhance your writing skills and compete for fantastic rewards.</p>
            <div className="flex">
              <div className="relative w-40 md:w-60 lg:w-72">
                <input type="text" placeholder="Search contest..." onChange={handleInputChange} className="input w-full px-4 rounded-none text-black py-2 font-medium" list="contestTypes" />
                <datalist id="contestTypes">
                  {contestTypes.map((type, index) => (
                    <option key={index} value={type} />
                  ))}
                </datalist>
              </div>
              <Link to={`/allContest/${search}`} type="submit" className="px-8 bg-[#3672B7] py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">
                Search
              </Link>
            </div>
          </div>{" "}
          <div className="absolute flex justify-between transform -translate-x-1/2 bottom-3 left-1/2 gap-4">
            <a href="#slide1" className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❯
            </a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://www.telecoming.com/wp-content/uploads/2023/10/Post-auge-eSports.jpg" className="w-full h-[400px] md:h-[500px] lg:h-[600px]" />
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-75"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Review and Conquer Games</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Enter our gaming review contests to critique and evaluate the latest games. Share your gaming expertise and win great prizes while having fun!</p>
            <div className="flex">
              <div className="relative w-40 md:w-60 lg:w-72">
                <input type="text" placeholder="Search contest..." onChange={handleInputChange} className="input w-full px-4 rounded-none text-black py-2 font-medium" list="contestTypes" />
                <datalist id="contestTypes">
                  {contestTypes.map((type, index) => (
                    <option key={index} value={type} />
                  ))}
                </datalist>
              </div>
              <Link to={`/allContest/${search}`} type="submit" className="px-8 bg-[#3672B7] py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">
                Search
              </Link>
            </div>
          </div>{" "}
          <div className="absolute flex justify-between transform -translate-x-1/2 bottom-3 left-1/2 gap-4">
            <a href="#slide2" className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
