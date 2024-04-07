"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "../ui/button"
import { useState } from "react"
import { CircleDashed } from "lucide-react"

type AuthGithubButtonProps = {
  title: string
}

export function AuthGithubButton({ title }: AuthGithubButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleSignGithub = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    })
  }

  return (
    <header className="w-full">
      <Button
        className="w-full"
        onClick={(e) => handleSignGithub(e)}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? (
          <div className="flex gap-2 justify-center items-center">
            <div>
              <CircleDashed className="animate-spin animate-infinite" />
            </div>
            <div>
              <p>Please wait...</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div>{title}</div>
          </div>
        )}
      </Button>
    </header>
  )
}
