"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { CircleDashed } from "lucide-react"

interface SubmitButtonProps {
  title: string
}

export default function SubmitButton({ title }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <div className="flex gap-2 items-center">
          <div>
            <CircleDashed className="w-4 h-4 animate-spin animate-infinite" />
          </div>
          <div>
            <p>Please wait...</p>
          </div>
        </div>
      ) : (
        <div>{title}</div>
      )}
    </Button>
  )
}
