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

  export async function getUserById(id:string){
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
  }catch(error){
    console.error("Error fetching user:", error);
      throw error;
  }}