"use client";

import CNLayout from "@/components/layout/cn-layout";
import { createCheckoutOwnerSession, updateGymPricing } from "@/redux/actions/BillingActions";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/components/billing/OrderSummary";
import { PaymentCard } from "@/components/payment/PaymentCard";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function SetPricingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  
  const updatePriceState = useSelector((state: RootState) => state.updatePrice);
 
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    ownedGym: {
      monthlyPrice: 0,
      id: "",
      classes: [],
    },
   
  }));

  const [price, setPrice] = useState(30);

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
    if(updatePriceState.success){
      // TODO: Redirect to dashboard page
    }
   
  }, [updatePriceState.success, updatePriceState.error]);

  

  function handleUpdatePricing(e: React.MouseEvent) {
    try {
      dispatch(updateGymPricing( userData.ownedGym.id, price));
      //await dispatch(redirectToCheckout(sessionId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CNLayout user={userData} id={id} name={"Pricing"}>
      <div className="mx-auto py-8 ">
         <PaymentCard handleUpdatePricing={handleUpdatePricing} price={price} setPrice={setPrice}
          currentPrice={userData.ownedGym.monthlyPrice} />
         
        </div>
      </CNLayout>
    </>
  );
}
