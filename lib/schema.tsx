import { z } from "zod"

export const FormDataSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const CreateNoteSchema = z.object({
  email_to: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(1, "Subject must be at least 1 character long"),
  dispatch_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  content: z.string().min(1, "Content must be at least 1 character long"),
})
