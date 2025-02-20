"use client"

import emailjs from "emailjs-com";
import { SEND_CANCEL_FAILED, SEND_CANCEL_SUCCESS } from "../constants/EmailConstants";

export async function sendCancelEmail(email: string, data: any) {
  try {
   
    const templateParams = {
        to_email: "sleopard19@outlook.com",
        to_name:"ME me me", // recipient's email address
        from_name: "Gym team",
        gym_name: "Gym",
        subject: "GYM Class Cancellation",
        message: "Hello, this is a test email!"
      };

    const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string,
        templateParams,
      process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY as string
    )
    
    

    console.log("SENT EMAIL")
    return {
      type: SEND_CANCEL_SUCCESS,
      payload: result,
    };
  } catch (error) {
    console.log("FAILED TO SEND EMAIL")
    console.log(error);
    return {
      type: SEND_CANCEL_FAILED,
      payload: error,
    };
  }
}