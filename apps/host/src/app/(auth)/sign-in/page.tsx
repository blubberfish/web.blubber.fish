import { LoginWithGitHub, LoginWithGoogle } from "@/components/auth/login";

export default function Page() {
  return (
    <div>
      <LoginWithGitHub />
      <LoginWithGoogle />
    </div>
  );
}
