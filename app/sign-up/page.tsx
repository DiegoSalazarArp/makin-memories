import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { singUp } from "../auth/actions"
import { AuthGithubServer } from "@/components/auth/github-button-server"

export default async function Page({
  searchParams,
}: {
  searchParams: { message: string }
}) {
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
          <form action="">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input name="name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">User name</Label>
                  <Input name="username" placeholder="Robinson" required />
                </div>
              </div>
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
              <Button formAction={singUp} className="w-full">
                Create an account
              </Button>
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
