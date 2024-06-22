import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import About from "../Pages/About/About";
import AllContest from "../Pages/AllContest/AllContest";
import ContestDetail from "../Pages/ContestDetails/ContestDetail";
import ManageContest from "../Pages/Dashboard/AdminDashboard/ManageContest";
import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser";
import AddContest from "../Pages/Dashboard/CreatorDashboard/AddContest";
import ContestSubmittedPage from "../Pages/Dashboard/CreatorDashboard/ContestSubmittedPage";
import MyCreatedContest from "../Pages/Dashboard/CreatorDashboard/MyCreatedContest";
import TitleWiseContest from "../Pages/Dashboard/CreatorDashboard/TitleWiseContest";
import MyParticipatedContest from "../Pages/Dashboard/UserDashboard/MyParticipatedContest";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";
import MyWinningContest from "../Pages/Dashboard/UserDashboard/MyWinningContest";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Payment from "../Pages/Payment/Payment";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../Providers/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: "allContest/:type",
        element: <AllContest></AllContest>,
      },
      {
        path: "contactUs",
        element: <About></About>,
      },
      {
        path: "contestDetails/:id",
        element: (
          <PrivateRoute>
            <ContestDetail></ContestDetail>
          </PrivateRoute>
        ),
        loader: () => fetch("https://b9a12-server-side-atique-shahriar.vercel.app/contests"),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: () => fetch("https://b9a12-server-side-atique-shahriar.vercel.app/contests"),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "addContest",
        element: <AddContest></AddContest>,
      },
      {
        path: "myCreatedContest",
        element: <MyCreatedContest></MyCreatedContest>,
      },
      {
        path: "contestSubmittedPage",
        element: <ContestSubmittedPage></ContestSubmittedPage>,
      },
      {
        path: "contestSubmittedPage/titleWiseContest/:id",
        element: <TitleWiseContest></TitleWiseContest>,
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
