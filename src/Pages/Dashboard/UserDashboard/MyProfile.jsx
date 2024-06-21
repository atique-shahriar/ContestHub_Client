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

  const {data: allUsers = []} = useQuery({
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
      <h3 className="text-3xl font-bold text-[#3672B7] text-center mt-6 mb-4">Profile</h3>
      <dialog id="updateProfile" className="modal">
        <UpdateModal myProfile={myProfile}></UpdateModal>
      </dialog>

      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-4">
            {myProfile.name ? (
              <p className=" font-semibold ">Name: {myProfile.name}</p>
            ) : (
              <div>
                <p className="font-semibold text-red-600">Name not available</p>
              </div>
            )}
            <p className="text-gray-600">{myProfile.email}</p>
            {myProfile.address ? (
              <p className="">Address: {myProfile.address}</p>
            ) : (
              <div>
                <p className="">Address not available</p>
              </div>
            )}
          </div>
          {myProfile.photoUrl ? <img src={myProfile.photoUrl} alt="User Photo" className="w-40 h-40 mb-4 rounded-full" /> : <CgProfile className="w-32 h-32 mb-4 rounded-full"></CgProfile>}
          <div className="flex justify-center mx-auto flex-col w-56 mb-4">
            <h3>Profile Progress:</h3>
            <ProgressBar completed={(numberOfWinning / numberOfParticipantContest) * 100} maxCompleted={100}></ProgressBar>
          </div>
          <div className="flex justify-center gap-4 my-2">
            <span className="px-2 font-medium bg-[#ceeaff] rounded-lg text-sm text-gray-600">Winning Contest: {numberOfWinning}</span>
            <span className="px-2 font-medium bg-[#ceeaff] rounded-lg text-sm text-gray-600">Participate Contest: {numberOfParticipantContest}</span>
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
