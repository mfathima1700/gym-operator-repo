 "use client";
 
 import CNLayout from "@/components/layout/cn-layout";
import OwnerForm from "@/components/settings/OwnerForm"
 
 function classNames(...classes: (string | false | undefined)[]): string {
   return classes.filter(Boolean).join(" ");
 }
 
 export default function OwnerSettings() {
   return (
     <>
       <CNLayout>
         <div >
          <OwnerForm />
           
         </div>
       </CNLayout>
     </>
   );
 }
 