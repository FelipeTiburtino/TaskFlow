// USO TEMPORÁRIO: simula Papel 3 e 4 enquanto eles não entregam.
// Para testar, nos imports do App.jsx e TaskForm.jsx aponte para este arquivo.
// Na integração, apague este arquivo e volte os imports originais.
import { useState } from "react";

let proximoId = 4;
const exemplo = [
  { id: 1, texto: "Estudar hooks", concluida: false },
  { id: 2, texto: "Montar o formulário", concluida: true },
  { id: 3, texto: "Ensaiar a apresentação", concluida: false },
];

// Estado compartilhado simples para o provisório
let tarefasGlobais = exemplo;
const ouvintes = new Set();
const publicar = (novas) => { tarefasGlobais = novas; ouvintes.forEach((f) => f()); };

export function useTasks() {
  const [, forcar] = useState(0);
  useState(() => { ouvintes.add(() => forcar((n) => n + 1)); });
  return {
    tarefas: tarefasGlobais,
    adicionar: (texto) => publicar([...tarefasGlobais, { id: proximoId++, texto, concluida: false }]),
    alternar: (id) => publicar(tarefasGlobais.map((t) => t.id === id ? { ...t, concluida: !t.concluida } : t)),
    remover: (id) => publicar(tarefasGlobais.filter((t) => t.id !== id)),
  };
}

export const useTheme = () => ({ tema: "claro", alternarTema: () => {} });
export const ThemeToggle = () => <button>Tema</button>;
export function Toast({ mensagem, onFechar }) {
  useState(() => { setTimeout(onFechar, 2500); });
  return <div role="status">{mensagem}</div>;
}
