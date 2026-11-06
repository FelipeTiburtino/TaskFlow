import { TaskItem } from "./TaskItem";

export function TaskList({ tarefas, onAlternar, onRemover }) {
  if (tarefas.length === 0) {
    return <p className="vazio">Nenhuma tarefa por aqui.</p>;
  }

  return (
    <ul className="task-list">
      {tarefas.map((tarefa) => (
        <TaskItem
          key={tarefa.id}               // sem key aparece aviso no console
          tarefa={tarefa}
          onAlternar={onAlternar}
          onRemover={onRemover}
        />
      ))}
    </ul>
  );
}
