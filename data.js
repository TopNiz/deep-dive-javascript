const input_file = "./tips.csv";
var donnees = [];

async function load_csv() {
  // Stocker les lignes dans une variable globale
  // Pour pouvoir les utiliser dans les autres fonctions
  donnees = await fetch(input_file)
    .then(res => res.text())
    .then(csv => recupLignes(csv));

  aff(corps(donnees));
}

function recupLignes(csv) {
  const lignes = csv.split('\n')
    .filter(ligne => ligne !== "")
    .map(ligne => ligne.split(','))
    .map((ligne, index) => ligne.map(val => convertir(val, index)));
  return lignes;
}

function convertir(valeur, index) {
  let elem = {
    "id": index,
    "type": isNaN(+valeur) ? "text" : "number",
    "valeur": isNaN(+valeur) ? valeur : +valeur,
  }
  return elem;
}

function aff(lignes) {
  // Récupérer le tableau
  let tableau = document.querySelector("#data");

  // Consommer les données pour les afficher
  let html = `
    <thead>
      ${afficheEntete(lignes)}
    </thead >
    <tbody>
      ${afficheCorps(lignes)}
    </tbody>`;

  tableau.innerHTML = html;

  // Afficher le nombre de lignes
  let nbLignes = document.querySelector("#nb_lignes");
  nbLignes.innerHTML = lignes.length;

  // Afficher le graphique
  barsTicket(lignes);
  barsPourboire(lignes);
  bubblePourboireTicketsCouverts(lignes);
}

function afficheEntete(lignes) {
  // Voire gerer.js pour la fonction toggle du onclick
  return `
    <tr>
      <th><input type="checkbox" id="select_all" onclick="toggle(this)"></th>
      ${afficheTitres(lignes)}
      <th>Ratio <br> pourboire/ticket</th>
      <th>Ratio <br> pourboire/couvert</th>
    </tr>
  `;
}

function afficheCorps(lignes) {
  // Voire gerer.js pour la fonction toggle du onclick
  return lignes.map((ligne) => {
    const index = donnees.indexOf(ligne);
    return `
      <tr id="ligne_${index - 1}">
        <td><input type="checkbox" id="select_${index - 1}" value="${index - 1}" onclick="toggle(this)"></td>
        ${ligne.map(colonne => `<td>${colonne.valeur}</td>`).join('')}
        ${ratioPourboireTicket(ligne)}
        ${ratioPourboireCouvert(ligne)}
      </tr>
    `;
  }).join('');
}

function afficheTitres(lignes) {
  return entete().map((colonne, index) => `
    <th>
      ${colonne.valeur}
      ${lignes[0][index].type === "text" ? "" : "*" + afficheStats(lignes, index)}
    </th>
  `).join('');
}

function ratioPourboireTicket(ligne) {
  return `
    <td>${Math.round(ligne[1].valeur * 100 / ligne[0].valeur)} %</td>
  `;
}

function ratioPourboireCouvert(ligne) {
  return `
    <td>${(ligne[1].valeur / ligne[6].valeur).toFixed(2)} €</td>
  `;
}

function afficheStats(lignes, colonne) {
  return `
    <div class="stats">
      <span><strong>Min</strong> : ${min(valeurs(lignes, colonne))} </span>
      <span><strong>Max</strong> : ${max(valeurs(lignes, colonne))} </span>
      <span><strong>Somme</strong> : ${somme(valeurs(lignes, colonne))} </span>
      <span><strong>Moyenne</strong> : ${moyenne(valeurs(lignes, colonne))} </span>
      <span><strong>Médiane</strong> : ${mediane(valeurs(lignes, colonne))} </span>
      <span><strong>Ecart-type</strong> : ${ecartType(valeurs(lignes, colonne))} </span>
      <span><strong>Variance</strong> : ${variance(valeurs(lignes, colonne))} </span>
    </div>
  `;
}

function entete() {
  return donnees[0];
}

function corps(lignes) {
  return lignes.filter((_, index) => index !== 0);
}

function valeurs(lignes, index) {
  return lignes[0][index].type === "text"
    ? []
    : lignes.map(ligne => +ligne[index].valeur);
}

function min(valeurs) {
  return valeurs.length === 0
    ? ""
    : Math.min(...valeurs);
}

function max(valeurs) {
  return valeurs.length === 0
    ? ""
    : Math.max(...valeurs);
}

function somme(valeurs) {
  return valeurs.length === 0
    ? ""
    : (valeurs.reduce((acc, val) => acc + val)).toFixed(1);
}

function moyenne(valeurs) {
  return valeurs.length === 0
    ? ""
    : (somme(valeurs) / valeurs.length).toFixed(1);
}

function mediane(valeurs) {
  return valeurs.length === 0
    ? ""
    : valeurs.sort((a, b) => a - b)[Math.floor(valeurs.length / 2)];
}

function ecartType(valeurs) {
  return valeurs.length === 0
    ? ""
    : Math.sqrt(variance(valeurs)).toFixed(1);
}

function variance(valeurs) {
  return valeurs.length === 0
    ? ""
    : moyenne(valeurs.map(val => Math.pow(val - moyenne(valeurs), 2)));
}