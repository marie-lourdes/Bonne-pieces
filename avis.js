
// Fonction qui enregistre des event listener sur les boutons de la page.
// Elle sera appelée après chaque génération ou mise à jour de la page
// car pour la mettre à jour, on supprime l'intégralité des éléments DOM avec innerHTML = "".
// Il faut donc ré-enregistrer les listener sur les nouveaux boutons.
export function ajoutListenersAvis() {
	const buttonElement = document.querySelectorAll(".fiches article button");

	for (let i = 0; i < buttonElement.length; i++) {
		buttonElement[i].addEventListener("click", async function (event) {/* avec async la suite du code sera executé , la fonction n'attend pas l evenement clic pour executer la suite*/
			// Récupération de la valeur de l'attribut data-id="XX".
			const id = event.target.dataset.id;
			// Attente de la réponse de l'API stockage de la reponse dans la variable reponse
			const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");/* await la suite du code ne sera pas executé avant d obtenir la reponse*/
            console.log( "reponse du bouton", reponse);
            const avis= await reponse.json(); /* la fonction json est asnchrone on ajoute await pour attendre que le resultat soit traité par json() avant de passer à la suite du code*/
            /*traiter le resultat de la reponse sous forme de promesse avec fetch , et le transformer en objet javascript pour manipuler les données de l objet tableau*/
             console.log( "reponse du serveur sous forme d obejt avc json()", avis);


             const pieceElement = event.target.parentElement;
            const avisElement = document.createElement("p");

            for (let i = 0; i < avis.length; i++) {
                avisElement.innerHTML += avis[i].utilisateur + ': ' + avis[i].commentaire + '<br>'; 
            
            }

            pieceElement.appendChild(avisElement);
            console.log( "avis elemnt apres la boucle", avisElement)/* hors de la boucle l affichage de l avis element n apparait qu une fois avec les avis additionné dans la varible avis elemnt qui sont eux incrementé parcouru par la boucle for*/
			
		});
	}
}
