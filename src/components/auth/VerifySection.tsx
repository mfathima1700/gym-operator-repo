import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  } from "@/redux/actions/AuthActions";
import { useFormStatus } from "react-dom";

export default function LoginForm({ action }: { action: any,}) {
  const { pending } = useFormStatus();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl mx-auto">Email Verified</CardTitle>
        <CardDescription className="text-center">
          Your email has been verified. You can now login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" >
         
          
          <Button type="submit" className="w-full"  disabled={pending} onClick={action}>
     
            Login
          </Button>
          
        </form>
      </CardContent>
    </Card>
  );
}
