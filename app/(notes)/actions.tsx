"use server"

import { CreateNoteSchema } from "@/lib/schema"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function createNoteActions(prevState: any, formData: FormData) {
  console.log(formData)

  const result = CreateNoteSchema.safeParse({
    email_to: formData.get("email_to"),
    subject: formData.get("subject"),
    dispatch_date: formData.get("dispatch_date"),
    content: formData.get("content"),
  })

  if (!result.success) {
    console.log("error:", result)
    return
  }

  const data = result.data

  try {
    const supabase = createServerActionClient({ cookies })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user === null) return

    const result = await supabase.from("todos").insert({
      email_to: data.email_to,
      subject: data.subject,
      dispatch_date: data.dispatch_date,
      content: data.content,
      user_id: user.id,
    })

    console.log(result)

    if (result.error !== null) {
      console.log("error supabase:", result.error)
    }
  } catch (error) {
    console.log("catch error:", error)
  }
}
