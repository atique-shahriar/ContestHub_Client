import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import UpdateModal from "./UpdateModal";

const MyProfile = () => {
  const {user} = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/payments").then((res) => {
      setPayments(res.data);
    });
  }, [axiosSecure]);

  const participantContest = payments.filter((item) => item.email == user.email);

  const [winContests, setWinContests] = useState([]);
  useEffect(() => {
    axiosSecure.get("/winners").then((res) => {
      setWinContests(res.data);
    });
  }, [axiosSecure]);

  const myWinContest = winContests.filter((item) => item.participantEmail == user.email);

  const numberOfWinning = myWinContest.length;
  const numberOfParticipantContest = participantContest.length;

  const {data: allUsers = [], refetch} = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  useEffect(() => {
    const profile = allUsers.find((item) => item.email == user.email);
    setMyProfile(profile);
  }, [allUsers, user]);

  if (!myProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleUpdateProfile = () => {
    document.getElementById("updateProfile").showModal();
  };

  return (
    <div>
      <h3 className="text-center text-2xl">Profile</h3>
      <dialog id="updateProfile" className="modal">
        <UpdateModal myProfile={myProfile}></UpdateModal>
      </dialog>
      <div className="flex justify-center mx-auto flex-col w-56">
        <h3>Profile Progress:</h3>
        <ProgressBar completed={(numberOfWinning / numberOfParticipantContest) * 100} maxCompleted={100}></ProgressBar>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center h-[400px]">
          {myProfile.photoUrl ? <img src={myProfile.photoURL} alt="User Photo" className="w-40 h-40 rounded-full" /> : <CgProfile className="w-32 h-32 rounded-full mr-4"></CgProfile>}
          <div className="flex justify-center gap-4 my-2">
            <span className="px-2 font-medium bg-[#ceeaff] rounded-lg text-sm text-gray-600">Winning Contest: {numberOfWinning}</span>
            <span className="px-2 font-medium bg-[#ceeaff] rounded-lg text-sm text-gray-600">Participate Contest: {numberOfParticipantContest}</span>
          </div>
          <div className="flex flex-col items-center">
            {myProfile.name ? (
              <p className="text-2xl font-semibold ">{myProfile.name}</p>
            ) : (
              <div>
                <p className="text-2xl font-semibold">Name not available</p>
              </div>
            )}
            <p className="text-gray-600">{myProfile.email}</p>
            {myProfile.address ? (
              <p className="font-semibold ">Address: {myProfile.address}</p>
            ) : (
              <div>
                <p className="font-semibold">Address not available</p>
              </div>
            )}
          </div>

          <button className="py-2 px-8 mt-4 rounded-xl font-bold text-white bg-[#3672B7]" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
