"use client";

import OrderSummary from "@/components/billing/OrderSummary";
import CNLayout from "@/components/layout/cn-layout";
import { createCheckoutIndividualSession, createMemberCheckout } from "@/redux/actions/BillingActions";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function IndividualCheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const updateOwnerSettingsState = useSelector(
    (state: RootState) => state.updateOwnerSettings
  );
  const userState = useSelector((state: RootState) => state.getUser);
  const checkoutState = useSelector(
      (state: RootState) => state.checkout
    );
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBKISHABLE_KEY as string);
  const [userData, setUserData] = useState(() => ({
    email: "",
    name: "",
    gym: {
      id: "",
      classes:[],
      monthlyPrice:0
    },
  }));

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

   useEffect(() => {
      if(checkoutState.sessionId){
        getResult(checkoutState.sessionId);
      }
    }, [checkoutState.sessionId,  checkoutState.error]);
  
    const getResult = async (sessionId: string) => {
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.error(result.error);
        }
      }
    }
  
    const handleCheckout = async () => {
      try {
        dispatch(createMemberCheckout(id, userData.gym.id, userData.email, userData.name));
        //await dispatch(redirectToCheckout(sessionId));
        
      
  
      } catch (error) {
        console.error(error);
      }
    };
  
  return (
    <>
      <CNLayout user={userData} id={id} name={"Checkout"}>
        <div className="flex justify-center">
        <div className="max-w-xl ">
          <OrderSummary  handleCheckout={handleCheckout} message={checkoutState.error?.message}  
           owner={false} price={userData.gym.monthlyPrice}/>
         
        </div>
        </div>
      </CNLayout>
    </>
  );
}
