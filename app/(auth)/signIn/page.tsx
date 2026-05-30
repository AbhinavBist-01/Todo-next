import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "@/action/auth";

async function handleSignIn(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return;

  const user = await signIn(email, password);
  if (user) {
    redirect("/todo");
  }
}

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium text-emerald-700">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Sign in
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Continue to your todos.
          </p>
        </div>

        <form action={handleSignIn} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Email
            <input
              name="email"
              type="email"
              className="min-h-11 rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Password
            <input
              name="password"
              type="password"
              className="min-h-11 rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              placeholder="Your password"
              required
            />
          </label>
          <button
            className="mt-2 min-h-11 rounded-md bg-emerald-700 px-4 font-semibold text-white transition hover:bg-emerald-800"
            type="submit"
          >
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Need an account?{" "}
          <Link className="font-semibold text-slate-950" href="/signUp">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
