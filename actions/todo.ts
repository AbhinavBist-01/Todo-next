"use server";

import { prisma } from "@/lib/db";

export async function createTodo(title: string) {
  try {
    const todo = await prisma.todo.create({
      data: { title },
    });
    return todo;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTodos() {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTodoById(id: string) {
  try {
    if (!id) return null;
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    return todo;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodoById(id: string) {
  try {
    if (!id) return null;
    const todo = await prisma.todo.delete({
      where: { id },
    });
    return todo;
  } catch (error) {
    console.log(error);
  }
}

export async function updateTodoById(id: string, title: string) {
  try {
    if (!id) return null;
    const todo = await prisma.todo.update({
      where: { id },
      data: { title },
    });
    return todo;
  } catch (error) {
    console.log(error);
  }
}
