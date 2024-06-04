import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = true;

  return (
    <div className="flex">
      <div className="w-64 bg-blue-500 min-h-screen">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="manageUser">Manage User</NavLink>
              </li>
              <li>
                <NavLink to="manageContest">Manage Contest</NavLink>
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
