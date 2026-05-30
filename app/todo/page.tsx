import Link from "next/link";
import { revalidatePath } from "next/cache";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  updateTodoById,
} from "@/action/todo";

type Todo = {
  id: string;
  title: string;
};

async function addTodo(formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  await createTodo(title);
  revalidatePath("/todo");
}

async function editTodo(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!id || !title) return;

  await updateTodoById(id, title);
  revalidatePath("/todo");
}

async function removeTodo(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await deleteTodoById(id);
  revalidatePath("/todo");
}

export default async function TodoPage() {
  const todos = (await getAllTodos()) as Todo[];
  const totalTodos = todos.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">Todo Next</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-normal text-slate-950">
              Today&apos;s todos
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Keep the day focused with a short list you can update as plans
              change.
            </p>
          </div>
          <nav className="flex gap-3 text-sm font-medium">
            <Link
              className="rounded-md border border-slate-300 px-4 py-2"
              href="/signIn"
            >
              Sign in
            </Link>
            <Link
              className="rounded-md bg-slate-950 px-4 py-2 text-white"
              href="/signUp"
            >
              Sign up
            </Link>
          </nav>
        </header>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <form action={addTodo} className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="new-todo">
              New todo
            </label>
            <input
              id="new-todo"
              name="title"
              className="min-h-12 flex-1 rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              placeholder="Write the next task"
              required
            />
            <button
              className="min-h-12 rounded-md bg-emerald-700 px-5 font-semibold text-white transition hover:bg-emerald-800"
              type="submit"
            >
              Add todo
            </button>
          </form>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Tasks</h2>
            <p className="text-sm text-slate-500">
              {totalTodos} {totalTodos === 1 ? "item" : "items"}
            </p>
          </div>

          {todos.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {todos.map((todo) => (
                <li
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  key={todo.id}
                >
                  <div className="flex flex-col gap-3 lg:flex-row">
                    <form
                      action={editTodo}
                      className="flex flex-1 flex-col gap-3 sm:flex-row"
                    >
                      <input name="id" type="hidden" value={todo.id} />
                      <label className="sr-only" htmlFor={`todo-${todo.id}`}>
                        Todo title
                      </label>
                      <input
                        id={`todo-${todo.id}`}
                        name="title"
                        className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                        defaultValue={todo.title}
                        required
                      />
                      <button
                        className="min-h-11 rounded-md border border-slate-300 px-4 font-medium text-slate-800 transition hover:bg-slate-100"
                        type="submit"
                      >
                        Save
                      </button>
                    </form>

                    <form action={removeTodo}>
                      <input name="id" type="hidden" value={todo.id} />
                      <button
                        className="min-h-11 w-full rounded-md border border-red-200 px-4 font-medium text-red-700 transition hover:bg-red-50 lg:w-auto"
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No todos yet
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add the first task above and start shaping the list.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
