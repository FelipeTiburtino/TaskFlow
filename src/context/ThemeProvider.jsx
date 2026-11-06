import { useCallback, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");
  const alternarTema = useCallback(() => {
    setTema((atual) => (atual === "claro" ? "escuro" : "claro"));
  }, []);
  const value = useMemo(() => ({ tema, alternarTema }), [tema, alternarTema]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`tema-raiz ${tema}`}>{children}</div>
    </ThemeContext.Provider>
  );
}