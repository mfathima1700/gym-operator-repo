"use server";

import { db } from "@/db";
import {
  BOOK_CLASS_FAILED,
  BOOK_CLASS_SUCCESS,
  CANCEL_BOOKING_FAILED,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_CLASS_FAILED,
  CANCEL_CLASS_SUCCESS,
  CREATE_CLASS_FAILED,
  CREATE_CLASS_SUCCESS,
  DELETE_CLASS_FAILED,
  DELETE_CLASS_SUCCESS,
  EDIT_CLASS_FAILED,
  EDIT_CLASS_SUCCESS,
  GET_BOOKINGS_FAILED,
  GET_BOOKINGS_SUCCESS,
} from "../constants/ClassConstants";
import { IntensityRating, Occurance, SkillLevel } from "@prisma/client";

interface classData {
  name: string; // Class name
  description: string; // Description of the class
  instructorId?: string; // Selected instructor
  startDate: Date; // Start date
  endDate: Date; // End date
  capacity: string; // Max capacity of class
  intensity: string; // Intensity level: BEGINNER, INTERMEDIATE, ADVANCED
  recurrence: string; // Recurrence: one-off, weekly, biweekly
  duration: string; // Duration in minutes
  days: string[]; // Days selected for the class (array of weekdays)   // Any required equipment
  room?: string;
  skillLevel: string;
  time: string;
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
  } catch (error) {
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
      where: { id: classId },
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

import { addDays, addWeeks, isBefore, parseISO } from "date-fns";

/**
 * Given a class, generates an array of all individual sessions as date ranges
 */
function generateClassSessions(cls: any): { start: Date; end: Date }[] {
  const startDate = new Date(cls.startDate);
  const endDate = new Date(cls.endDate);
  const time = cls.time ?? "00:00";
  const duration = cls.duration ?? 60;
  const days = cls.days; // e.g., ['Monday', 'Wednesday']
  const recurrence = cls.recurrence ?? "one-off";

  const sessions: { start: Date; end: Date }[] = [];
  const dayMap: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const weekdayNumbers = days.map((d: string) => dayMap[d]);

  let current = new Date(startDate);
  const stepDays =
    recurrence === "weekly" ? 7 : recurrence === "biweekly" ? 14 : 0;

  if (recurrence === "one-off") {
    // One-time class
    const [hour, minute] = time.split(":").map(Number);
    current.setHours(hour, minute, 0, 0);
    const end = new Date(current);
    end.setMinutes(end.getMinutes() + duration);
    sessions.push({ start: new Date(current), end });
    return sessions;
  }

  while (
    isBefore(current, endDate) ||
    current.toDateString() === endDate.toDateString()
  ) {
    for (const weekday of weekdayNumbers) {
      const day = new Date(current);
      day.setDate(day.getDate() + ((7 + weekday - day.getDay()) % 7));
      if (day > endDate) continue;

      const [hour, minute] = time.split(":").map(Number);
      day.setHours(hour, minute, 0, 0);
      const endTime = new Date(day);
      endTime.setMinutes(endTime.getMinutes() + duration);

      if (day >= startDate && day <= endDate) {
        sessions.push({ start: new Date(day), end: endTime });
      }
    }

    current = addWeeks(current, recurrence === "weekly" ? 1 : 2);
  }

  return sessions;
}

export async function bookClass(classId: string, userId: string) {
  try {
    const bookings = await db.booking.findMany({
      where: { userId: userId },
      include: { class: true },
    });

    const gymClass = await db.class.findUnique({
      where: { id: classId },
      include: { bookings: true },
    });

    if (!gymClass) {
      throw new Error("class not found");
    }

    if (gymClass.bookings.length >= (gymClass.capacity ?? 0)) {
      throw new Error("capacity reached");
    }

    const newSessions = generateClassSessions(gymClass);

    // Compare against all user's existing sessions
    for (const booking of bookings) {
      const existingSessions = generateClassSessions(booking.class);

      for (const newSess of newSessions) {
        for (const existSess of existingSessions) {
          const overlap =
            newSess.start < existSess.end && existSess.start < newSess.end;
          if (overlap) {
            throw new Error(
              "This class overlaps with another you are already booked for."
            );
          }
        }
      }
    }

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

export async function cancelBooking(classId: string, userId: string) {
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

export async function getBookings(id: string) {
  try {
    const userBookings = await db.booking.findMany({
      where: { userId: id },
      include: { class: true },
    });

    return {
      type: GET_BOOKINGS_SUCCESS,
      payload: userBookings,
    };
  } catch (error) {
    console.log(error);

    return {
      type: GET_BOOKINGS_FAILED,
      payload: error,
    };
  }
}
