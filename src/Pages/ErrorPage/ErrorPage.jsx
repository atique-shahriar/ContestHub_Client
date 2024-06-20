import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-6 items-center justify-center ">
      <div className="flex flex-col md:flex-row md:justify-center gap-6 items-center bg-slate-200 py-8 px-8 rounded-lg">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/6897/6897039.png" alt="" className="w-48" />
        </div>
        <div className="space-y-3 flex flex-col items-center md:items-start">
          <h3 className="text-3xl lg:text-5xl font-semibold text-[#FFC048]">404 Error</h3>
          <h3 className="text-2xl lg:text-3xl font-medium">This page doesnot exist.</h3>
          <p className="text-base font-normal">Let&apos;s get you back.</p>
          <Link to={"/"}>
            <button className="bg-[#FFC048] rounded-lg text-white font-medium px-5 py-2 mt-3">Go to home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
