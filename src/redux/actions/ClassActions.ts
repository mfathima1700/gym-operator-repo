"use server"

import { db } from "@/db";
import { CREATE_CLASS_FAILED, CREATE_CLASS_SUCCESS } from "../constants/ClassConstants";
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
    startTime:string,
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
    const [startHour, startMinute] = data.startTime.split(":").map(Number);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(data.endDate);
    const [endHour, endMinute] = data.startTime.split(":").map(Number);
    endDateTime.setHours(endHour, endMinute, 0, 0);


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
          time: data.startTime,
         
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
    const [startHour, startMinute] = data.startTime.split(":").map(Number);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(data.endDate);
    const [endHour, endMinute] = data.startTime.split(":").map(Number);
    endDateTime.setHours(endHour, endMinute, 0, 0);


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
          time: data.startTime,
         
        },
      });


  } catch (error) {
    console.log("UPDATE CLASS FAILED");
    console.log(error);
    return {
      type: CREATE_CLASS_FAILED,
      payload: error,
    };
  }
}

export async function bookClass(classId: string, userId:string) {
  try {


  } catch (error) {
    console.log("BOOK CLASS FAILED");
    console.log(error);
    return {
      type: CREATE_CLASS_FAILED,
      payload: error,
    };
  }
}