import React, { useState } from "react";
import styles from "./Rezultatele.module.css";

function Rezultatele({ nume, scor, totalIntrebari, rezultate }) {
  const scoruriSalvate = JSON.parse(
    localStorage.getItem("scoruriQuiz") || "[]"
  ).sort((a, b) => b.scor - a.scor);

  const [detaliiVizibile, setDetaliiVizibile] = useState({});

  const incepeDinNou = () => {
    window.location.href = "/";
  };

  const Detalii = (index) => {
    setDetaliiVizibile((prevState) => ({
      ...prevState,
      [index]: prevState[index] ? null : true,
    }));
  };
  const stergeScorurile = () => {
    localStorage.removeItem("scoruriQuiz");
    window.location.reload();
  };

  return (
    <div className={styles.scorContainer}>
      <h2>
        {nume} - {scor} / {totalIntrebari} răspunsuri corecte
      </h2>

      <h3>Rezultate detaliate:</h3>
      <ul className={styles.rezultateLista}>
        {rezultate.map((rez, index) => (
          <li
            key={index}
            className={rez.corect ? styles.corect : styles.gresit}
          >
            <strong>{rez.intrebare}</strong>
            <br />
            Răspuns dat: <em>{rez.raspunsDat || "Niciunul"}</em>
            <br />
            Răspuns corect: <em>{rez.raspunsCorect}</em>
          </li>
        ))}
      </ul>

      <h3>Clasament utilizatori:</h3>
      <ul className={styles.clasamentLista}>
        {scoruriSalvate.map((s, i) => (
          <li key={i} className={styles.clasamentItem}>
            <h2>
              {s.nume} - {s.scor} puncte
            </h2>
            <button onClick={() => Detalii(i)} className={styles.detaliiButon}>
              Detalii
            </button>
            {detaliiVizibile[i] && (
              <div className={styles.detaliiRaspunsuri}>
                <h4>Detalii scoruri:</h4>
                <ul className={styles.rezultateLista}>
                  {s.rezultate.map((rez, index) => (
                    <li
                      key={index}
                      className={rez.corect ? styles.corect : styles.gresit}
                    >
                      <strong>{rez.intrebare}</strong>
                      <br />
                      Răspuns dat: <em>{rez.raspunsDat || "Niciunul"}</em>
                      <br />
                      Răspuns corect: <em>{rez.raspunsCorect}</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      <button onClick={incepeDinNou} className={styles.incepeDinNou}>
        Începe din nou quizul
      </button>

      <button onClick={stergeScorurile} className={styles.stergeScoruri}>
        Șterge scorurile salvate
      </button>
    </div>
  );
}

export default Rezultatele;
