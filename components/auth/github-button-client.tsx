"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export function AuthGithubButton() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    })

    router.push("/dashboard")
  }

  return (
    <header className="w-full">
      <Button className="w-full" onClick={handleSignGithub}>
        Sign up with Github
      </Button>
    </header>
  )
}
