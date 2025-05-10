"use client";
import ApiCalendar from "react-google-calendar-api";
import { ADD_EVENT_FAILED, ADD_EVENT_SUCCESS, SYNC_EVENT_FAILED, SYNC_EVENT_SUCCESS, UPDATE_EVENT_FAILED, UPDATE_EVENT_SUCCESS } from "../constants/CalendarConstants";
import { loadGoogleAPI } from "@/lib/googleApi";
import { useState } from "react";

const config = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);

type ClassType = {
  id: string;
  name: string;
  description?: string;
  gymId: string;
  capacity?: number;
  intensity?: "LOW" | "MODERATE" | "INTENSE" | "EXTREME"; // Adjust based on IntensityRating enum
  skillLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; // Adjust based on SkillLevel enum
  instructorId?: string;
  recurrence?: "ONCE" | "WEEKLY" | "BIWEEKLY"; // Adjust based on Occurrence enum
  duration: number; // In minutes
  days: string[]; // ["Monday", "Wednesday", ...]
  room?: string;
  startDate: Date;
  endDate: Date;
  time: string; // e.g., "10:00"
  colour: string;
  cancelledDates: string[];
};

type Lesson = ClassType & {
  classId: string;
  lessonStartDate: Date;
  lessonEndDate: Date;
  gymClass: ClassType;
};

export async function addClasses(classes: Lesson[]) {
  try {

   // await loadGoogleAPI();
    
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!apiCalendar.sign) {
      // User not signed in, trigger sign-in
      const result = await apiCalendar.handleAuthClick();
      console.log(result);
    } else {
      // User is already signed in
      console.log("User is already signed in");
    }

    for (let i = 0; i < classes.length; i++) {
      const gymClassEvent = {
        summary: classes[i].name,
        location: classes[i].room,
        description: classes[i].description,
        start: {
          dateTime: classes[i].lessonStartDate.toISOString(),
          timeZone: timeZone,
        },
        end: {
          dateTime: classes[i].lessonEndDate.toISOString(),
          timeZone: timeZone,
        },
      };

      

     const res = await apiCalendar.createEvent(gymClassEvent, "primary");
     console.log(res);
     console.log(`${classes[i].name}` + " synced");
    }

       return {
            type: ADD_EVENT_SUCCESS,
           
          };
    
  } catch (error) {
    console.log(error);

    return {
      type: ADD_EVENT_FAILED,
     
    };
  }
}

export async function updateClass(gymClass: Lesson, id: string) {
  try {

   // await loadGoogleAPI();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const gymClassEvent = {
      summary: gymClass.name,
      location: gymClass.room,
      description: gymClass.description,
      start: {
        dateTime: gymClass.lessonStartDate.toISOString(),
        timeZone: timeZone,
      },
      end: {
        dateTime: gymClass.lessonEndDate.toISOString(),
        timeZone: timeZone,
      },
    };

    const res = await apiCalendar.updateEvent(gymClassEvent, id as string);

    return {
      type: UPDATE_EVENT_SUCCESS,
     
    };
  } catch (error) {
    return {
      type: UPDATE_EVENT_FAILED,
     
    };
  }
}

export async function deleteClass(id: string) {
  try {
    const res = await apiCalendar.deleteEvent(id);


  } catch (error) {}
}

// do I need to get all events, if they exist then update or delete?
// if not the create?
// is this how you sync?

// do i need to add googleCalendarID to the class for the prisma schema?

// booking not gym class
export async function syncClasses(gymClasses: Lesson[]) {
  try {

    if (!apiCalendar.sign) {
      // User not signed in, trigger sign-in
      apiCalendar.handleAuthClick();
    } else {
      // User is already signed in
      console.log("User is already signed in");
    }

    const eventsResponse = await apiCalendar.listUpcomingEvents(50);

    console.log(eventsResponse);
    const googleEvents = eventsResponse.result.items || [];

    const googleEventsMap = new Map<string, any>();
    googleEvents.forEach((event: any) => {
      if (event.id) {
        googleEventsMap.set(event.id, event);
      }
    });

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Loop through each local gym class.
    for (const gymClass of gymClasses) {
      // Build an event object from your gym class data.
      const gymClassEvent = {
        id: gymClass.id,
        summary: gymClass.name,
        location: gymClass.room,
        description: gymClass.description,
        start: {
          dateTime: gymClass.lessonStartDate.toISOString(),
          timeZone: timeZone,
        },
        end: {
          dateTime: gymClass.lessonEndDate.toISOString(),
          timeZone: timeZone,
        },
      };

      if (gymClass.id && googleEventsMap.has(gymClass.id)) {
        // If the event exists in Google Calendar, update it.
        await apiCalendar.updateEvent(gymClassEvent, gymClass.id as string);
        // Remove the processed event from the map.
        googleEventsMap.delete(gymClass.id);
      } else {
        // Otherwise, create a new event.
        const createResponse = await apiCalendar.createEvent(gymClassEvent);
        // Save the new event ID back to your gym class (you might update your database here).
        gymClass.id = createResponse.id;
      }
    }

    for (const [eventId] of googleEventsMap) {
      await apiCalendar.deleteEvent(eventId);
    }


    return {
      type: SYNC_EVENT_SUCCESS,
     
    };

  } catch (error) {
    console.log(error);

    return {
      type: SYNC_EVENT_FAILED,
     
    };
  }
}
