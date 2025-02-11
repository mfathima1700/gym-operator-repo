 "use client";
 
 import CNLayout from "@/components/layout/cn-layout";
import IndividualForm from "@/components/settings/IndividualForm"
 
 function classNames(...classes: (string | false | undefined)[]): string {
   return classes.filter(Boolean).join(" ");
 }
 
 export default function IndividualSettings() {
   return (
     <>
       <CNLayout>
         <div >
          <IndividualForm />
           
         </div>
       </CNLayout>
     </>
   );
 }
 