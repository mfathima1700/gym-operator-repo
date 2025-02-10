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

export default function ResetPasswordForm({ action, passwordData,  handleChange }: { action: any, passwordData: any,  handleChange: any }) {
  const { pending } = useFormStatus();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter a new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" >
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
             
            </div>
            <Input id="password" type="password" required name="password"  minLength={8} value={passwordData.password}
                onChange={handleChange}/>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm password</Label>
              
            </div>
            <Input id="passwordTwo" type="password" required name="passwordTwo"  minLength={8} value={passwordData.passwordTwo}
                onChange={handleChange}/>
          </div>
          <Button type="submit" className="w-full"  disabled={pending} onClick={action}>
     
            Reset Password
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
