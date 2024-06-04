import { useContext } from "react";
import { IoMdLogIn } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const {user, signOutUser} = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser();
    toast.success("Signout Successfully");
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          style={({isActive}) => {
            return isActive ? {background: "#3672B7", color: "white", fontWeight: "700"} : {};
          }}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allContest"
          style={({isActive}) => {
            return isActive ? {background: "#3672B7", color: "white", fontWeight: "700"} : {};
          }}>
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
            <div
              tabIndex={0}
              role="button"
              className="pr-2 text-white lg:hidden pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-base mt-3 z-[10] p-2 shadow bg-base-100 w-52 rounded-md ">
              {navItems}
            </ul>
          </div>
          <div className="">
            <Link
              to="/"
              className="flex items-center">
              <div>
                <img
                  className="w-16"
                  src="https://static.vecteezy.com/system/resources/thumbnails/014/569/377/small/golden-trophy-for-the-winners-of-the-sport-achievement-award-concept-png.png"
                  alt=""
                />
              </div>
              <div>
                <p className="font-bold text-xl ml-2 text-blue-600">
                  Contest<span className="block text-blue-600"> Hub</span>
                </p>
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
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar">
                  <div className="rounded-[100%] w-12">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Photo"
                        title={user.displayName}
                      />
                    ) : (
                      <img
                        src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  w-40">
                  <li>{user?.displayName}</li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <a onClick={handleSignOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div
                className="tooltip"
                data-tip="Login">
                <Link
                  className="text-xl flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                  to="/login">
                  Login
                  <IoMdLogIn className="text-3xl text-[]"></IoMdLogIn>
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
