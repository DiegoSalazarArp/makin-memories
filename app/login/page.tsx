import LoginForm from "@/components/auth/login-form"

export default async function Page({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return <LoginForm searchParams={searchParams} />
}
