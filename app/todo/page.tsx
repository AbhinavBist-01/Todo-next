(async function Page() {
  // Import server actions
  const { getAllTodos, createTodo, deleteTodoById, updateTodoById } =
    await import("../../actions/todo");
  const { revalidatePath } = await import("next/cache");

  const todos = await getAllTodos();

  async function handleCreate(formData: FormData) {
    "use server";
    const title = String(formData.get("title") ?? "");
    await createTodo(title);
    revalidatePath("/todo");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    await deleteTodoById(id);
    revalidatePath("/todo");
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    const title = String(formData.get("title") ?? "");
    await updateTodoById(id, title);
    revalidatePath("/todo");
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-4">Todos</h1>

      <form action={handleCreate} className="flex gap-2 mb-6">
        <input
          name="title"
          placeholder="New todo"
          className="input flex-1"
          required
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {todos.map((t: any) => (
          <li key={t.id} className="flex items-center gap-2">
            <form action={handleUpdate} className="flex gap-2 flex-1">
              <input name="id" type="hidden" value={t.id} />
              <input
                name="title"
                defaultValue={t.title}
                className="input flex-1"
              />
              <button type="submit" className="btn">
                Save
              </button>
            </form>
            <form action={handleDelete}>
              <input name="id" type="hidden" value={t.id} />
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
})();
