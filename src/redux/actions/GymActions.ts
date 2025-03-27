"use server";

import { db } from "@/db";
import {
  CREATE_GYM_FAILED,
  CREATE_GYM_SUCCESS,
  GET_GYM_DATA_FAILED,
  GET_GYM_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  SET_USER_FAILED,
  SET_USER_SUCCESS,
  UPDATE_OWNER_SETTINGS_FAILED,
  UPDATE_OWNER_SETTINGS_SUCCESS,
  UPDATE_USER_SETTINGS_FAILED,
  UPDATE_USER_SETTINGS_SUCCESS,
} from "../constants/GymConstants";
import { ObjectId } from "mongodb";
import { GymRole } from "@prisma/client";

/*
export async function createGym(
  name: string,
  address: string,
  ownerId: string
) {
  return await db.gym.create({
    data: {
      name,
      address,
      ownerId,
      gymCode: crypto.randomUUID(), // Generate a unique join code
    },
  });
}*/

async function joinGym(userId: string, gymCode: string) {
  try {
    const gym = await db.gym.findUnique({
      where: { gymCode },
    });

    if (!gym) {
      throw new Error("Invalid gym code");
    }

    //const objectId = new ObjectId(userId);

    await db.user.update({
      where: { id: userId }, //objectId.toString() },
      data: {
        gym: {
          connect: { id: gym.id },
        },
      },
    });

    return { message: "Successfully joined gym!" };
  } catch (error) {
    console.log("FAILED TO JOIN GYM");
    console.log(error);
    return { message: "Failed to join gym!" };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id }, // Look up user by email
      include: {
        goals: true,
        gym: {
          include: {
            classes: true, // ater this based on date time so only the ones now are fetched -> long wait times
          },
        }, // Include gym details if needed
        memberships: true,
        // Include memberships if needed
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //console.log(user);

    console.log("USER DATA SUCCESS");

    return {
      type: GET_USER_DATA_SUCCESS,
      payload: user,
    };
  } catch (error) {
    console.log("FAILED TO GET USER DATA");
    console.log(error);
    return {
      type: GET_USER_DATA_FAILED,
      payload: error,
    };
  }
}

interface createOwnerData {
  firstName: string;
  lastName: string;
  gymName: string;
  description: string;
  //address: string;
}

export async function createGym(data: createOwnerData, id: string) {
  try {
    //const objectId = new ObjectId(id);

    const user = await db.user.findUnique({
      where: { id: id }, //objectId.toString() },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //user.gymRole === GymRole.MEMBER ||
    if (user.gymRole === "MEMBER") {
      throw new Error("User not a gym owner");
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name: `${data.firstName} ${data.lastName}`,
      },
    });

    const gym = await db.gym.create({
      data: {
        name: data.gymName,
        description: data.description,
        //address: data.address,
        ownerId: updatedUser.id, // Link gym to the owner
      },
    });

    console.log("CREATED GYM");

    return {
      type: CREATE_GYM_SUCCESS,
      payload: gym,
    };
  } catch (error) {
    console.log("FAILED TO CREATE GYM");
    console.log("Error updating user and gym:", error);
    return {
      type: CREATE_GYM_FAILED,
      payload: error,
    };
  }
}

interface createUserData {
  firstName: string;
  lastName: string;
  //dob: Date;
}

export async function updateUser(data: createUserData, id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name: `${data.firstName} ${data.lastName}`,
        //dateOfBirth: data.dob,
      },
    });

    console.log("UPDATED USER");
    return {
      type: SET_USER_SUCCESS,
      payload: updatedUser,
    };
  } catch (error) {
    console.log("FAILED TO UPDATE USER");
    return {
      type: SET_USER_FAILED,
      payload: error,
    };
  }
}

interface userSettingsData {
  name: string;
  // dob: Date;
  phoneNumber?: string;
  country?: string;
  image?: any;
  emailNotifications?: string;
  pushNotifications?: string;
}

export async function updateUserSettings(data: userSettingsData, id: string) {
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
        name: data.name,
        //dateOfBirth: data.dob,
        phoneNumber: data.phoneNumber,
        country: data.country,
        image: data.image,
        emailNotifications: data.emailNotifications,
        pushNotifications: data.pushNotifications,
        updatedAt: new Date(), // Ensure `updatedAt` updates automatically
      },
    });

    console.log("UPDATE MEMBER SUCCESS");
    return {
      type: UPDATE_USER_SETTINGS_SUCCESS,
      payload: updatedUser,
    };
  } catch (error) {
    console.log("UPDATE USER FAILED");
    console.log(error);
    return {
      type: UPDATE_USER_SETTINGS_FAILED,
      payload: error,
    };
  }
}

interface ownerSettingsData {
  name: string;
  // dob: Date;
  phoneNumber?: string;
  country?: string;
  image?: any;
  emailNotifications?: string;
  pushNotifications?: string;
}

interface gymSettingsData {
  country?: string;
  city?: string;
  postcode?: string;
  streetAddress?: string;
  state?: string;
  description?: string;
  gymName?: string;
  logo?: any;
  gymCode?: string;
}

export async function updateOwnerSettings(
  data: ownerSettingsData,
  gymData: gymSettingsData,
  id: string
) {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const imageBuffer  = Buffer.from(new Uint8Array(await data.image.arrayBuffer())); 
    const logoBuffer  = Buffer.from(new Uint8Array(await gymData.logo.arrayBuffer()));
    
    // Update the User
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        //dateOfBirth: data.dob,
        phoneNumber: data.phoneNumber,
        image: imageBuffer,
        emailNotifications: data.emailNotifications,
        pushNotifications: data.pushNotifications,
        updatedAt: new Date(),
      },
    });

    // Find the Gym associated with this User
    const gym = await db.gym.findUnique({
      where: { ownerId: updatedUser.id },
    });

    // If the Gym exists, update its details
    if (gym) {
      await db.gym.update({
        where: { ownerId: id },
        data: {
          name: gymData.gymName,
          country: gymData.country,
          gymCode:gymData.gymCode,
          city: gymData.city,
          postcode: gymData.postcode,
          streetAddress: gymData.streetAddress,
          state: gymData.state,
          description: gymData.description,
          logo: logoBuffer,
        },
      });
    }

    console.log("UPDATE GYM SUCCESS");
    return {
      type: UPDATE_OWNER_SETTINGS_SUCCESS,
      payload: updatedUser,
    };
  } catch (error) {
    console.log("UPDATE OWNER FAILED");

    if (error !== null) {
      console.log(error);
    }
    return {
      type: UPDATE_OWNER_SETTINGS_FAILED,
      payload: error,
    };
  }
}

export async function convertUserToInstructor(userId: string, gymId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //await db.instructor.create({data: {userId: userId,gymId: gymId,},});
  } catch (error) {}
}

export async function deleteOwner(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //await db.instructor.create({ data: { userId, gymId } });
  } catch (error) {}
}

export async function deleteMember(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //await db.instructor.create({ data: { userId, gymId } });
  } catch (error) {}
}

export async function deleteGym(gymId: string) {
  try {
    const gym = await db.gym.findUnique({
      where: { id: gymId },
    });

    if (!gym) {
      throw new Error("Gym not found");
    }

    //await db.instructor.create({ data: { userId, gymId } });
  } catch (error) {}
}
