"use server"
import { FormDataSchema } from "@/lib/schema"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Logs in a user with the provided form data.
 * @param formData - The form data containing the user's email and password.
 */
export async function login(state: any, formData: FormData) {
  const result = FormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!result.success) {
    return { message: "Invalid form data", status: 400 }
  }

  const data = result.data

  const supabase = createServerActionClient({ cookies })

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    // fix here
    redirect("/error")
  }

  return redirect("/dashboard")
}

/**
 * Signs up a user with the provided form data.
 * @param formData - The form data containing the user's email and password.
 */
export async function singUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createServerActionClient({ cookies })
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/sign-up?message=${error.message}`)
  }
  return redirect("/sign-up?message=Check email to continue sign in process")
}

/**
 * Signs out the user by calling the signOut method of the Supabase authentication client
 * and redirects the user to the "/loginServer" page.
 */
export async function signOut() {
  const supabase = createServerActionClient({ cookies })
  await supabase.auth.signOut()
  redirect("/login")
}
