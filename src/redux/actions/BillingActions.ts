"use server";
import { loadStripe } from "@stripe/stripe-js";

import {
  CREATE_CHECKOUT_SESSION_FAILURE,
  CREATE_CHECKOUT_SESSION_REQUEST,
  CREATE_CHECKOUT_SESSION_SUCCESS,
  GET_PAYMENT_DATA_FAILURE,
  GET_PAYMENT_DATA_SUCCESS,
  REDIRECT_TO_CHECKOUT_FAILURE,
  REDIRECT_TO_CHECKOUT_REQUEST,
  REDIRECT_TO_CHECKOUT_SUCCESS,
} from "../constants/BillingConstants";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutOwnerSession =
  ( id: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price: 'price_1R5W0GAg73NAkbA8vky0wt2c', // Replace with your Price ID
            quantity: 1,
          },], // Use dynamic line items
        mode: "payment",
        success_url: `http://localhost:3000/owner/${id}/billing/success`,
        cancel_url: `http://localhost:3000/owner/${id}/billing/success`,
      });

      dispatch({
        type: CREATE_CHECKOUT_SESSION_SUCCESS,
        payload: session.id,
      });
      return session.id;
    } catch (error) {
      dispatch({
        type: CREATE_CHECKOUT_SESSION_FAILURE,
        payload: error,
      });
      throw error;
    }
  };

  export const createCheckoutIndividualSession =
  ( id: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price: 'price_1R5W6MAg73NAkbA8u707z1fF', // Replace with your Price ID
            quantity: 1,
          },], // Use dynamic line items
        mode: "payment",
        success_url: `http://localhost:3000/individual/${id}/billing/success`,
        cancel_url: `http://localhost:3000/individual/${id}/billing/success`,
      });

      dispatch({
        type: CREATE_CHECKOUT_SESSION_SUCCESS,
        payload: session.id,
      });
      return session.id;
    } catch (error) {
      dispatch({
        type: CREATE_CHECKOUT_SESSION_FAILURE,
        payload: error,
      });
      throw error;
    }
  };

export const redirectToCheckout =
  (sessionId: any) => async (dispatch: AppDispatch) => {
    dispatch({ type: REDIRECT_TO_CHECKOUT_REQUEST });

    try {
      const stripe = await loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        dispatch({
          type: REDIRECT_TO_CHECKOUT_FAILURE,
          payload: result.error.message,
        });
        throw result.error;
      }

      dispatch({
        type: REDIRECT_TO_CHECKOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: REDIRECT_TO_CHECKOUT_FAILURE,
        payload: error,
      });
      throw error;
    }
  };

export const getPaymentData =
  (sessionId: any) => async (dispatch: AppDispatch) => {
    try {
      const payments = await stripe.paymentIntents.list({
        limit: 10, // Adjust the limit as needed
      });

      dispatch({
        type: GET_PAYMENT_DATA_SUCCESS,
        payload: payments,
      });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_DATA_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
