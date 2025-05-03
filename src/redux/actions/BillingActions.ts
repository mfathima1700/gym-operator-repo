"use server";
//import { loadStripe } from "@stripe/stripe-js";

import {
  CREATE_CHECKOUT_SESSION_FAILURE,
  CREATE_CHECKOUT_SESSION_REQUEST,
  CREATE_CHECKOUT_SESSION_SUCCESS,
  GET_PAYMENT_DATA_FAILURE,
  GET_PAYMENT_DATA_SUCCESS,
  GET_REVENUE_DATA_FAILURE,
  GET_REVENUE_DATA_SUCCESS,
  REDIRECT_TO_CHECKOUT_FAILURE,
  REDIRECT_TO_CHECKOUT_REQUEST,
  REDIRECT_TO_CHECKOUT_SUCCESS,
  UPDATE_PRICE_FAILURE,
  UPDATE_PRICE_SUCCESS,
} from "../constants/BillingConstants";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Stripe from "stripe";
import { db } from "@/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY as string);

export const createCheckoutOwnerSession = async (id: string) => {
  //dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1R5W0GAg73NAkbA8vky0wt2c", // Replace with your Price ID
          quantity: 1,
        },
      ], // Use dynamic line items
      mode: "subscription",
      success_url: `http://localhost:3000/owner/${id}/billing/success`,
      cancel_url: `http://localhost:3000/owner/${id}/billing/failure`,
    });

    return {
      type: CREATE_CHECKOUT_SESSION_SUCCESS,
      payload: session.id,
    };
    // return session.id;
  } catch (error) {
    return {
      type: CREATE_CHECKOUT_SESSION_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
    //throw error;
  }
};

export const createCheckoutIndividualSession = async (id: string) => {
  //dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1R5W6MAg73NAkbA8u707z1fF", // Replace with your Price ID
          quantity: 1,
        },
      ], // Use dynamic line items
      mode: "subscription",
      success_url: `http://localhost:3000/individual/${id}/billing/success`,
      cancel_url: `http://localhost:3000/individual/${id}/billing/failure`,
    });

    return {
      type: CREATE_CHECKOUT_SESSION_SUCCESS,
      payload: session.id,
    };
    //return session.id;
  } catch (error) {
    return {
      type: CREATE_CHECKOUT_SESSION_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};

export const updateGymPricing = async (gymId: string, newPrice: number) => {
  //dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });
  try {
    const gym = await db.gym.findUnique({
      where: { id: gymId },
    });

    if (!gym) {
      throw new Error("Gym not found");
    }

    let productId = gym.stripeProductId
    if (!productId) {
      const product = await stripe.products.create({
        name: `${gym.name} Membership`,
        metadata: { gym_id: gymId },
      });

      productId = product.id
    } 
    
    if(gym.stripePriceId){
      await stripe.prices.update(gym.stripePriceId, { active: false });
    }

    const price = await stripe.prices.create({
      product: productId,
      unit_amount: newPrice * 100, // Convert to cents
      currency: "usd",
      recurring: { interval: "month" }, // Monthly subscription
    });

    const updatedGym = await db.gym.update({
      where: { id: gym.id },
      data: {
        stripeProductId: productId,
        monthlyPrice: newPrice.toString(),
        stripePriceId: price.id,
        //logo: logoBuffer,
      },
    });

    return {
      type: UPDATE_PRICE_SUCCESS,
      payload: price,
    };
    //return session.id;
  } catch (error) {
    return {
      type: UPDATE_PRICE_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};

export const createMemberCheckout = async (userId: string, gymId: string) => {
  //dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });
  try {
    const gym = await db.gym.findUnique({
      where: { id: gymId },
    });

    if (!gym || !gym.stripePriceId) {
      throw new Error("Gym/gym pricing not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: gym.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `http://localhost:3000/individual/${userId}/billing/success`, // does it need checkout session id?
      cancel_url: `http://localhost:3000/individual/${userId}/billing/failure`,
    });

    return {
      type: CREATE_CHECKOUT_SESSION_SUCCESS,
      payload: session.id,
    };
    //return session.id;
  } catch (error) {
    return {
      type: CREATE_CHECKOUT_SESSION_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};

// export const redirectToCheckout =
//   (sessionId: any) => async (dispatch: AppDispatch) => {
//     dispatch({ type: REDIRECT_TO_CHECKOUT_REQUEST });

//     try {
//       const stripe = await loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
//       const result = await stripe.redirectToCheckout({
//         sessionId,
//       });

//       if (result.error) {
//         dispatch({
//           type: REDIRECT_TO_CHECKOUT_FAILURE,
//           payload: result.error.message,
//         });
//         throw result.error;
//       }

//       dispatch({
//         type: REDIRECT_TO_CHECKOUT_SUCCESS,
//       });
//     } catch (error) {
//       dispatch({
//         type: REDIRECT_TO_CHECKOUT_FAILURE,
//         payload: error,
//       });
//       throw error;
//     }
//   };

export const getPaymentData = async (sessionId: string) => {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 10, // Adjust the limit as needed
    });

    return {
      type: GET_PAYMENT_DATA_SUCCESS,
      payload: payments,
    };
  } catch (error) {
    return {
      type: GET_PAYMENT_DATA_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
    //throw error;
  }
};

export const getGymRevenue = async (gymId: string) => {
  try {
    const gym = await db.gym.findUnique({
      where: { id: gymId },
    });

    if(!gym){
      
    }

    
    if(gym?.stripePriceId){
      const subscriptions = await stripe.subscriptions.list({
        status: "active",
        limit: 100,
        price: gym.stripePriceId, // Only subscriptions for this gym's price
      });

      return {
        type: GET_REVENUE_DATA_SUCCESS,
        payload: subscriptions.data,
      };
    }

    // Get all subscriptions for this gym's product
    
    // Calculate total monthly revenue
    // const monthlyRevenue = subscriptions?.data?.reduce(
    //   (sum, sub) => sum + sub.items.data[0].price.unit_amount / 100,
    //   0
    // );


    return {
      type: GET_REVENUE_DATA_FAILURE,
      payload:  "No data found" ,
    };
    
  } catch (error) {
    console.log(error);
    return {
      type: GET_REVENUE_DATA_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};
