"use server";
//import { loadStripe } from "@stripe/stripe-js";

import {
  CREATE_CHECKOUT_SESSION_FAILURE,
  CREATE_CHECKOUT_SESSION_REQUEST,
  CREATE_CHECKOUT_SESSION_SUCCESS,
  GET_INVOICES_FAILURE,
  GET_INVOICES_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GET_PAYMENTS_SUCCESS,
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

export const createCheckoutOwnerSession = async (id: string, email: string, name: string) => {
  //dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });

  try {
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      metadata: { userId: id },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id, 
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

    await db.user.update({
      where: { id: id },
      data: { stripeCustomerId: session.customer as string },
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

    let productId = gym.stripeProductId;
    if (!productId) {
      const product = await stripe.products.create({
        name: `${gym.name} Membership`,
        metadata: { gym_id: gymId },
      });

      console.log("PRODUCT CREATED");

      productId = product.id;
    }

    if (gym.stripePriceId) {
      await stripe.prices.update(gym.stripePriceId, { active: false });
    }

    const price = await stripe.prices.create({
      product: productId,
      unit_amount: newPrice * 100, // Convert to cents
      currency: "gbp",
      recurring: { interval: "month" }, // Monthly subscription
    });

    console.log("PRICE CREATED");

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
    };
    //return session.id;
  } catch (error) {
    return {
      type: UPDATE_PRICE_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};

export const createMemberCheckout = async (userId: string, gymId: string, email: string, name: string) => {
  //dispatch({ type: CREATE_CHECKOUT_SESSION_REQUEST });
  try {
    const gym = await db.gym.findUnique({
      where: { id: gymId },
    });

    if (!gym || !gym.stripePriceId) {
      throw new Error("Gym/gym pricing not found");
    }

  
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      metadata: { userId: userId },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id, 
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
      subscription_data: {
        metadata: {
          gym_id: gym.id, // 👈 attach your gymId here
        },
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { stripeCustomerId: session.customer as string },
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

// const subscriptions = await stripe.subscriptions.list({
//   status: "active",
//   limit: 100,
//   price: stripePriceId, // Only subscriptions for this gym's price
// });

// const invoices = await stripe.invoices.list({
//   limit: 100,
//   subscription_details: { metadata: { gym_id: gymId } },
// });

// const invoices = await stripe.invoices.list({
//   limit: 100,
//   subscription_items: [{ price: 'price_YOUR_PLATFORM_FEE' }],
// });

export const getOwnerPayments = async (gymId: string) => {
  try {
    const invoices = await stripe.invoices.list({
      limit: 100,
      status: "paid",
      expand: ["data.customer"],
    });

    console.log("GOT PAYMENTS")

    // Filter manually by metadata
    const filteredInvoices = invoices.data.filter(
      (invoice) => invoice.metadata?.gym_id === gymId
    );
    const plainInvoices = filteredInvoices.map((invoice) => ({
      id: invoice.id,
      amount_paid: invoice.amount_paid,
      created: invoice.created,
      status: invoice.status,
      hosted_invoice_url: invoice.hosted_invoice_url,
      invoice_pdf: invoice.invoice_pdf,
      subscription: invoice.subscription,
      customer_email: invoice.customer_email,
      currency: invoice.currency,
    }));

    console.log(plainInvoices)

    return {
      type: GET_PAYMENTS_SUCCESS,
      payload: plainInvoices,
    };
  } catch (error) {
    console.log(error);
    return {
      type: GET_PAYMENTS_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};

export const getOwnerInvoices = async (stripeCustomerId: string) => {
  try {
    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
      limit: 12, // Last 12 payments
      //status: 'paid', // Optional: filter only successful payments
    });
    console.log("GOT INVOICES")

    const plainInvoices = invoices.data.map((invoice) => ({
      id: invoice.id,
      amount_paid: invoice.amount_paid,
      created: invoice.created,
      status: invoice.status,
      hosted_invoice_url: invoice.hosted_invoice_url,
      invoice_pdf: invoice.invoice_pdf,
      subscription: invoice.subscription,
      customer_email: invoice.customer_email,
      currency: invoice.currency,
    }));

    console.log(plainInvoices)

    return {
      type: GET_INVOICES_SUCCESS,
      payload: plainInvoices,
    };
  } catch (error) {
    console.log(error);
    return {
      type: GET_INVOICES_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};

export const getMemberInvoices = async (stripeCustomerId: string) => {
  try {
    // valid cusotmer id check?

    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
      limit: 12,
    });

    const plainInvoices = invoices.data.map((invoice) => ({
      id: invoice.id,
      amount_paid: invoice.amount_paid,
      created: invoice.created,
      status: invoice.status,
      hosted_invoice_url: invoice.hosted_invoice_url,
      invoice_pdf: invoice.invoice_pdf,
      subscription: invoice.subscription,
      customer_email: invoice.customer_email,
      currency: invoice.currency,
    }));

    return {
      type: GET_INVOICES_SUCCESS,
      payload: plainInvoices,
    };
  } catch (error) {
    console.log(error);
    return {
      type: GET_INVOICES_FAILURE,
      payload: { error: (error as Error).message || "Unknown error" },
    };
  }
};

export const deletePrices:any = async (priceId: string) => {
  try {
    const result = await stripe.prices.update(priceId, { active: false });

   return result
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteProduct:any = async (productId: string) => {
  try {
    const result = await stripe.products.del(productId);

   return result
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteCustomer:any = async (customerId: string) => {
  try {
    const result = await stripe.customers.del(customerId);

   return result
  } catch (error) {
    console.log(error);
    return error;
  }
};
