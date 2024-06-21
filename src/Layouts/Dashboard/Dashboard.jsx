import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const mail = user?.email;

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, [axiosSecure]);

  const currentUser = users.filter((user) => user.email == mail);
  console.log(currentUser);

  const role = currentUser[0]?.role;
  console.log(role);

  return (
    <div className="flex">
      <div className="w-64 bg-[#3672B7] min-h-screen">
        <ul className="menu">
          {role == "Admin" ? (
            <>
              <li>
                <NavLink to="manageUser">Manage User</NavLink>
              </li>
              <li>
                <NavLink to="manageContest">Manage Contest</NavLink>
              </li>
            </>
          ) : role == "Creator" ? (
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
        </ul>
        <div className="divider"></div>
        <ul className="menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
