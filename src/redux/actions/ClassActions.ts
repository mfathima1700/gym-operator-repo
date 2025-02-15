import { db } from "@/db";
import { CREATE_CLASS_FAILED, CREATE_CLASS_SUCCESS } from "../constants/ClassConstants";

interface classData {
    name: string,           // Class name
    description: string       // Description of the class
    instructorId: string,         // Selected instructor
    startDate: Date,        // Start date
    endDate: Date,          // End date
    capacity: number           // Max capacity of class
    intensity: string         // Intensity level: BEGINNER, INTERMEDIATE, ADVANCED
    recurrence: string         // Recurrence: one-off, weekly, biweekly
    duration: number,           // Duration in minutes
    days: string[],               // Days selected for the class (array of weekdays)   // Any required equipment
    room: string, 
}

export async function createClass(data: classData, id: string) {
  try {

    const user = await db.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        
      },
    });


    console.log("UPDATE MEMBER SUCCESS");
    return {
      type: CREATE_CLASS_SUCCESS,
      payload: updatedUser,
    };

    

  }catch (error) {
    console.log("UPDATE USER FAILED");
    console.log(error);
    return {
      type: CREATE_CLASS_FAILED,
      payload: error,
    };
  }
}