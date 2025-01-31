import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GymRole } from "@prisma/client";
import { use } from "react";


export default function RoleTabs({userData, setUserData}:{userData:any, setUserData:React.Dispatch<React.SetStateAction<any>>}) {

  function handleRoleChange(role: GymRole) {
    setUserData((prevState:any) => ({
      ...prevState,
      userRole: role,
    }));
  }
  
  return (
    <Tabs   defaultValue={userData.role ?? GymRole.MEMBER} value={userData.role} className="w-full" 
    onValueChange={(value) => handleRoleChange(value as GymRole)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger  value={GymRole.OWNER} >Gym Owner</TabsTrigger>
        <TabsTrigger value={GymRole.MEMBER}>Gym Member</TabsTrigger>
      </TabsList>
      <TabsContent value={GymRole.OWNER}>
        
      </TabsContent>
      <TabsContent value={GymRole.MEMBER}>

      </TabsContent>
    </Tabs>
  );
}
