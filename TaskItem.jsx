export function TaskItem({ tarefa, onAlternar, onRemover }) {
  return (
    <li className={`task-item ${tarefa.concluida ? "concluida" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => onAlternar(tarefa.id)}
        />
        <span className="texto">{tarefa.texto}</span>
      </label>
      <button
        type="button"
        className="remover"
        onClick={() => onRemover(tarefa.id)}
        aria-label={`Remover ${tarefa.texto}`}
      >
        Remover
      </button>
    </li>
  );
}
