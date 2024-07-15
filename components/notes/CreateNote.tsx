"use client"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createNoteActions } from "@/app/(notes)/actions"
import { toast } from "sonner"
import SubmitButton from "../auth/submit-button"
import { useRef } from "react"

export default function CreateNote() {
  const formRef = useRef<HTMLFormElement>(null)

  async function ClientAction(formData: FormData) {
    const result = await createNoteActions(null, formData)
    if (result?.ok) {
      toast.success(result.ok)
      formRef.current?.reset()
    } else {
      toast.error(result?.error)
    }
  }

  return (
    <main className="animate-in flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center mb-10">
        <h1 className="text-lg font-semibold md:text-2xl">
          Create a note, whatever you want {":)"}
        </h1>
      </div>

      <div className="relative flex-col items-start gap-8 flex">
        <form
          ref={formRef}
          action={ClientAction}
          className="grid w-full items-start gap-6"
        >
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Note</legend>
            <div className="grid gap-3">
              <Label htmlFor="email_to">Destinatary</Label>
              <Input
                id="email_to"
                name="email_to"
                type="email"
                placeholder="john@doe.com"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">Subject</Label>
              <Input
                id="subject"
                name="subject"
                type="string"
                placeholder="e.g title"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="top-p">Date</Label>
              <Input id="dispatch_date" name="dispatch_date" type="date" />
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Your message
            </legend>

            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="You are a..."
                className="min-h-[9.5rem]"
              />
            </div>
            <div>
              <SubmitButton title="Send" />
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  )
}
