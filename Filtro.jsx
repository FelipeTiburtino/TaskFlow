const OPCOES = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "pendentes", rotulo: "Pendentes" },
  { valor: "concluidas", rotulo: "Concluídas" },
];

export function Filtro({ filtro, onChange }) {
  return (
    <div className="filtro" role="group" aria-label="Filtrar tarefas">
      {OPCOES.map((op) => (
        <button
          key={op.valor}
          type="button"
          className={filtro === op.valor ? "ativo" : ""}
          aria-pressed={filtro === op.valor}
          onClick={() => onChange(op.valor)}
        >
          {op.rotulo}
        </button>
      ))}
    </div>
  );
}
