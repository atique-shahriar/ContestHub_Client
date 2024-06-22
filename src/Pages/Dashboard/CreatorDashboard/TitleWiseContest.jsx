import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TitleWiseContest = () => {
  const {id} = useParams();

  const [winner, setWinner] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {data: payments = [], refetch} = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const titleContest = payments.filter((item) => item.contestId == id);
  console.log(titleContest);

  useEffect(() => {
    const availWinner = payments.filter((item) => item.contestWinner === "Winner");
    if (availWinner.length > 0) {
      setWinner(true);
      console.log(availWinner);
    }
  }, [payments]);

  const handleSelectWinner = (contest) => {
    console.log(contest._id);
    axiosSecure
      .put(`paymentWinners/${contest._id}`)
      .then((res) => {
        refetch();
        console.log(res.data);
        toast.success("Winner successfully selected");
      })
      .catch((error) => {
        toast.error("Failed to update");
        console.error("There was an error updating the comment!", error);
      });

    const paymentId = contest._id;
    const participantContestId = contest.contestId;
    const participantContestName = contest.contestName;
    const participantName = contest.name;
    const participantEmail = contest.email;
    const participantPhotoUrl = contest.photoUrl;
    const participantNumber = contest.contestParticipants;
    const participantPrize = contest.contestPriceMoney;

    const winnerInfo = {
      paymentId,
      participantContestId,
      participantContestName,
      participantName,
      participantEmail,
      participantPhotoUrl,
      participantNumber,
      participantPrize,
    };
    axiosSecure.post("/winners", winnerInfo).then((res) => {
      refetch();
      console.log(res.data);
    });
  };

  const [contestOver, setContestOver] = useState(false);

  return (
    <div>
      <h3 className="text-center text-3xl">
        Participants in {titleContest.contestName}: {titleContest.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Participant Name</th>
              <th>Participant Email</th>
              <th>Deadline</th>
              <th>Total Participants</th>

              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {titleContest.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.name}</td>
                <td>{contest.email}</td>
                <td>
                  {
                    <Countdown
                      date={contest.contestDate}
                      renderer={({days, hours, minutes, seconds, completed}) => {
                        if (completed) {
                          return <span className="text-blue-600"> Time Up {setContestOver(true)}</span>;
                        } else {
                          return (
                            <span>
                              {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                            </span>
                          );
                        }
                      }}
                    />
                  }
                </td>
                <td>
                  {contestOver ? (
                    <>
                      {winner ? (
                        <>{contest.contestWinner == "Winner" ? <>Win</> : <>Unsuccess</>}</>
                      ) : (
                        <>
                          <button className="btn" onClick={() => handleSelectWinner(contest)}>
                            Declare Winner
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>Dont Select</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TitleWiseContest;
