import { Button } from "../ui/button"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CreateNote() {
  return (
    <main className="animate-in flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center mb-10">
        <h1 className="text-lg font-semibold md:text-2xl">
          Create a note, whatever you want {":)"}
        </h1>
      </div>

      <div className="relative flex-col items-start gap-8 flex">
        <form className="grid w-full items-start gap-6">
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
              <Input id="subject" type="string" placeholder="e.g title" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="top-p">Date</Label>
              <Input id="dispatch_date" type="date" />
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
              <Button type="submit" variant={"outline"} className="w-full">
                Send
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  )
}
