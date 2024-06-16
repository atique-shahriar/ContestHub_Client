import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckoutForm = ({contest}) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  const {_id, contestName, contestImageUrl, contestDescription, contestParticipants} = contest;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", {price: contest.contestPrice}).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, contest]);

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
