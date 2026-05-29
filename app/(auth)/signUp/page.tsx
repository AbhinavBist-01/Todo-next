import { signUp } from "../../../action/auth";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  async function handleSignUp(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    await signUp(email, password);
    redirect("/todo");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={handleSignUp}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold">Sign up</h2>
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
          Create account
        </button>
      </form>
    </div>
  );
}
