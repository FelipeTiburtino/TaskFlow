import { useState, useRef, useEffect } from "react";
import { useTasks } from "../hooks/useTasks"; // Papel 3

export function TaskForm({ onAdicionada }) {
  const { adicionar } = useTasks();
  const [texto, setTexto] = useState("");   // input controlado
  const inputRef = useRef(null);            // referência ao <input> real

  // foca o input quando o componente aparece pela primeira vez
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function enviar(e) {
    e.preventDefault();                     // 1. evita recarregar a página
    if (texto.trim() === "") return;        // 2. ignora texto vazio

    adicionar(texto.trim());                // 3. entrega ao reducer (via Papel 3)
    setTexto("");                           // 4. limpa o campo
    inputRef.current.focus();               // 5. devolve o foco
    onAdicionada();                         // 6. avisa o App (mostra o Toast)
  }

  return (
    <form className="task-form" onSubmit={enviar}>
      <input
        ref={inputRef}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nova tarefa..."
        aria-label="Nova tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
