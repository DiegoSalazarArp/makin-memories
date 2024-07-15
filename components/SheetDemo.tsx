import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { PencilRuler } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { cookies } from "next/headers"

type SheetDemoProps = {
  id: string
}

export async function SheetDemo({ id }: SheetDemoProps) {
  const supabase = createServerComponentClient({ cookies })

  const { data: user } = await supabase.auth.getUser()
  if (!user) {
    return null
  }

  const { data: post } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single()

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const formattedDispatchDate = formatDateForInput(post.dispatch_date)

  return (
    <form>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <PencilRuler className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Subject: {post.subject}</SheetTitle>
            <SheetDescription>
              Make changes to your post here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                value={post.content}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email to
              </Label>
              <Input id="email" value={post.email_to} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dispatch" className="text-right">
                Dispatch date
              </Label>
              <Input
                type="date"
                id="dispatch"
                value={formattedDispatchDate}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </form>
  )
}
