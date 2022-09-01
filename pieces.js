
 
// recuperation des pieces depuis le fichier JSON

/*La méthode json() de l'interface Response prend un flux Response et le lit jusqu'à la fin. 
Il renvoie une promesse qui se résout avec le résultat de l'analyse du corps du texte en tant que JSON.
Notez que bien que la méthode soit nommée json(), le résultat n'est pas JSON mais plutôt le résultat de la prise de JSON en entrée 
et de son analyse pour produire un objet JavaScript. pieces[]   */


 const reponse=  await fetch("pieces-autos.json"); /* await implique d'avoir avec link js async ou au debut avec un type module du fichier pieces js*/
 



/* verification de la requete du fichier piece-autos.json*/

console.log("reponse de la requete fetch du fichier pieces-autos.json:",reponse); 
/*renvoit le status de la reponse de la requete fetch du package piece auto.json( en retournant la promesse avec la promesse resultat:   response ok ( statut text=ok) 
et le statut 200 de la requete http de la page web) et affiche dans la console le corps de la requete et si tout c'est bien passé*/

const pieces= await reponse.json(); /* recuperation de reponse= avec les données au formatjson et transformation en objet javascript avec fonction json()*/

console.log("objet javascript pieces", pieces); /*retourne le tableau objet javascript du fichier pieces-autos.json tarnsformé avec la fonction json() */

const requet= fetch("https://localhost8081/pieces");
console.log("requete serveur",requet)

 /* GENERE ,CREER, ET AJOUTER TOUTES LES FICHES PRODUIT AVEC BOUCLE FOR ..OF*/

function genererPage(pieces){ /* creation de la fonction generer page avec en paramtre nommé pieces*/
 for (let piece of pieces) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

  


    // Idem pour le nom, le prix et la catégorie...
    const imageElement = document.createElement("img");
    imageElement.src = piece.image; 
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = piece.description ?? "Aucune description pour le moment";
    const nomElement = document.createElement("h2");
    nomElement.innerText = piece.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = "prix:" + " "+ piece.prix + "€" + " (" + (piece.prix < 35 ? "€" : "€€€") + ")"; 
    const categorieElement = document.createElement("p");
    categorieElement.innerText = piece.categorie ?? "(aucune catégorie)";
    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = piece.disponibilite ? "En stock" : "Rupture de stock";

     
     
  

    // On rattache la balise article au body
   
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(disponibiliteElement);

    sectionFiches.appendChild(pieceElement);

      // Bouton pour afficher les avis
		const avisElement = document.createElement("button");
		avisElement.innerText = "Afficher les avis";
		avisElement.dataset.id = piece.id; // Attribut data-id="XX"
		pieceElement.appendChild(avisElement);

  
};

/* A -AFFICHER UN RESUME DE PRODUIT */

/*1- FONCTION MAP POUR EXTRAIRE ET GENERER UNE LISTE(nom des pieces)AVEC LES DONNEES/VALEUR QUE L ON SOUHAITE AFFICHER DANS LE RESUME*/

// recuperation du nom des pièces
const noms = pieces.map(piece => piece.nom);

console.log( "liste mappée avec les noms:", noms);

/* 2-  FONCTION SPLICE() POUR SUPPRIMER DE LA LISTE MAP "NOMS" LES NOM DES PIECES NON ABORDABLES*/

// boucle for du debut vers la fin

for (let i= pieces.length -1; i >=0; i--){
    if( pieces[i].prix < 35){/* la condition verifie les prix du tableau pieces*/
        noms.splice(i,1); 
    /* si la condition est verifié , il supprime le nom correspondant à l indice du tableau nom qui correspond sans le decalage avec avec length -1 aux indice du tableau pièces,
    et ne supprime pas le nom des pices du tableau pieces mais du tableau generé par map*/
    }
}
console.log( "liste map() avec noms des pieces et splice() avec les prix abordables inferieur à 35 euros", noms); 
/* affiche tableau nom  des pieces avec map() et les prix abordable avec splice() qui supprime le nom des pieces non abordable >35*/


