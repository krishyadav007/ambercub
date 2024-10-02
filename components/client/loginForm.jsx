"use client"
import React from 'react'
// import { useRouter } from "@/next/navigation";
import loginHandler from "@/actions/login"
import { toast } from 'sonner'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { signIn } from "@/auth"
import { useSession } from "next-auth/react";


const LoginForm = () => {
    const router = useRouter()

    const { data: session, status } = useSession();
    if (session) {
        router.push("/");
    }
    return (
        <form action={async (FormData) => {
            const email = FormData.get("email");
            const password = FormData.get("password");

            const error = await loginHandler(FormData);

            if (!error) {
                toast.error("Login successful");
                router.refresh()
                window.location.reload();
            } else {
                toast.error(error);
            }
        }}>
            <Card>
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input id="signin-email" name="email" type="email" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input id="signin-password" name="password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full bg-cream-3" type="submit">Log In</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default LoginForm