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

export default function LoginForm({ LoginAction, loginData, handleChange, handleGoogle }:
   { LoginAction: any, loginData: any, handleChange: any, handleGoogle:any }) {
  const { pending } = useFormStatus();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/forget-password" className="ml-auto inline-block text-sm underline" >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required name="password"  minLength={8} value={loginData.password}
                onChange={handleChange}/>
          </div>
          <Button type="submit" className="w-full"  disabled={pending} onClick={LoginAction}>
     
            {pending ? "Loading..." : "Sign in"}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            Login with Google
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
