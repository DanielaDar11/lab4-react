import React, { useState } from "react";
import styles from "./Rezultatele.module.css";
import { stergeScorurileSalvate } from "../../functii/salveazaLocalStorage";
function Rezultatele({ nume, scor, totalIntrebari, rezultate }) {
  const [detaliiVizibile, setDetaliiVizibile] = useState({});
  const toateScorurile = JSON.parse(
    localStorage.getItem("scoruriQuiz") || "[]"
  );

  const scoruriSalvate = {};

  toateScorurile.forEach((s) => {
    if (!scoruriSalvate[s.nume] || s.scor > scoruriSalvate[s.nume].scor) {
      scoruriSalvate[s.nume] = s;
    }
  });

  const scoruri = Object.values(scoruriSalvate).sort((a, b) => b.scor - a.scor);

  const incepeDinNou = () => {
    window.location.href = "/";
  };

  const detalii = (index) => {
    setDetaliiVizibile((prevState) => ({
      ...prevState,
      [index]: prevState[index] ? null : true,
    }));
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
        {scoruri.map((s, i) => (
          <li key={i} className={styles.clasamentItem}>
            <h2>
              {s.nume} - {s.scor} puncte
            </h2>
            <button onClick={() => detalii(i)} className={styles.detaliiButon}>
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

      <button onClick={stergeScorurileSalvate} className={styles.stergeScoruri}>
        Șterge scorurile salvate
      </button>
    </div>
  );
}

export default Rezultatele;
