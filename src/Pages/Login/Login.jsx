import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-11/12 md:w-1/2 mx-auto h-screen flex items-center justify-center py-10">
      <div className="flex-1 grid md:grid-cols-2 gap-10 bg-gray-100">
        <div className=" hidden md:block px-12">
          <div className="flex justify-center items-center  h-full">
            <img
              src="https://t3.ftcdn.net/jpg/02/80/01/64/360_F_280016453_VkNxKbvtljZxNWa3Y4A41BB6gEp1DIjY.jpg"
              alt=""
              className="lg:w-4/5"
            />
          </div>
        </div>
        <div className="flex-1 border-l-2 border-gray-200  py-8 px-12 h-fit">
          <h3 className="text-3xl font-bold text-[#199DFF] text-center mb-6">Login</h3>
          <div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Type Email"
                  name="email"
                  className="w-full border rounded-md border-black px-2 py-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Type Password"
                  name="password"
                  className="w-full border rounded-md border-black px-2 py-2"
                  required
                />
              </div>
              <div className="pt-4">
                <input
                  type="submit"
                  value="Login"
                  className="w-full border rounded-md bg-gradient-to-l from-[#3263FF] to-[#57b6ff] hover:bg-gradient-to-r text-lg hover:border hover:border-[#3263FF] text-white font-semibold px-2 py-2"
                />
              </div>
            </form>
          </div>
          <div className="space-y-4 mt-4 text-center">
            <p>Or login with</p>
            <div className="flex justify-center items-center gap-6 text-5xl hover:cursor-pointer">
              <FcGoogle></FcGoogle>
              <button>
                <img
                  src="./fb.png"
                  alt=""
                  className="w-11"
                />
              </button>
            </div>
            <p>
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="hover:text-[#FF3811]">
                Create Account.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
