import { db } from "@/db";
import { CREATE_CLASS_FAILED, CREATE_CLASS_SUCCESS } from "../constants/ClassConstants";
import { IntensityRating, Occurance } from "@prisma/client";

interface classData {
    name: string,           // Class name
    description: string       // Description of the class
    instructorId?: string,         // Selected instructor
    startDate: Date,        // Start date
    endDate: Date,          // End date
    capacity: number           // Max capacity of class
    intensity: string         // Intensity level: BEGINNER, INTERMEDIATE, ADVANCED
    recurrence: string         // Recurrence: one-off, weekly, biweekly
    duration: number,           // Duration in minutes
    days: string[],               // Days selected for the class (array of weekdays)   // Any required equipment
    room?: string, 
}

export async function createClass(data: classData, gymId: string) {
  try {

    const gym = await db.gym.findUnique({
      where: { id: gymId },
    });

    if (!gym) {
      throw new Error("Gym not found");
    }


    const newClass = await db.class.create({
        data: {
          name: data.name,
          description: data.description,
          instructorId: data.instructorId, // Assuming instructor is a User
          startDate: data.startDate,
          endDate: data.endDate,
          capacity: data.capacity,
          intensity: data.intensity as IntensityRating, // Ensure it matches the enum
          recurrence: data.recurrence as Occurance,
          duration: data.duration,
          days: data.days, // Ensure this is stored properly (e.g., array of weekdays)
          room: data.room,
          gymId: gymId  // Connects the class to the gym
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