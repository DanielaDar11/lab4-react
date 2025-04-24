import React from "react";
import { useState } from "react";
import styles from "./Tema.module.css";
import Logo from "../../assets/Logo.png";
import Principala from "../principala/Principala";

function Tema() {
  const [tema, setTema] = useState("light");

  function setareTema() {
    setTema(tema === "light" ? "dark" : "light");
  }

  return (
    <div
      className={`${styles.container} ${
        tema === "light" ? styles.containerLight : styles.containerDark
      }`}
    >
      <div
        className={`${styles.content} ${
          tema === "light" ? styles.Light : styles.Dark
        }`}
      >
        <img src={Logo} alt="Logo" />
        <button className={styles.tematica} onClick={setareTema}>
          {tema === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
      <Principala />
    </div>
  );
}

export default Tema;
