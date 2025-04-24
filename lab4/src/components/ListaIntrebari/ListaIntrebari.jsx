import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import lista from "../../data/intrebari.json";
import styles from "./ListaIntrebari.module.css";
import Rezultatele from "../Rezultatele/Rezultatele";

const ListaIntrebari = React.memo(
  ({ nume, ordineaIntrebarilor, timpLimitat }) => {
    const [indexCurent, setIndexCurent] = useState(0);
    const [timpRamas, setTimpRamas] = useState(
      timpLimitat === "nelimitat" ? null : parseInt(timpLimitat)
    );
    const [raspunsDat, setRaspunsDat] = useState("");
    const [quizTerminat, setQuizTerminat] = useState(false);
    const [rezultate, setRezultate] = useState([]);
    const [blocat, setBlocat] = useState(false);
    const intervalRef = useRef(null);

    const intrebariProcesate = useMemo(() => {
      return ordineaIntrebarilor === "da"
        ? [...lista].sort(() => Math.random() - 0.5)
        : [...lista];
    }, [ordineaIntrebarilor]);

    const intrebareCurenta = useMemo(() => {
      return intrebariProcesate[indexCurent];
    }, [intrebariProcesate, indexCurent]);

    const salveazaInLocalStorage = useCallback((nume, scor, rezultate) => {
      const scoruriSalvate = JSON.parse(
        localStorage.getItem("scoruriQuiz") || "[]"
      );
      let existaDeja = false;
      for (let i = 0; i < scoruriSalvate.length; i++) {
        if (
          scoruriSalvate[i].nume === nume &&
          JSON.stringify(scoruriSalvate[i].rezultate) ===
            JSON.stringify(rezultate)
        ) {
          existaDeja = true;
          break;
        }
      }

      if (!existaDeja) {
        scoruriSalvate.push({ nume, scor, rezultate });
        localStorage.setItem("scoruriQuiz", JSON.stringify(scoruriSalvate));
      }
    }, []);

    const verificaRaspuns = useCallback(() => {
      if (blocat || !intrebariProcesate.length) return;
      setBlocat(true);

      const esteCorect = raspunsDat === intrebareCurenta.raspuns_corect;
      const newRezultate = [
        ...rezultate,
        {
          intrebare: intrebareCurenta.intrebare,
          raspunsCorect: intrebareCurenta.raspuns_corect,
          raspunsDat,
          corect: esteCorect,
        },
      ];

      const urmatorulIndex = indexCurent + 1;

      if (urmatorulIndex < intrebariProcesate.length) {
        setRezultate(newRezultate);
        setRaspunsDat("");
        setIndexCurent(urmatorulIndex);
        setBlocat(false);
        setTimpRamas(
          timpLimitat === "nelimitat" ? null : parseInt(timpLimitat)
        );
      } else {
        setRezultate(newRezultate);
        setQuizTerminat(true);
        clearInterval(intervalRef.current);
        salveazaInLocalStorage(
          nume,
          newRezultate.filter((r) => r.corect).length,
          newRezultate
        );
      }
    }, [
      indexCurent,
      raspunsDat,
      rezultate,
      timpLimitat,
      nume,
      blocat,
      salveazaInLocalStorage,
      intrebareCurenta,
      intrebariProcesate,
    ]);

    useEffect(() => {
      if (timpRamas !== null && !quizTerminat) {
        intervalRef.current = setInterval(() => {
          setTimpRamas((prev) => {
            if (prev > 1) return prev - 1;
            verificaRaspuns();
            return parseInt(timpLimitat);
          });
        }, 1000);
      }
      return () => clearInterval(intervalRef.current);
    }, [timpRamas, quizTerminat, verificaRaspuns, timpLimitat]);

    return quizTerminat ? (
      <Rezultatele
        nume={nume}
        scor={rezultate.filter((r) => r.corect).length}
        totalIntrebari={intrebariProcesate.length}
        rezultate={rezultate}
      />
    ) : (
      <div className={styles.quizContainer}>
        <div className={styles.intrebareContainer}>
          <div className={styles.intrebareFlexContainer}>
            <img
              src={intrebareCurenta?.url}
              alt="Imagine întrebare"
              className={styles.intrebareImage}
            />
            <div className={styles.continutDreapta}>
              <h3 className={styles.intrebareText}>
                {intrebareCurenta?.intrebare}
              </h3>
              <div className={styles.intrebareInfo}>
                <p className={styles.categorie}>
                  <strong>Categorie: </strong> {intrebareCurenta?.categorie}
                </p>
                <p className={styles.categorie}>
                  <strong>Dificultate: </strong> {intrebareCurenta?.dificultate}
                </p>
              </div>

              <div className={styles.raspunsuriContainer}>
                {intrebareCurenta?.raspunsuri.map((raspuns, index) => (
                  <label
                    key={`${indexCurent}-${index}`}
                    className={styles.raspunsLabel}
                  >
                    <input
                      type="radio"
                      name="raspuns"
                      value={raspuns}
                      checked={raspunsDat === raspuns}
                      onChange={(e) => setRaspunsDat(e.target.value)}
                      className={styles.raspunsInput}
                    />
                    {raspuns}
                  </label>
                ))}
              </div>

              {timpLimitat !== "nelimitat" && (
                <div className={styles.timpLimitat}>
                  <p>
                    <strong>Timp rămas: {timpRamas} secunde</strong>
                  </p>
                </div>
              )}

              <button
                onClick={verificaRaspuns}
                className={styles.nextButton}
                disabled={!raspunsDat || blocat}
              >
                Următoarea întrebare
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ListaIntrebari;
