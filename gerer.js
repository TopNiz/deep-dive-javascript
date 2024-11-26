function toggle(element) {
    if (element.id === "select_all") {
        return toggleAll(element.checked);
    }
    const index = element.value;
    const tr = document.querySelector(`#ligne_${index}`);
    tr.classList.toggle("selected");
}

function toggleAll(checked) {
    const checkboxes = document.querySelectorAll("#data tbody input[type=checkbox]");
    checkboxes.forEach(checkbox => checkbox.checked = checked);
    const trs = document.querySelectorAll("#data tbody tr");
    trs.forEach(tr => tr.classList.toggle("selected", checked));
    return;
}

function toggleForm(display) {
    const form = document.querySelector("#ajouter-modifier form");
    form.style.display = display ? "block" : "none";

    return form;
}

function ajouter() {
    toggleForm(true);
}

function modifier() {
    const ligneAModifier = document.querySelector("#data tbody tr.selected");
    if (!ligneAModifier) {
        return;
    }
    const ligneId = ligneAModifier.querySelector("input[type=checkbox]").value;
    remplirForm(ligneId);
}

function remplirForm(ligneId) {
    const form = toggleForm(true);
    const inputs = obtenirInputs(form.querySelectorAll("input, select"));
    const ligne = donnees[+ligneId + 1];
    inputs["index"].value = ligneId;
    inputs["ajout_ticket"].value = ligne[0].valeur;
    inputs["ajout_pourboire"].value = ligne[1].valeur;
    inputs["ajout_genre"].value = ligne[2].valeur;
    inputs["ajout_fumeur"].value = ligne[3].valeur;
    inputs["ajout_jour"].value = ligne[4].valeur;
    inputs["ajout_service"].value = ligne[5].valeur;
    inputs["ajout_couverts"].value = ligne[6].valeur;
}

function reinitAjoutForm() {
    let form = document.querySelector("#ajouter-modifier form");
    form.reset();
}

function annulerLigne() {
    toggleForm(false);
}

function soumettreLigne() {
    let inputs = checkValidity();
    if (!inputs) {
        return;
    }
    let ligneId = inputs["index"].value;
    let ligne = [
        inputs["ajout_ticket"],
        inputs["ajout_pourboire"],
        inputs["ajout_genre"],
        inputs["ajout_fumeur"],
        inputs["ajout_jour"],
        inputs["ajout_service"],
        inputs["ajout_couverts"]
    ].map(format);
    console.log(ligneId);
    console.log(ligne);
    donnees.splice(
        ligneId === "" ? 1 : +ligneId + 1,
        ligneId === "" ? 0 : 1,
        ligne
    );
    filtrer(aff);
    toggleForm(false);
}

function checkValidity() {
    const form = document.querySelector("#ajouter-modifier form");
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach(input => {
        input.validity.valid ? input.classList.remove("invalid") : input.classList.add("invalid");
    });
    if (!form.checkValidity()) {
        return false;
    }
    return obtenirInputs(inputs);
}

function obtenirInputs(inputs) {
    const inputsObj = {};
    inputs.forEach(input => inputsObj[input.id] = input);
    return inputsObj;
}

function format(input) {
    return {
        type: input.type === "number" ? "number" : "text",
        valeur: input.type === "number" ? +input.value : input.value
    };
}