/* 3-  AFFICHER LA LISTE DES ELEMENTS ABORDABLES AVEC LEUR NOM DE PIECES DONT LES PRIX SONT ABORDABLES*/

// Création de l'élément ul
const abordablesElement = document.createElement("ul");

// Création et rattachement des éléments li
for (let nom of noms) {
     const nomElement = document.createElement("li");
     nomElement.innerText = nom;
     abordablesElement.appendChild(nomElement);
}

// Rattachement de toute la liste à la page
document.querySelector(".abordables").appendChild(abordablesElement);

/* EXERCICE AFFICHE RESUME DE PRODUIT AVEC LA DESCRIPTION DES PRODUITS ABORDABLES ET LE PRIX DES PIECES*/
 
// Recuperation des nom des pieces et du prix
const nomsDisponibles = pieces.map(piece => piece.nom);/* map extrait element par element du tableau pieces*/
const prixDisponibles = pieces.map(piece => piece.prix);
console.log(" resume nomDisponible map (nom) avant splice()", nomsDisponibles);



 for (let i= pieces.length -1; i >=0; i--){
   
    if( pieces[i].disponibilite === false){/* la condition verifie la valeur false de la disponibilité du tableau pieces*/

        nomsDisponibles.splice(i, 1);

        prixDisponibles.splice(i, 1);
/* la condtion verifie la valeur false des disponibilité, si c est false (donc verifié vrai), la liste des noms de pieces non disponible ( valeur false) sont supprimé un par un, 
en synchronisant les iterations sur le i de la boucle for :
avec les iterations sur le i de la piece du tableau pieces avec sa valeur disponible, 
avec  les iterations sur le i du tableau mappée nom
 et avec les iteration sur le i du tableau mappé prix   */

      
    };
};
const resumeDispoPrix="pieces disponibles :"+ nomsDisponibles + " " + "prix correspondants:"+prixDisponibles;
console.log("resume nomDisponibles apres splice()", nomsDisponibles);
console.log("resume nomsDisponible et prix:",resumeDispoPrix);



const disponiblesElement = document.createElement("ul");

for (let i = 0; i < nomsDisponibles.length; i++) {
	const nomElement = document.createElement("li");
	nomElement.innerText = nomsDisponibles[i] + " - " + prixDisponibles[i] + " €";
	disponiblesElement.appendChild(nomElement);
}

document.querySelector(".disponibles").appendChild(disponiblesElement);



const text=document.createElement("section")/* d abord stocker l element creer dans une variable*/
text.innerHTML="<p>heuh</p>";/* affiche la balise p inner html,avec innerText affiche un texte une chaine de caractere */
document.body.appendChild(text)
console.log(text)
};
genererPage(pieces);/* Appel de la fonction avec pour arguments le tableau pieces*/


/* ADD EVENT LISTENER DU BOUTONS TRIER POUR INTERAGIR AVEC L CONTENU ET TRIER PAR ORDRE CROISSANT DES PRIX*/


const boutonTrier= document.querySelector(".btn-trier"); /* selection du selecteur de classe .btn-trier*/
boutonTrier.addEventListener("click", function(){

    const piecesReordonnees= Array.from(pieces); /* copie du tableau pieces car la fonction sort() modifie le tableau d origine pieces et l'ordre d origine des delemnt du tableau pieces*/


/* la fonction anonyme de addevent listener execute des instaruction au clic du bouton, 
ces instruction etant elle meme une fonction, la fonction sort() de tri des element du tableau pieces*/

    piecesReordonnees.sort(function(a,b){ 

/* fonction tri et fonction anonyme a l interieur d la fonction sort() qui cacul le nombre a et b renvoit le resultat, 
la fonction sort en fonction du resultat retourné par la fonction anonyme trier les element a et b*/

        return a.prix-b.prix;
        
    });

    console.log("evenement clic trier",pieces) ;
    console.log( "tableau reordonne piecs copié", piecesReordonnees);
    /* Dans l affichage de la console au clic du bouton trier , le tableau  copié est reordonné et generé sans modifier le tableau d origine pieces,
    si l on regarde a nouveau le tableau evenment clic trier du tableau d origine, l ordre est resté le meme, puisque le bouton tri et la fonction sort() se fait sur le tableau copié*/

/* affiche dans la console la nouvelle liste ordonné lors du clic sur le bouton trrier mais pas à l ecran, 
il faut mettre a jour l ecran et regenerer le tableau pieces reordoonné au clic du bouton*/
});

