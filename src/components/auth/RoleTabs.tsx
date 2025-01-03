import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RoleTabs() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Gym Owner</TabsTrigger>
        <TabsTrigger value="password">Gym Member</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        
      </TabsContent>
      <TabsContent value="password"></TabsContent>
    </Tabs>
  );
}
