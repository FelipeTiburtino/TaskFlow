import { useReducer } from "react";
import { tasksReducer } from "../reducers/tasksReducer";

export function TesteReducer() {
  const [tarefas, dispatch] = useReducer(tasksReducer, []);

  function adicionar() {
    dispatch({ type: "ADD", texto: "Tarefa de teste" });
  }

  function alternarPrimeira() {
    if (tarefas.length === 0) {
      return;
    }
    dispatch({ type: "TOGGLE", id: tarefas[0].id });
  }

  function removerPrimeira() {
    if (tarefas.length === 0) {
      return;
    }
    dispatch({ type: "REMOVE", id: tarefas[0].id });
  }

  function carregarLista() {
    const listaFixa = [
      { id: 1, texto: "Veio do SET 1", concluida: false },
      { id: 2, texto: "Veio do SET 2", concluida: true },
    ];
    dispatch({ type: "SET", tarefas: listaFixa });
  }

  function acaoInvalida() {
    dispatch({ type: "XYZ" });
  }

  return (
    <div>
      <button onClick={adicionar}>ADD</button>
      <button onClick={alternarPrimeira}>TOGGLE (primeira)</button>
      <button onClick={removerPrimeira}>REMOVE (primeira)</button>
      <button onClick={carregarLista}>SET</button>
      <button onClick={acaoInvalida}>Action inválida</button>

      <pre>{JSON.stringify(tarefas, null, 2)}</pre>
    </div>
  );
}