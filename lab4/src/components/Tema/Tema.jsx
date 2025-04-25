import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import styles from "./Tema.module.css";
import Logo from "../../assets/Logo.png";
import Principala from "../principala/Principala";

function Tema() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.container} ${
        theme === "light" ? styles.containerLight : styles.containerDark
      }`}
    >
      <div
        className={`${styles.content} ${
          theme === "light" ? styles.Light : styles.Dark
        }`}
      >
        <img src={Logo} alt="Logo" />
        <button className={styles.tematica} onClick={toggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
      <Principala />
    </div>
  );
}

export default Tema;
