"use server"

import { db } from "@/db";
import { BOOK_CLASS_FAILED, BOOK_CLASS_SUCCESS, CANCEL_BOOKING_FAILED, CANCEL_BOOKING_SUCCESS, CANCEL_CLASS_FAILED, CANCEL_CLASS_SUCCESS, CREATE_CLASS_FAILED, CREATE_CLASS_SUCCESS, DELETE_CLASS_FAILED, DELETE_CLASS_SUCCESS, EDIT_CLASS_FAILED, EDIT_CLASS_SUCCESS, GET_BOOKINGS_FAILED, GET_BOOKINGS_SUCCESS } from "../constants/ClassConstants";
import { IntensityRating, Occurance, SkillLevel } from "@prisma/client";



interface classData {
    name: string,           // Class name
    description: string       // Description of the class
    instructorId?: string,         // Selected instructor
    startDate: Date,        // Start date
    endDate: Date,          // End date
    capacity: string,           // Max capacity of class
    intensity: string         // Intensity level: BEGINNER, INTERMEDIATE, ADVANCED
    recurrence: string         // Recurrence: one-off, weekly, biweekly
    duration: string,           // Duration in minutes
    days: string[],               // Days selected for the class (array of weekdays)   // Any required equipment
    room?: string, 
    skillLevel: string,
    time:string,
  }

export async function createClass(data: classData, gymId: string) {
  try {

    const gym = await db.gym.findUnique({
      where: { id: gymId },
    });

    if (!gym) {
      throw new Error("Gym not found");
    }

    const startDateTime = new Date(data.startDate);
    const [startHour, startMinute] = data.time.split(":").map(Number);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(data.endDate);
    const [endHour, endMinute] = data.time.split(":").map(Number);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(data.duration));

    const newClass = await db.class.create({
        data: {
          name: data.name,
          ...(data.description ? { description: data.description } : {}),
          gymId: gymId,
          capacity: parseInt(data.capacity),
          duration: parseInt(data.duration),
          intensity: data.intensity as IntensityRating, // Ensure it matches the enum
          recurrence: data.recurrence as Occurance,
          
          ...(data.instructorId ? { instructorId: data.instructorId } : {}),
          startDate: startDateTime,
          endDate: endDateTime,
         
          days: data.days ?? [], // Ensure this is stored properly (e.g., array of weekdays)
          ...(data.room ? { room: data.room } : {}),
          skillLevel: data.skillLevel as SkillLevel,
          time: data.time,
         
        },
      });


    console.log("CLASS CREATED SUCCESS");
    return {
      type: CREATE_CLASS_SUCCESS,
      payload: newClass,
    };

    

  }catch (error) {
    console.log("CREATE CLASS FAILED");
    console.log(error);
    return {
      type: CREATE_CLASS_FAILED,
      payload: error,
    };
  }
}

export async function updateClass(data: classData, classId: string) {
  try {

    const gymClass = await db.class.findUnique({
      where: { id: classId },
    });

    if (!gymClass) {
      throw new Error("class not found");
    }

    const startDateTime = new Date(data.startDate);
    const [startHour, startMinute] = data.time.split(":").map(Number);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(data.endDate);
    const [endHour, endMinute] = data.time.split(":").map(Number);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(data.duration));
    
    const updatedClass = await db.class.update({
      where: { id:classId },
        data: {
          name: data.name,
          ...(data.description ? { description: data.description } : {}),
          capacity: parseInt(data.capacity),
          duration: parseInt(data.duration),
          intensity: data.intensity as IntensityRating, // Ensure it matches the enum
          recurrence: data.recurrence as Occurance,
          
          ...(data.instructorId ? { instructorId: data.instructorId } : {}),
          startDate: startDateTime,
          endDate: endDateTime,
         
          days: data.days ?? [], // Ensure this is stored properly (e.g., array of weekdays)
          ...(data.room ? { room: data.room } : {}),
          skillLevel: data.skillLevel as SkillLevel,
          time: data.time,
         
        },
      });

      return {
        type: EDIT_CLASS_SUCCESS,
        payload: updatedClass,
      };

  } catch (error) {
    console.log("UPDATE CLASS FAILED");
    console.log(error);
    return {
      type: EDIT_CLASS_FAILED,
      payload: error,
    };
  }
}

export async function bookClass(classId: string, userId:string) {
  try {

    const booking = await db.booking.create({
      data: {
        userId: userId,
        classId: classId,
      },
    });

    console.log("BOOK CLASS SUCCESS");

    return {
      type: BOOK_CLASS_SUCCESS,
      payload: booking,
    };

  } catch (error) {
    console.log("BOOK CLASS FAILED");
    console.log(error);
    return {
      type: BOOK_CLASS_FAILED,
      payload: error,
    };
  }
}

export async function cancelBooking(classId: string, userId:string) {
  try {

    const booking = await db.booking.deleteMany({
      where: {
        userId: userId,
        classId: classId,
      },
    });

    console.log("BOOK CLASS SUCCESS");

    return {
      type: CANCEL_BOOKING_SUCCESS,
      payload: booking,
    };

  } catch (error) {
    console.log("BOOK CLASS FAILED");
    console.log(error);
    return {
      type: CANCEL_BOOKING_FAILED,
      payload: error,
    };
  }
}

// cancel all bookings for that particular class
export async function cancelClass(classId: string) {
  try {

    // instead send out email to every boked person that this class is cancelled
    // add this date to cancelledDates[] for this class
    // const deletedGymClass = await db.booking.deleteMany({
    //   where: {
    //     classId: classId, // your class's id
    //   },
    // });

    console.log("CANCEL CLASS SUCCESS");

    return {
      type: CANCEL_CLASS_SUCCESS,
      payload: {},
    };

  } catch (error) {
    console.log("CANCEL CLASS FAILED");
    console.log(error);
    return {
      type: CANCEL_CLASS_FAILED,
      payload: error,
    };
  }
}


export async function deleteClass(classId: string) {
  try {

    const deletedGymClass = await db.class.delete({
      where: {
        id: classId,
      },
    });

    console.log("DELETE CLASS SUCCESS");

    return {
      type: DELETE_CLASS_SUCCESS,
      payload: deletedGymClass,
    };

  } catch (error) {
    console.log("DELETE CLASS FAILED");
    console.log(error);
    return {
      type: DELETE_CLASS_FAILED,
      payload: error,
    };
  }
}

export async function getBookings(id: string){
  try {
    const userBookings = await db.booking.findMany({
      where: { userId: id },
      include: { class: true },
    });

    return {
      type: GET_BOOKINGS_SUCCESS,
      payload: userBookings,
    };

  }catch(error){
    console.log(error);

    return {
      type: GET_BOOKINGS_FAILED,
      payload: error,
    };
  }
}