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

import { login } from "@/app/auth/actions"
import { useFormState } from "react-dom"
import { AuthGithubButton } from "./github-button-client"
import SubmitButton from "./submit-button"

export default function LoginForm({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const [_, formAction] = useFormState(login, null)

  return (
    <div className="animate-in h-screen w-full grid place-content-center gap-5  ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input name="password" type="password" required />
              </div>
              <SubmitButton title="Login" />
            </div>
          </form>
          <div className="my-4">
            <AuthGithubButton title="Enter with Github" />
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
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
