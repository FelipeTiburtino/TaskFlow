import { useState } from "react";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { useTasks } from "./hooks/useTasks.js";
import "./App.css";

function App() {
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const { tarefas, adicionar, alternar, remover } = useTasks();

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  });

  function enviarTarefa(event) {
    event.preventDefault();
    const textoLimpo = texto.trim();
    if (!textoLimpo) return;
    adicionar(textoLimpo);
    setTexto("");
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#inicio" aria-label="Taskflow, início">
          <span className="wordmark-mark" aria-hidden="true">T</span>
          <span>taskflow</span>
        </a>
        <ThemeToggle />
      </header>

      <section className="workspace" id="inicio" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">SEU ESPAÇO DE FOCO</p>
          <h1 id="page-title">Tarefas do dia<span>.</span></h1>
          <p className="subtitle">Um passo de cada vez. O resto pode esperar.</p>
        </div>

        <form className="task-form" onSubmit={enviarTarefa}>
          <label className="visually-hidden" htmlFor="nova-tarefa">Nova tarefa</label>
          <input
            id="nova-tarefa"
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
            placeholder="O que precisa ser feito?"
            maxLength={160}
          />
          <button type="submit" disabled={!texto.trim()}>Adicionar tarefa</button>
        </form>

        <div className="list-toolbar">
          <div className="task-count" aria-live="polite">
            <strong>{tarefas.filter((tarefa) => !tarefa.concluida).length}</strong>
            <span>pendentes</span>
          </div>
          <div className="filters" role="group" aria-label="Filtrar tarefas">
            {[
              ["todas", "Todas"],
              ["pendentes", "Pendentes"],
              ["concluidas", "Concluídas"],
            ].map(([valor, rotulo]) => (
              <button
                className={filtro === valor ? "filter-button active" : "filter-button"}
                key={valor}
                onClick={() => setFiltro(valor)}
                type="button"
                aria-pressed={filtro === valor}
              >
                {rotulo}
              </button>
            ))}
          </div>
        </div>

        {tarefasVisiveis.length > 0 ? (
          <ul className="task-list">
            {tarefasVisiveis.map((tarefa) => (
              <li className={tarefa.concluida ? "task-item completed" : "task-item"} key={tarefa.id}>
                <button
                  className="task-check"
                  type="button"
                  onClick={() => alternar(tarefa.id)}
                  aria-label={tarefa.concluida ? `Reabrir: ${tarefa.texto}` : `Concluir: ${tarefa.texto}`}
                  aria-pressed={tarefa.concluida}
                >
                  {tarefa.concluida && <span aria-hidden="true">✓</span>}
                </button>
                <span className="task-text">{tarefa.texto}</span>
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => remover(tarefa.id)}
                  aria-label={`Remover: ${tarefa.texto}`}
                  title="Remover tarefa"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">✓</span>
            <p>{tarefas.length === 0 ? "Tudo começa com uma tarefa." : "Nenhuma tarefa neste filtro."}</p>
          </div>
        )}
      </section>
      <footer className="page-footer">Feito para manter o foco no que importa.</footer>
    </main>
  );
}

export default App;
