import { useContext } from "react";
import { TasksContext } from "../context/TasksContext.jsx";

export function useTasks() {
  const contexto = useContext(TasksContext);
  if (!contexto) {
    throw new Error("useTasks deve ser usado dentro de um TasksProvider");
  }
  return contexto;
}