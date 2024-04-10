"use server"

import { CreateNoteSchema } from "@/lib/schema"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function createNoteActions(prevState: any, formData: FormData) {
  // parse form data with schema
  const result = CreateNoteSchema.safeParse({
    email_to: formData.get("email_to"),
    subject: formData.get("subject"),
    dispatch_date: formData.get("dispatch_date"),
    content: formData.get("content"),
  })

  // form validation
  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => ` ${issue.message}`)
      .join(", ")

    return {
      ok: null,
      error: errors,
    }
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

    return result.error === null
      ? {
          ok: "Note created successfully",
          error: null,
        }
      : {
          ok: null,
          error: result.error.message,
        }
  } catch (e: any) {
    return {
      ok: null,
      error: e.toString(),
    }
  }
}
