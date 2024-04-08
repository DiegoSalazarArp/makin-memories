"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { singUp } from "@/app/auth/actions"
import { AuthGithubServer } from "@/components/auth/github-button-server"
import SubmitButton from "./submit-button"
import { useFormState } from "react-dom"

export default function SignUpForm({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const [_, formAction] = useFormState(singUp, {})

  return (
    <div className="animate-in h-screen w-full grid place-content-center gap-5  ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4"></div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" />
              </div>
              <SubmitButton title="Create an account" />
            </div>
          </form>
          <div className="my-4">
            <AuthGithubServer title="Sign up with Github" />
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Go to login
            </Link>
          </div>
        </CardContent>
      </Card>
      {searchParams?.message && (
        <div className="bg-red-500 p-4 rounded-sm text-white mx-auto">
          <p>{searchParams.message}</p>
        </div>
      )}
    </div>
  )
}
