"use client";

import CNLayout from "@/components/layout/cn-layout";
import { createCheckoutOwnerSession, getMemberInvoices, getOwnerInvoices, updateGymPricing } from "@/redux/actions/BillingActions";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/components/billing/OrderSummary";
import { PaymentCard } from "@/components/payment/PaymentCard";
import OwnerInvoices from "@/components/invoices/Invoices";
import Invoices from "@/components/invoices/Invoices";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function MemberInvoicesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  
  const invoicesState = useSelector((state: RootState) => state.getInvoices);
 
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    stripeCustomerId: "",
    ownedGym: {
      monthlyPrice: 0,
      id: "",
      classes: [],
    },
   
  }));


  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);

      dispatch(getMemberInvoices(userData.stripeCustomerId));
    }
  }, [userState.user, userState.success, userState.error]);

  useEffect(() => {
   
   
  }, [invoicesState.invoices, invoicesState.error]);

  

  

  return (
    <>
      <CNLayout user={userData} id={id} name={"Invoices"}>
      <div className="mx-auto py-8 ">
        {
            invoicesState.invoices?.length > 0 ?
            <Invoices invoices={invoicesState.invoices} /> :
            <div>No invoices found</div>
        }
         
         
        </div>
      </CNLayout>
    </>
  );
}
