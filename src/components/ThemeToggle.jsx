import { useTheme } from "../hooks/useTheme.js";

export function ThemeToggle() {
  const { tema, alternarTema } = useTheme();
  const temaSeguinte = tema === "claro" ? "escuro" : "claro";

  return (
    <button className="theme-button" onClick={alternarTema} type="button">
      Ativar tema {temaSeguinte}
    </button>
  );
}