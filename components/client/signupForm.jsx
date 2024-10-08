"use client"
import Swal from "sweetalert2";
import React from 'react'
import signup from "@/actions/signup"
import { toast } from 'sonner'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { signInWithGoogle } from './actions';


const SignupForm = ({ onSignupSuccess }) => {
    const router = useRouter()

    const { data: session, status } = useSession();
    if (session) {
        router.push("/");
    }
    const handleSubmit = async (formData) => {
        try {
            const result = await signup(formData);
            if (result.success) {
                Swal.fire({
                    title: "Registered successfully",
                    text: "Please login to access the account",
                    icon: "success"
                });
                onSignupSuccess();
            } else if (result.error) {
                Swal.fire({
                    title: "Registered fail",
                    text: result.error,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred");
        }
    };
    return (
        <>
            <form action={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up!!</CardTitle>
                        <CardDescription>
                            Create a new account here. Fill in your details and click sign up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="signup-name">Name</Label>
                            <Input id="signup-name" name="name" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" type="email" name="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input id="signup-password" type="password" name="password" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <Button className="w-full bg-cream-3">Sign Up</Button>
                    </CardFooter>
                </Card>
            </form >
            < form action={signInWithGoogle} >
                {/* <Button variant="outline" className="w-full" type="submit">
                    Sign In with Google
                </Button> */}
            </form >
        </>)
}

export default SignupForm