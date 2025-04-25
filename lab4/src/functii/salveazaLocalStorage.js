export function salveazaInLocalStorage(nume, scor, rezultate) {
  const scoruriSalvate = JSON.parse(
    localStorage.getItem("scoruriQuiz") || "[]"
  );

  let existaDeja = false;
  for (let i = 0; i < scoruriSalvate.length; i++) {
    if (
      scoruriSalvate[i].nume === nume &&
      JSON.stringify(scoruriSalvate[i].rezultate) === JSON.stringify(rezultate)
    ) {
      existaDeja = true;
      break;
    }
  }

  if (!existaDeja) {
    scoruriSalvate.push({ nume, scor, rezultate });
    localStorage.setItem("scoruriQuiz", JSON.stringify(scoruriSalvate));
  }
}

export const stergeScorurileSalvate = () => {
  localStorage.removeItem("scoruriQuiz");
  window.location.reload();
};
