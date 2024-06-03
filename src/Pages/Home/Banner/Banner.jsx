import img1 from "/Banner/contest1.png";
import img2 from "/Banner/contest2.png";
import img3 from "/Banner/contest3.png";

const Banner = () => {
  return (
    <div className="mx-auto py-4">
      <div className="carousel w-full">
        <div
          id="slide1"
          className="carousel-item relative w-full">
          <img
            src={img1}
            className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
          />
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-60"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Lorem ipsum dolor sit amet.</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea atque commodi at corporis voluptatibus minima sint aut? Rem, saepe.</p>
            <div className="flex h-12">
              <input
                type="text"
                className="w-full px-4 py-2 text-black"
                placeholder="Search for contests..."
              />
              <button className="px-8 bg-blue-500 py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">Search</button>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-x-1/2 bottom-3 left-1/2 gap-4">
            {/* absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 */}
            <a
              href="#slide3"
              className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide2"
          className="carousel-item relative w-full">
          <img
            src={img2}
            className="w-full  h-[400px] md:h-[500px] lg:h-[600px]"
          />
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-60"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Lorem ipsum dolor sit amet.</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea atque commodi at corporis voluptatibus minima sint aut? Rem, saepe.</p>
            <div className="flex h-12">
              <input
                type="text"
                className="w-full px-4 py-2 text-black"
                placeholder="Search for contests..."
              />
              <button className="px-8 bg-blue-500 py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">Search</button>
            </div>
          </div>{" "}
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-60"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Lorem ipsum dolor sit amet.</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea atque commodi at corporis voluptatibus minima sint aut? Rem, saepe.</p>
            <div className="flex h-12">
              <input
                type="text"
                className="w-full px-4 py-2 text-black"
                placeholder="Search for contests..."
              />
              <button className="px-8 bg-blue-500 py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">Search</button>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-x-1/2 bottom-3 left-1/2 gap-4">
            <a
              href="#slide1"
              className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide3"
          className="carousel-item relative w-full">
          <img
            src={img3}
            className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
          />
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-60"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Lorem ipsum dolor sit amet.</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea atque commodi at corporis voluptatibus minima sint aut? Rem, saepe.</p>
            <div className="flex h-12">
              <input
                type="text"
                className="w-full px-4 py-2 text-black"
                placeholder="Search for contests..."
              />
              <button className="px-8 bg-blue-500 py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">Search</button>
            </div>
          </div>{" "}
          <div className="h-[400px] md:h-[500px] lg:h-[600px] bg-black w-full absolute bg-opacity-60"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white space-y-3 lg:space-y-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl px-10 text-center">Lorem ipsum dolor sit amet.</h1>
            <p className="text-center md:text-lg px-10 md:px-20 lg:px-28">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea atque commodi at corporis voluptatibus minima sint aut? Rem, saepe.</p>
            <div className="flex h-12">
              <input
                type="text"
                className="w-full px-4 py-2 text-black"
                placeholder="Search for contests..."
              />
              <button className="px-8 bg-blue-500 py-2 border-blue-500 border-2 font-medium hover:border-white hover:bg-white hover:bg-opacity-10">Search</button>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-x-1/2 bottom-3 left-1/2 gap-4">
            <a
              href="#slide2"
              className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❮
            </a>
            <a
              href="#slide1"
              className="btn btn-circle border-none text-white bg-slate-800 bg-opacity-60 hover:text-black">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
