import { GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const {signInUser, signInGoogle} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        Swal.fire("Successfully login");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Wrong email or password");
      });
  };

  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInGoogle(googleProvider)
      .then((result) => {
        Swal.fire("Successfully login");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
          window.location.reload();
        }, 1000);
        const name = result.user.displayName;
        const email = result.user.email;
        const photoUrl = result.user.photoURL;
        const user = {name, email, photoUrl};
        axiosPublic.post("/users", user).then((res) => {
          console.log(res.data);
        });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Login failed");
      });
  };

  return (
    <div className="w-11/12 md:w-3/5 mx-auto h-screen flex items-center justify-center py-10">
      <div className="flex-1 grid md:grid-cols-2 bg-gray-100">
        <div className="hidden md:block">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="hidden md:block">
              <img className="w-16 md:w-28" src="https://static.vecteezy.com/system/resources/thumbnails/014/569/377/small/golden-trophy-for-the-winners-of-the-sport-achievement-award-concept-png.png" alt="" />
            </div>
            <div>
              <p className="font-bold text-3xl md:text-5xl text-[#3672B7]">Contest Hub</p>
            </div>
          </div>
        </div>
        <div className="flex-1 border-l-2 border-gray-200  py-8 px-12 h-fit">
          <h3 className="text-3xl font-bold text-[#3672B7] text-center mb-6">Login</h3>
          <div>
            <form className="space-y-2" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label>Email</label>
                <input type="email" placeholder="Type Email" name="email" className="w-full border rounded-md border-black px-2 py-2" required />
              </div>
              <div className="space-y-2">
                <label>Password</label>
                <input type="password" placeholder="Type Password" name="password" className="w-full border rounded-md border-black px-2 py-2" required />
              </div>
              <div className="pt-4">
                <input type="submit" value="Login" className="w-full border rounded-md bg-[#3672B7]  text-lg hover:border hover:border-[#3263FF] text-white font-semibold px-2 py-2" />
              </div>
            </form>
          </div>
          <div className="space-y-4 mt-4 text-center">
            <p>Or login with</p>
            <div className="flex justify-center items-center gap-6 text-5xl hover:cursor-pointer" onClick={handleGoogleSignIn}>
              <FcGoogle></FcGoogle>
            </div>
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="hover:text-[#FF3811]">
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
