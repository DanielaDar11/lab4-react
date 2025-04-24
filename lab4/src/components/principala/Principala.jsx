import { useState } from "react";
import styles from "./principala.module.css";
import ListaIntrebari from "../ListaIntrebari/ListaIntrebari";
import Quiz from "../../assets/quiz.png";

function Principala() {
  const [nume, setNume] = useState("");
  const [ordineaIntrebarilor, setOrdinulIntrebarilor] = useState("nu");
  const [timpLimitat, setTimpLimitat] = useState("nelimitat");
  const [trimis, setTrimis] = useState(false);
  const [eroare, setEroare] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    if (nume.trim() === "") {
      setEroare("Numele este obligatoriu să fie introdus!");
      return;
    }
    setEroare("");
    setTrimis(true);
  }

  return !trimis ? (
    <div className={styles.quizContainer}>
      <div className={styles.quizImageContainer}>
        <img src={Quiz} alt="Quiz" className={styles.quizImage} />
      </div>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Nume:</label>
          <input
            type="text"
            id="nume"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
            placeholder="Introduceți numele"
          />
          <p className={styles.eroare}>{eroare}</p>
        </div>

        <div
          onChange={(e) => setOrdinulIntrebarilor(e.target.value)}
          className={styles.formGroup}
        >
          <label>Întrebări aleatoare:</label>
          <div className={styles.intrebari}>
            <label>
              <input
                type="radio"
                value="da"
                name="ordineIntrebare"
                onChange={(e) => setOrdinulIntrebarilor(e.target.value)}
              />
              Da
            </label>

            <label>
              <input
                type="radio"
                value="nu"
                name="ordineIntrebare"
                checked={ordineaIntrebarilor === "nu"}
                onChange={(e) => setOrdinulIntrebarilor(e.target.value)}
              />
              Nu
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="timpLimitat">Alegeți timpul per întrebare:</label>
          <select
            id="timpLimitat"
            value="da"
            checked={ordineaIntrebarilor === "da"}
            onChange={(e) => setTimpLimitat(e.target.value)}
          >
            <option value="nelimitat">Nelimitat</option>
            <option value="10">10 secunde</option>
            <option value="20">20 secunde</option>
          </select>
        </div>

        <button type="submit" className={styles.trimitere}>
          Trimite
        </button>
      </form>
    </div>
  ) : (
    <ListaIntrebari
      nume={nume}
      ordineaIntrebarilor={ordineaIntrebarilor}
      timpLimitat={timpLimitat}
    />
  );
}

export default Principala;
