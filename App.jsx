import { useState, useMemo, useCallback } from "react";
import { useTasks } from "./hooks/useTasks";             // Papel 3
import { useTheme } from "./hooks/useTheme";             // Papel 3
import { ThemeToggle } from "./components/ThemeToggle";  // Papel 3
import { Toast } from "./components/Toast";              // Papel 4
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Filtro } from "./components/Filtro";
import { Contador } from "./components/Contador";
import "./App.css";

export default function App() {
  const { tarefas, alternar, remover } = useTasks();
  const { tema } = useTheme();
  const [filtro, setFiltro] = useState("todas");
  const [mensagem, setMensagem] = useState("");

  // só recalcula quando tarefas ou filtro mudam
  const tarefasFiltradas = useMemo(() => {
    if (filtro === "pendentes") return tarefas.filter((t) => !t.concluida);
    if (filtro === "concluidas") return tarefas.filter((t) => t.concluida);
    return tarefas;
  }, [tarefas, filtro]);

  const pendentes = useMemo(
    () => tarefas.filter((t) => !t.concluida).length,
    [tarefas]
  );

  // função estável: o Toast pode usá-la em useEffect sem reiniciar o timer
  const fecharMensagem = useCallback(() => setMensagem(""), []);

  return (
    <div className={`app ${tema}`}>
      <header>
        <h1>TaskFlow</h1>
        <ThemeToggle />
      </header>

      <TaskForm onAdicionada={() => setMensagem("Tarefa adicionada!")} />
      <Filtro filtro={filtro} onChange={setFiltro} />
      <Contador pendentes={pendentes} total={tarefas.length} />
      <TaskList
        tarefas={tarefasFiltradas}
        onAlternar={alternar}
        onRemover={remover}
      />

      {mensagem && <Toast mensagem={mensagem} onFechar={fecharMensagem} />}
    </div>
  );
}
