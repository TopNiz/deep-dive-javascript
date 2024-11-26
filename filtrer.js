function reinitialiser() {
    document.querySelector("#recherche_max_ticket").value = "";
    document.querySelector("#recherche_min_ticket").value = "";
    document.querySelector("#recherche_max_pourboire").value = "";
    document.querySelector("#recherche_min_pourboire").value = "";
    document.querySelector("#recherche_genre_homme").checked = false;
    document.querySelector("#recherche_genre_femme").checked = false;
    document.querySelector("#recherche_fumeur_oui").checked = false;
    document.querySelector("#recherche_fumeur_non").checked = false;
    document.querySelector("#recherche_jour").value = "Tous";
    document.querySelector("#recherche_service_dejeuner").checked = false;
    document.querySelector("#recherche_service_diner").checked = false;
    document.querySelector("#recherche_max_couverts").value = "";
    document.querySelector("#recherche_min_couverts").value = "";
}

function filtrer(callback) {
    let lignes = donnees
        .filter((ligne) => filtrerMaxTicket(ligne)
            && filtrerMinTicket(ligne)
            && filtrerMaxPourboire(ligne)
            && filtrerMinPourboire(ligne)
            && filtrerGenre(ligne)
            && filtrerFumeur(ligne)
            && filtrerJour(ligne)
            && filtrerService(ligne)
            && filtrerMaxNbCouverts(ligne)
            && filtrerMinNbCouverts(ligne)
        );

    callback(lignes);
}

function filtrerMaxTicket(ligne) {
    const maxTicket = document.querySelector("#recherche_max_ticket").value;
    if (maxTicket === "") {
        return true;
    }
    return ligne[0].valeur <= maxTicket;
}

function filtrerMinTicket(ligne) {
    const minTicket = document.querySelector("#recherche_min_ticket").value;
    if (minTicket === "") {
        return true;
    }
    return ligne[0].valeur >= minTicket;
}

function filtrerMaxPourboire(ligne) {
    const maxPourboire = document.querySelector("#recherche_max_pourboire").value;
    if (maxPourboire === "") {
        return true;
    }
    return ligne[1].valeur <= maxPourboire;
}

function filtrerMinPourboire(ligne) {
    const minPourboire = document.querySelector("#recherche_min_pourboire").value;
    if (minPourboire === "") {
        return true;
    }
    return ligne[1].valeur >= minPourboire;
}

function filtrerGenre(ligne) {
    const homme = document.querySelector("#recherche_genre_homme").checked && ligne[2].valeur === "Homme";
    const femme = document.querySelector("#recherche_genre_femme").checked && ligne[2].valeur === "Femme";

    return homme || femme;
}

function filtrerFumeur(ligne) {
    const estFumeur = document.querySelector("#recherche_fumeur_oui").checked && ligne[3].valeur === "Oui";
    const nonFumeur = document.querySelector("#recherche_fumeur_non").checked && ligne[3].valeur === "Non";

    return estFumeur || nonFumeur;
}

function filtrerJour(ligne) {
    const jour = document.querySelector("#recherche_jour").value;
    if (jour === "Tous") {
        return true;
    }
    return ligne[4].valeur === jour;
}

function filtrerService(ligne) {
    const dejeuner = document.querySelector("#recherche_service_dejeuner").checked && ligne[5].valeur === "Déjeuner";
    const diner = document.querySelector("#recherche_service_diner").checked && ligne[5].valeur === "Dîner";

    return dejeuner || diner;
}

function filtrerMaxNbCouverts(ligne) {
    const maxNbCouverts = document.querySelector("#recherche_max_couverts").value;
    if (maxNbCouverts === "") {
        return true;
    }
    return ligne[6].valeur <= maxNbCouverts;
}

function filtrerMinNbCouverts(ligne) {
    const minNbCouverts = document.querySelector("#recherche_min_couverts").value;
    if (minNbCouverts === "") {
        return true;
    }
    return ligne[6].valeur >= minNbCouverts;
}