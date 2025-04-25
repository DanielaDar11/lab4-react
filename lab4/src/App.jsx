import Tema from "./components/Tema/Tema";
import ThemeContext from "./context/ThemeContext";
import { useState } from "react";
function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Tema />
    </ThemeContext.Provider>
  );
}

export default App;
