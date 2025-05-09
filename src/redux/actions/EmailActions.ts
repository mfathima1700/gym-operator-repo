"use client"

import emailjs from "emailjs-com";
import { SEND_CANCEL_FAILED, SEND_CANCEL_SUCCESS } from "../constants/EmailConstants";

export async function sendTestEmail(email: string, data: any) {
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

interface UserInfo {
  email: string;
  name: string;
  gymName: string;
  className: string;
}

export async function sendDeleteEmail(userInfo: UserInfo) {
  try {
   
    const templateParams = {
        to_email: userInfo.email,
        to_name: userInfo.name ? userInfo.name : "gym member", // recipient's email address
        from_name: `Gym ${userInfo.gymName} team`,
        gym_name: userInfo.gymName,
        subject: "GYM Class Cancellation",
        message: `The class ${userInfo.className} has been cancelled henceforth. We apologise for any inconvenience this may cause.`
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

export async function sendCancelEmail(userInfo: UserInfo, date: Date) {
  try {

    const templateParams = {
      to_email: userInfo.email,
      to_name: userInfo.name ? userInfo.name : "gym member", // recipient's email address
      from_name: `Gym ${userInfo.gymName} team`,
      gym_name: userInfo.gymName,
      subject: "GYM Class Cancellation",
      message: `The class ${userInfo.className} has been cancelled for ${date.toDateString()}.
       We apologise for any inconvenience this may cause.`,
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

  }
  catch (error) {
    console.log("FAILED TO SEND EMAIL")
    console.log(error);
    return {
      type: SEND_CANCEL_FAILED,
      payload: error,
    };
  }
}

export async function sendBookedEmail(userInfo: UserInfo, date: Date) {
  try {
   
    const templateParams = {
        to_email: userInfo.email,
        to_name: userInfo.name ? userInfo.name : "gym member", // recipient's email address
        from_name: `Gym ${userInfo.gymName} team`,
        gym_name: userInfo.gymName,
        subject: "GYM Class Booking",
        message: `You have been booked for the ${userInfo.className} class on ${date.toDateString()}.`
      };

    const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string,
        templateParams,
      process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY as string
    )
    
    return result

    // console.log("SENT EMAIL")
    // return {
    //   type: SEND_CANCEL_SUCCESS,
    //   payload: result,
    // };
  } catch (error) {
    console.log("FAILED TO SEND EMAIL")
    console.log(error);
    // return {
    //   type: SEND_CANCEL_FAILED,
    //   payload: error,
    // };
  }
}