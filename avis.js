
// Fonction qui enregistre des event listener sur les boutons de la page.
// Elle sera appelée après chaque génération ou mise à jour de la page
// car pour la mettre à jour, on supprime l'intégralité des éléments DOM avec innerHTML = "".
// Il faut donc ré-enregistrer les listener sur les nouveaux boutons.
export function ajoutListenersAvis() {
	const buttonElement = document.querySelectorAll(".fiches article button");

	for (let i = 0; i < piecesElements.length; i++) {
		buttonElement[i].addEventListener("click", async function (event) {
			// Récupération de la valeur de l'attribut data-id="XX".
			const id = event.target.dataset.id;
			// Attente de la réponse de l'API.
			const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
			
		});
	}
}
