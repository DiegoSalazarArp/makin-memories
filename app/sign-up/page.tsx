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
import SignUpForm from "@/components/auth/signup-form"

export default async function Page({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return <SignUpForm searchParams={searchParams} />
}
