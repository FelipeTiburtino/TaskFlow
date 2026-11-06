import { useCallback, useMemo, useReducer } from "react";
import { TasksContext } from "./TasksContext.jsx";

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), texto: action.texto, concluida: false }];
    case "TOGGLE":
      return state.map((tarefa) =>
        tarefa.id === action.id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      );
    case "REMOVE":
      return state.filter((tarefa) => tarefa.id !== action.id);
    default:
      return state;
  }
}

export function TasksProvider({ children }) {
  const [tarefas, dispatch] = useReducer(tasksReducer, []);
  const adicionar = useCallback((texto) => dispatch({ type: "ADD", texto }), []);
  const alternar = useCallback((id) => dispatch({ type: "TOGGLE", id }), []);
  const remover = useCallback((id) => dispatch({ type: "REMOVE", id }), []);

  const value = useMemo(
    () => ({ tarefas, adicionar, alternar, remover }),
    [tarefas, adicionar, alternar, remover]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}