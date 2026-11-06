export function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), texto: action.texto, concluida: false },
      ];

    case "TOGGLE":
      return state.map((tarefa) =>
        tarefa.id === action.id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      );

    case "REMOVE":
      return state.filter((tarefa) => tarefa.id !== action.id);

    case "SET":
      return action.tarefas;

    default:
      return state;
  }
}