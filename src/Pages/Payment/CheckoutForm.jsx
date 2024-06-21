import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PropTypes } from "prop-types";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = ({contest}) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  const {user} = useContext(AuthContext);

  const {_id, contestName, contestImageUrl, contestParticipants, contestDeadline, contestPrice} = contest;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", {price: contestPrice}).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, contestPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      toast.error(error.message);
    } else {
      console.log("PaymentMethod", paymentMethod);
      toast.success("Payment Successfull");
    }

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymus",
          name: user?.displayName || "anonymus",
        },
      },
    });
    if (confirmError) {
      console.log("Confirm Error");
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status == "succeeded") {
        toast.success("Your transaction id: ", paymentIntent.id);

        const payment = {
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL,
          contestId: _id,
          contestName: contestName,
          contestImageUrl: contestImageUrl,
          contestDate: contestDeadline,
          transactionId: paymentIntent.id,
          contestPrice: contestPrice,
          date: new Date(),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log(res);

        axiosSecure.put(`/contestsParticipants/${_id}`, {participants: contestParticipants}).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Confirmed",
              text: "Participants added",
              icon: "success",
            });
          }
        });

        axiosSecure
          .put(`/contestsRegistered/${_id}`, {
            contestRegistered: user.email,
          })
          .then();
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" className="btn" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  contest: PropTypes.object,
};

export default CheckoutForm;
