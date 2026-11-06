import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export function useTheme() {
  const contexto = useContext(ThemeContext);
  if (!contexto) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return contexto;
}