import { useContext, useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const mail = user?.email;
  const menuRef = useRef();

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, [axiosSecure]);

  const currentUser = users.find((user) => user.email === mail);
  const role = currentUser?.role;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = (
    <>
      {role === "Admin" ? (
        <>
          <li>
            <NavLink to="manageUser">Manage User</NavLink>
          </li>
          <li>
            <NavLink to="manageContest">Manage Contest</NavLink>
          </li>
        </>
      ) : role === "Creator" ? (
        <>
          <li>
            <NavLink to="addContest">Add Contest</NavLink>
          </li>
          <li>
            <NavLink to="myCreatedContest">My Created Contest</NavLink>
          </li>
          <li>
            <NavLink to="contestSubmittedPage">Contest Submitted Page</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="myParticipatedContest">My Participated Contest</NavLink>
          </li>
          <li>
            <NavLink to="myWinningContest">My Winning Contest</NavLink>
          </li>
          <li>
            <NavLink to="myProfile">My Profile</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="flex">
      <div ref={menuRef} className={`fixed md:static top-0 left-0 h-full text-white bg-[#3672B7] min-h-screen transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out z-10`}>
        <ul className="menu p-4">{menuItems}</ul>
        <div className="divider"></div>
        <ul className="menu p-4">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 mx-4 md:mx-8">
        <div className="md:hidden p-4">
          <button onClick={toggleMenu} className="text-3xl">
            <IoMdMenu />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
