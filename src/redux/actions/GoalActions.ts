"use server";

import { db } from "@/db";
import {
  CREATE_GOAL_FAILED,
  CREATE_GOAL_SUCCESS,
  DELETE_GOAL_FAILED,
  DELETE_GOAL_SUCCESS,
  EDIT_GOAL_FAILED,
  EDIT_GOAL_SUCCESS,
} from "../constants/GoalConstants";

interface goalData {
  title: string; // Class name
  notes: string; // Description of the class
  userId?: string; // Selected instructor
  targetDate: Date; // Start date
  completed: boolean;
}

export async function createGoal(data: goalData, userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("user not found");
    }

    const targetDateTime = new Date(data.targetDate);

    const newGoal = await db.goal.create({
      data: {
        title: data.title,
        ...(data.notes ? { notes: data.notes } : {}),
        userId: userId,
        completed: data.completed,
        targetDate: targetDateTime,
      },
    });

    console.log("GOAL CREATED SUCCESS");
    return {
      type: CREATE_GOAL_SUCCESS,
      payload: newGoal,
    };
  } catch (error) {
    console.log("CREATE GOAL FAILED");
    console.log(error);
    return {
      type: CREATE_GOAL_FAILED,
      payload: error,
    };
  }
}

export async function deleteClass(goalId: string) {
  try {
    const deletedGoal = await db.goal.delete({
      where: {
        id: goalId,
      },
    });

    console.log("DELETE GOAL SUCCESS");

    return {
      type: DELETE_GOAL_SUCCESS,
      payload: deletedGoal,
    };
  } catch (error) {
    console.log("DELETE GOAL FAILED");
    console.log(error);
    return {
      type: DELETE_GOAL_FAILED,
      payload: error,
    };
  }
}

export async function updateClass(data: goalData, goalId: string) {
  try {
    const goal = await db.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new Error("goal not found");
    }

    const targetDateTime = new Date(data.targetDate);

    const updatedGoal = await db.goal.update({
      where: { id: goalId },
      data: {
        title: data.title,
        ...(data.notes ? { description: data.notes } : {}),
        completed: data.completed,
        targetDate: targetDateTime,
      },
    });

    return {
      type: EDIT_GOAL_SUCCESS,
      payload: updatedGoal,
    };
  } catch (error) {
    console.log("UPDATE GOAL FAILED");
    console.log(error);
    return {
      type: EDIT_GOAL_FAILED,
      payload: error,
    };
  }
}
