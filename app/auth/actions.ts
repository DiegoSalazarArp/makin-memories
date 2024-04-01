"use server"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Logs in a user with the provided form data.
 * @param formData - The form data containing the user's email and password.
 */
export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const supabase = createServerActionClient({ cookies })
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/error")
  }
  redirect("/dashboard")
}

/**
 * Signs up a user with the provided form data.
 * @param formData - The form data containing the user's email and password.
 */
export async function singUp(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { email, password } = data

  const supabase = createServerActionClient({ cookies })
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/auth/callback`,
    },
  })

  if (error) {
    redirect(`/loginServer?message=${error.message}`)
  }
  redirect("/loginServer?message=Check email to continue sign in process")
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
