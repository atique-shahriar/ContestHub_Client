import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
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

  const {_id, contestName, contestImageUrl, contestParticipants, contestPriceMoney, contestDeadline, contestPrice} = contest;
  const [postalCode, setPostalCode] = useState("");

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

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const {error: cardNumberError} = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (cardNumberError) {
      console.log("Card number error", cardNumberError.message);
      toast.error(cardNumberError.message);
      return;
    }

    const {error: expiryError} = await stripe.createPaymentMethod({
      type: "card",
      card: cardExpiryElement,
    });

    if (expiryError) {
      console.log("Expiry date error", expiryError.message);
      toast.error(expiryError.message);
      return;
    }

    const {error: cvcError} = await stripe.createPaymentMethod({
      type: "card",
      card: cardCvcElement,
    });

    if (cvcError) {
      console.log("CVC error", cvcError.message);
      toast.error(cvcError.message);
      return;
    }

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
          address: {
            postal_code: postalCode,
          },
        },
      },
    });

    if (confirmError) {
      console.log("Confirm Error", confirmError.message);
      toast.error(confirmError.message);
    } else {
      console.log("Payment Intent", paymentIntent);
      toast.success(`Payment Successful. Transaction ID: ${paymentIntent.id}`);

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
        contestParticipants: contestParticipants,
        contestPriceMoney: contestPriceMoney,
        date: new Date(),
        status: "Paid",
      };

      const res = await axiosSecure.post("/payments", payment);
      console.log("Payment response", res);

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
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold text-[#3672B7] text-center mt-6 mb-4">Payment for {contest.contestName}</h3>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Card Number</label>
            <CardNumberElement
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
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold">Expiration Date</label>
              <CardExpiryElement
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
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">CVC</label>
              <CardCvcElement
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
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Postal Code</label>
            <input type="text" value={postalCode} onChange={handlePostalCodeChange} className="p-3 border border-gray-300 rounded-lg w-full" placeholder="Enter Postal Code" />
          </div>
          <button type="submit" className="mt-4 py-2 rounded-lg w-full text-white bg-blue-600 hover:bg-blue-800" disabled={!stripe || !clientSecret}>
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  contest: PropTypes.object,
};

export default CheckoutForm;
