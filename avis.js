
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

           // SAUVEGARDE DANS LE LOCALSTORAGE
			window.localStorage.setItem("avis-piece-" + id, JSON.stringify(avis));/* argument 1 cle, valeur de la reponse avis retourné par l api transformé au format json*/
            const pieceElement = event.target.parentElement;
          
			afficherAvis();/*affiche avis au clic du boutton afficher avis*/
		});
	}
}

export function afficherAvis(pieceElement, avis) { 
    
    const avisElement = document.createElement("p");
    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += avis[i].utilisateur + ': ' + avis[i].commentaire + " " + avis[i].nbEtoiles + '<br>'; 
        pieceElement.appendChild(avisElement);
        console.log( "avis elemnt apres la boucle", avisElement)
        /* hors de la boucle l affichage de l avis element n apparait qu une fois avec les avis additionné dans la varible avis elemnt qui sont eux incrementé parcouru par la boucle for*/
    
    };

 }

/* RECUPERER, SAUVEGARDER ou CREER AVISUTILISATEUR DANS LA TABLE AVIS AVEC LES AVIS AJOUTÉ  DANS LE FORMULAIRE PAR LES UTILISATEURS DEPUIS LA PAGE WEB*/

 /* recuperer la reference au formulaire*/

const avisformulaire= document.querySelector(".formulaire-avis");

/* recuperer les données du formulaire avec addEventListener*/

avisformulaire.addEventListener("submit", function(event){/* l objet de reference à l evenement "event" contient les donnees de l element qui declenche l evenement*/
    event.preventDefault(); /* desactivation du comportement par defaut du bouton submit du formulaire*/
    /*A- recuperer les valeurs des champs du formulaire et le transmettre dans la table avis avec l 'objet avisUtilisateur*/

    const avisUtilisateur= {

        pieceId:event.target.querySelector("[name=piece-id]").value,

        utilisateur:event.target.querySelector("[name=utilisateur]").value,
        nbEtoiles: event.target.querySelector("[name=nb-etoiles]").value,

         /* queryselector utilise les selecteur css, pour les attribut les valeur de l attribut sont entre guillement, en js les valeur(utilisateur) de l attribut(name) n ont pas de guillemet*/
        commentaire:event.target.querySelector("[name=commentaire]").value

    };

    console.log("avis utilisateur avant la transformation au format json:", avisUtilisateur);

    /* transformer l objet avisUtilisateur en chaine de caractere au format json pour le transmettre dans le corps de la requête*/

     const chargeUtile= JSON.stringify(avisUtilisateur);

     console.log("avis utilisateur au format json:", chargeUtile);

     /* transmettre les donnes utlisateur dans la table avis avec POST fetch*/
     const requetePost= fetch("http://localhost:8081/avis",{   /* deuxieme argument de la requete fetch: la configuration de la requete sous forme d 'objet*/
                method:"POST",
                headers: {"content-type":"application/json"},
                body: chargeUtile /* recuperation des données avisUtilisateur  transformé au format json dans la variable chargeUtile et insertion des données dans le corps de la requête*/
      });
      console.log("requete post:", requetePost);

});

/*B- AFFICHER DANS LE DOM LES AVIS AJOUTÉ AVEC LA FONCTION AJOUTLISTENER AVIS*/




/*AJOUT GRAPHIQUE CHART.JS*/

// Calcul du nombre total de commentaires par quantité d'étoiles attribuées
const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
const nb_commentaires = [0, 0, 0, 0, 0];

for (let commentaire of avis) {
    nb_commentaires[commentaire.nbEtoiles -1]++;
   
}
console.log("nombrecommentaire", nb_commentaires)

// Légende qui s'affichera sur la gauche à côté de la barre horizontale
const labels = ["5", "4", "3", "2", "1"];
// Données et personnalisation du graphique
const data = {
    labels: labels,
    datasets: [{ /*objet du graphique avec les données de l objet etoile*/
      label: "Étoiles attribuées", /* legende de l objet*/
      data: nb_commentaires.reverse(),/* les donnes de l objet qui vont correspondre au tableau labels du graphique*/
       backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
    }],
};

// Objet de configuration final
const config = {
    type: "bar",
    data: data,
    options: {
        indexAxis: "y",
    },
};

// Rendu du graphique dans l'élément canvas
const graphiqueAvis = new Chart(
    document.querySelector("#graphique-avis"),
    config,
);