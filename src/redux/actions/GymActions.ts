"use server";

import { db } from "@/db";
import {
  CREATE_GYM_FAILED,
  CREATE_GYM_SUCCESS,
  SET_USER_FAILED,
  SET_USER_SUCCESS,
} from "../constants/GymConstants";

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
  const gym = await db.gym.findUnique({
    where: { gymCode },
  });

  if (!gym) {
    throw new Error("Invalid gym code");
  }

  await db.user.update({
    where: { id: userId },
    data: {
      gym: {
        connect: { id: gym.id },
      },
    },
  });

  return { message: "Successfully joined gym!" };
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id }, // Look up user by email
      include: {
        gym: true, // Include gym details if needed
        memberships: true,
        // Include memberships if needed
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

interface createOwnerData {
  firstName: string;
  lastName: string;
  gymName: string;
  address: string;
}

export async function createGym(data: createOwnerData, id: string) {
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
      },
    });

    const gym = await db.gym.create({
      data: {
        name: data.gymName,
        address: data.address,
        ownerId: user.id, // Link gym to the owner
      },
    });

  console.log("CREATED GYM")

    return {
      type: CREATE_GYM_SUCCESS,
      payload: gym,
    };
  } catch (error) {
  console.log("FAILED TO CREATE GYM")
    console.error("Error updating user and gym:", error);
    return {
      type: CREATE_GYM_FAILED,
      payload: error,
    };
  }
}

interface createUserData {
  firstName: string;
  lastName: string;
  dob: Date;
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
        dateOfBirth: data.dob,
      },
    });

    console.log("UPDATED USER")
    return {
      type: SET_USER_SUCCESS,
      payload: updatedUser,
    };
  } catch (error) {
    console.log("FAILED TO UPDATE USER")
    return {
      type: SET_USER_FAILED,
      payload: error,
    };
  }
}

export async function updateUserSettings(data: createUserData, id: string) {
  try {


  }catch (error) {}
}

export async function updateOwnerSettings(data: createUserData, id: string) {
  try {


  }catch (error) {}
}