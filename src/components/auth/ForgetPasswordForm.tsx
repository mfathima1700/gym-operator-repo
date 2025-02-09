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

export default function ForgetPasswordForm({ action,  emailData, setEmailData }: { action: any, emailData: any, setEmailData: any }) {
  const { pending } = useFormStatus();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email so we can send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              name="email"
              value={emailData}
              onChange={(e) => setEmailData(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full"  disabled={pending} onClick={action}>
     
           Send
          </Button>
         
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline" >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
