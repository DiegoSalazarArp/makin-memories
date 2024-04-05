import { AuthGithubButton } from "./github-button-client"

type AuthGithubButtonProps = {
  title: string
}

export async function AuthGithubServer({ title }: AuthGithubButtonProps) {
  return <AuthGithubButton title={title} />
}
