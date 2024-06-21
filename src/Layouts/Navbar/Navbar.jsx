import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const {user, signOutUser} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [myProfile, setMyProfile] = useState(null);

  const handleSignOut = () => {
    signOutUser();
    toast.success("Signout Successfully");
  };

  const {data: allUsers = []} = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  useEffect(() => {
    if (user && allUsers.length > 0) {
      const profile = allUsers.find((item) => item.email === user.email);
      setMyProfile(profile);
    }
  }, [allUsers, user]);

  if (user && !myProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  console.log(myProfile ? myProfile.role : "No profile found");

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          style={({isActive}) => {
            return isActive ? {background: "#3672B7", color: "white", fontWeight: "700"} : {};
          }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allContest/all"
          style={({isActive}) => {
            return isActive ? {background: "#3672B7", color: "white", fontWeight: "700"} : {};
          }}
        >
          All Contest
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gray-100">
      <div className="navbar w-11/12 lg:w-4/5 mx-auto p-4">
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="pr-2 text-black lg:hidden pt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content text-base mt-3 z-[10] p-2 shadow bg-base-100 w-52 rounded-md ">
              {navItems}
            </ul>
          </div>
          <div className="">
            <Link to="/" className="flex items-center">
              <div className="hidden md:block">
                <img className="w-10 md:w-16" src="https://static.vecteezy.com/system/resources/thumbnails/014/569/377/small/golden-trophy-for-the-winners-of-the-sport-achievement-award-concept-png.png" alt="" />
              </div>
              <div>
                <p className="font-bold text-xl md:text-2xl text-[#3672B7]">Contest Hub</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu gap-4 menu-horizontal px-1 text-base text-black">{navItems}</ul>
        </div>

        <div className="navbar-end ">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="rounded-[100%] w-12">{myProfile.photoUrl ? <img src={myProfile.photoUrl} alt="Photo" title={myProfile.name} /> : <img src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt="" />}</div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  w-40">
                  <li className="px-3 bg-gray-200 py-1 font-bold">{myProfile?.name}</li>
                  <li>
                    {myProfile.role == "Admin" ? (
                      <>
                        <NavLink to={"/dashboard/manageUser"}>Dashboard</NavLink>
                      </>
                    ) : myProfile.role == "Creator" ? (
                      <>
                        <NavLink to={"/dashboard/addContest"}>Dashboard</NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to={"/dashboard/myParticipatedContest"}>Dashboard</NavLink>
                      </>
                    )}
                  </li>
                  <li>
                    <a onClick={handleSignOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="tooltip" data-tip="Login">
                <Link className="hover:text-lg hover:font-bold flex items-center gap-2 bg-[#3672B7] text-white px-4 py-2 rounded-md" to="/login">
                  Login
                  <IoMdLogIn className="text-xl"></IoMdLogIn>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
