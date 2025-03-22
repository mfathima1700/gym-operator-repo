"use server"
import { loadStripe } from '@stripe/stripe-js';

import { CREATE_CHECKOUT_SESSION_FAILURE, CREATE_CHECKOUT_SESSION_REQUEST, CREATE_CHECKOUT_SESSION_SUCCESS, GET_PAYMENT_DATA_FAILURE, GET_PAYMENT_DATA_SUCCESS, REDIRECT_TO_CHECKOUT_FAILURE, REDIRECT_TO_CHECKOUT_REQUEST, REDIRECT_TO_CHECKOUT_SUCCESS } from "../constants/BillingConstants";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);




export const createCheckoutSession = (lineItems) => async (dispatch) => {
    dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });
  
    try {


      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems, // Use dynamic line items
        mode: 'payment',
        success_url: 'https://your-app.com/success',
        cancel_url: 'https://your-app.com/failure',
      });


      
      dispatch({
        type: CREATE_CHECKOUT_SESSION_SUCCESS,
        payload: session.id,
      });
      return session.id;
    } catch (error) {
      dispatch({
        type: CREATE_CHECKOUT_SESSION_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
  


  export const redirectToCheckout = (sessionId: any) => async (dispatch) => {
    dispatch({ type: REDIRECT_TO_CHECKOUT_REQUEST });
  
    try {
      const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
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
        payload: error.message,
      });
      throw error;
    }
  };

  export const getPaymentData = (sessionId) => async (dispatch) => {

    try{
        const payments = await stripe.paymentIntents.list({
            limit: 10, // Adjust the limit as needed
          });

          dispatch({
            type: GET_PAYMENT_DATA_SUCCESS,
            payload: payments,
          });

    }catch(error){
        dispatch({
            type: GET_PAYMENT_DATA_FAILURE,
            payload: error.message,
          });
          throw error;

    }
  }