/* ADD EVENT LISTENER DU BOUTON FILTRER POUR INTERAGIR AVEC LE CONTENU ET FILTRER PAR PRIX ABORDABLE ET NON ABORDABLE <35€*/


const boutonFiltrer= document.querySelector(".btn-filtrer"); /* selection du selecteur de classe .btn-filtrer*/
boutonFiltrer.addEventListener("click",function(){

    const piecesFiltrees= pieces.filter(function(piece){ 

 /* la fonction filter va filtrer le parametre piece, qui represente chaque element du tableau, 
et va filtrer un a un les elements du tableu pieces et retourner les elements dans un nouvelle liste stockée dans la constante piecesFiltrees,
 pas besoin de copier un nouveau tableau pour ne pas modifier ce lui d origine car filter genere cette nouvelle qui est sotockée dans la constance piecs filtrees. 
 Le tableau d origine n est pas modifié*/
        return piece.prix <= 35;
        

    });
    document.querySelector(".fiches").innerHTML = ""; /* effacement de l ecran*/
    genererPage(piecesFiltrees);/*regenration de la page avec le tableau filtree*/
  
   console.log("pieces filtré", piecesFiltrees);/* affiche la liste des 3 elements , les pieces filtrés au clic du bouton btn-filtrer*/
});

/* EXERCICE FILTRER  LA LISTE DES PIECES SELON SI IL Y A UNE DESCRIPTION ET  ORDONNER LA LISTE DE MANIERE DECROISSANTE*/

// Ajout du listener pour trier les pièces par ordre de prix décroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
	const piecesReordonnees = Array.from(pieces);
	piecesReordonnees.sort(function (a, b) {
		// B - A (et pas A - B)
		return b.prix - a.prix;
	});
   
   
	console.log("pieces reordonnees decroissant",piecesReordonnees);
});

// Ajout du listener pour filter les pièces avec description
const boutonNodesc = document.querySelector(".btn-nodesc");
boutonNodesc.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return Boolean(piece.description); 
    /* la fonction Boolean convertit description en valeur booleeene, ici la valeur de description est precisé et vaut true, la fonction filter ajoute à la liste*/

	});
    document.querySelector(".fiches").innerHTML = "";/* effacement de l ecran*/
    genererPage(piecesFiltrees); /*regenration de la page avec le tableau filtree*/
	console.log("pieces filtrée uniquemnt ceux qui ont des description",piecesFiltrees);
});

// EXERCICE Ajout du listener input pour filtrer les prix avec barre de progression
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function () {
	const piecesFiltrees = pieces.filter(function (piece) {/* la fonction filter() ajouter element par element et genere un tableau, 
 pour executer cette fonction il lui faut une valeur booleen qui est introduit avec le comparateur <= des valeurs que le filter doit ajouter 
apres le calcul de comparaison et le resultat retourné de sa fontion call back*/
		return piece.prix <= inputPrixMax.value; 
 /* a chaque manipulation de la barre de progression une valeur est indiquer et filter ()retourne element par element dans un tableau les valeurs en dessous
  ( qui sont les valeurs true pour la fonction filter())de la valeur max indiqué avec la barre de progression, la barre de progression est segmenté en 5 partie step=5*/
	});

	// Effacement de l'écran et regénération de la page avec les pieces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPage(piecesFiltrees);
});

