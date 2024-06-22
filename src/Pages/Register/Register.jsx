import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
  const {createUser, updateCreateUser} = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const handleRegisterInfo = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z])/;
    if (!passCheck.test(password)) {
      toast.error("Password should be at least one upper and lower case");
      return;
    }

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateCreateUser(name, photoUrl)
          .then(() => {})
          .catch((error) => {
            console.log(error.message);
          });

        //   e.target.reset();
        const userInfo = {name, email, photoUrl};
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });

        Swal.fire("Register Successfully");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        toast.error("Error Occured");
        console.log(error.message);
      });
  };

  return (
    <div className="w-11/12 md:w-3/5 mx-auto h-screen flex items-center justify-center py-10 ">
      <div className="flex-1 grid md:grid-cols-2 bg-gray-100">
        <div className=" hidden md:block">
          <div className="flex flex-col justify-center items-center  h-full">
            <div className="hidden md:block">
              <img className="w-16 md:w-28" src="https://static.vecteezy.com/system/resources/thumbnails/014/569/377/small/golden-trophy-for-the-winners-of-the-sport-achievement-award-concept-png.png" alt="" />
            </div>
            <div>
              <p className="font-bold text-3xl md:text-5xl text-[#3672B7]">Contest Hub</p>
            </div>
          </div>
        </div>
        <div className="flex-1 border-l-2 border-gray-200  py-8 px-12 h-fit">
          <h3 className="text-3xl font-bold text-[#199DFF] text-center mb-6">Register</h3>
          <div>
            <form className="space-y-2" onSubmit={handleRegisterInfo}>
              <div className="space-y-2">
                <label>Name</label>
                <input type="text" placeholder="Type Name" name="name" className="w-full border rounded-md border-black px-2 py-2" required />
              </div>
              <div className="space-y-2">
                <label>Email</label>
                <input type="email" placeholder="Type Email" name="email" className="w-full border rounded-md border-black px-2 py-2" required />
              </div>
              <div className="space-y-2">
                <label>Photo Url</label>
                <input type="text" placeholder="Type Photo Url" name="photoUrl" className="w-full border rounded-md border-black px-2 py-2" required />
              </div>

              <div className="space-y-2">
                <label>Password</label>
                <input type="password" placeholder="Type Password" name="password" className="w-full border rounded-md border-black px-2 py-2" required />
              </div>
              <div className="pt-4">
                <input type="submit" value="Register" className="w-full border rounded-md bg-[#3672B7]  text-lg hover:border hover:border-[#3263FF] text-white font-semibold px-2 py-2" />
              </div>
            </form>
          </div>
          <div className="space-y-4 mt-4 text-center">
            Have&apos;t any account?{" "}
            <Link to="/login" className="hover:text-[#FF3811]">
              Login account.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
