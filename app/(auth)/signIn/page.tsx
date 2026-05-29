import { signIn } from "../../../action/auth";
import { redirect } from "next/navigation";

export default function SignInPage() {
  async function handleSignIn(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    await signIn(email, password);
    redirect("/todo");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={handleSignIn}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <input
          name="email"
          type="email"
          placeholder="email"
          className="input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="input"
          required
        />
        <button type="submit" className="btn">
          Sign in
        </button>
      </form>
    </div>
  );
}
