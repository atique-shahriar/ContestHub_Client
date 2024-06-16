import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData, useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {
  const {id} = useParams();
  const contests = useLoaderData();

  let contest = contests.find((item) => item._id == id);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm contest={contest}></CheckoutForm>
    </Elements>
  );
};

export default Payment;
