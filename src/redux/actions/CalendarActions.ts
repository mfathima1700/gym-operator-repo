"use client";
import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
   apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);

interface classData {
    id: string,
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

export async function addClasses(classes: classData[]) {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    for (let i = 0; i < classes.length; i++) {

        const gymClassEvent = {
            summary: classes[i].name,
            location: classes[i].room,
            description: classes[i].description,
            start: {
              dateTime: classes[i].startDate.toISOString(),
              timeZone: timeZone,
            },
            end: {
              dateTime: classes[i].endDate.toISOString(),
              timeZone: timeZone,
            },
          };

          
          const res = await apiCalendar.createEvent(gymClassEvent)
            console.log(`${classes[i].name}` +" synced");
           
    }


  } catch (error) {
    console.log(error);

  }
}

export async function updateClass(gymClass: classData, id: string) {
    try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const gymClassEvent = {
            summary: gymClass.name,
            location: gymClass.room,
            description: gymClass.description,
            start: {
              dateTime: gymClass.startDate.toISOString(),
              timeZone: timeZone,
            },
            end: {
              dateTime: gymClass.endDate.toISOString(),
              timeZone: timeZone,
            },
          };

        const res = await apiCalendar.updateEvent(gymClassEvent, id as string, );

    }catch(error){}
}

export async function deleteClass(id: string) {
    try {

        const res = await apiCalendar.deleteEvent(id);

    }catch(error){}
}

// do I need to get all events, if they exist then update or delete? 
// if not the create? 
// is this how you sync? 

// do i need to add googleCalendarID to the class for the prisma schema? 

export async function syncClasses(gymClasses: classData[]) {
  try {

    const eventsResponse = await apiCalendar.listUpcomingEvents(50);
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
          dateTime: gymClass.startDate.toISOString(),
          timeZone: timeZone,
        },
        end: {
          dateTime: gymClass.endDate.toISOString(),
          timeZone: timeZone,
        },
      };

      if (gymClass.id && googleEventsMap.has(gymClass.id)) {
        // If the event exists in Google Calendar, update it.
        await apiCalendar.updateEvent(gymClassEvent, gymClass.id as string, );
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

  }catch(error){}}
