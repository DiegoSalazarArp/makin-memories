"use server";
import { FormDataSchema } from "@/lib/schema";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Logs in the user with the provided form data.
 *
 * @param prevState - The previous state of the application.
 * @param formData - The form data containing the user's email and password.
 * @returns A Promise that resolves to a redirect to the dashboard page.
 * @throws If there is an error during the login process.
 */
export async function login(prevState: any, formData: FormData) {
  const result = FormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    redirect("/login?message=" + result.error.errors[0].message);
  }

  const data = result.data;

  try {
    const supabase = createServerActionClient({ cookies });

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      redirect(`/login?message=${error.message}`);
    }

    return redirect("/dashboard");
  } catch (error) {
    throw error;
  }
}

/**
 * Signs up the user with the provided form data.
 *
 * @param prevState - The previous state of the application.
 * @param formData - The form data containing the user's email and password.
 * @returns A Promise that resolves to a redirect to the sign-up page.
 * @throws If there is an error during the sign-up process.
 */
export async function singUp(prevState: any, formData: FormData) {
  const result = FormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    redirect("/login?message=" + result.error.errors[0].message);
  }

  const data = result.data;

  try {
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    if (error) {
      return redirect(`/sign-up?message=${error.message}`);
    }
    return redirect("/sign-up?message=Check email to continue sign in process");
  } catch (error) {
    throw error;
  }
}

/**
 * Signs out the user by calling the signOut method of the Supabase authentication client
 * and redirects the user to the "/loginServer" page.
 */
export async function signOut() {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  redirect("/");
}
