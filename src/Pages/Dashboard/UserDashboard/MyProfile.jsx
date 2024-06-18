import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyProfile = () => {
  const {user} = useContext(AuthContext);

  const [allContests, setAllContests] = useState([]);
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/contests").then((res) => {
      setAllContests(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get("/payments").then((res) => {
      setPayments(res.data);
    });
  }, [axiosSecure]);

  const userPayment = payments.filter((item) => item.email == user.email);
  console.log(userPayment);

  const userContests = allContests.filter((item) => Array.isArray(item.contestRegistered) && item.contestRegistered.includes(user.email));

  return <div>{userPayment.length}</div>;
};

export default MyProfile;
