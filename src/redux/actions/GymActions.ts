import { db } from "@/db";

export async function createGym(name: string, address: string, ownerId: string) {
    return await db.gym.create({
      data: {
        name,
        address,
        ownerId,
        gymCode: crypto.randomUUID(), // Generate a unique join code
      },
    });
  }

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