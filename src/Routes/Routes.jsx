import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import ManageContest from "../Pages/Dashboard/AdminDashboard/ManageContest";
import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser";
import MyParticipatedContest from "../Pages/Dashboard/UserDashboard/MyParticipatedContest";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";
import MyWinningContest from "../Pages/Dashboard/UserDashboard/MyWinningContest";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "myParticipatedContest",
        element: <MyParticipatedContest></MyParticipatedContest>,
      },
      {
        path: "myWinningContest",
        element: <MyWinningContest></MyWinningContest>,
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "manageUser",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "manageContest",
        element: <ManageContest></ManageContest>,
      },
    ],
  },
]);
