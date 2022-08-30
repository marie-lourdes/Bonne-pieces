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



/* creation des elements du DOM*/
const ampoule = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = ampoule.image; 
const nomElement = document.createElement("h2");
nomElement.innerText = ampoule.nom;
const prixElement = document.createElement("p");
prixElement.innerText = "prix:" + " "+ ampoule.prix + "€" + " (" + (ampoule.prix < 35 ? "€" : "€€€") + ")"; /* operateur ternaire: condition, valeur true ,et valeur false*/
const categorieElement = document.createElement("p");
categorieElement.innerText = ampoule.categorie;

console.log ( "produit ampoule:",ampoule);
const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = ampoule.disponibilite ? "En stock" : "Rupture de stock";
/* test valeur de la disponibilitén en stocke (valeur true de disponibilité dans le fichier piece-auto.json , rupture de stock false */
const descriptionElement = document.createElement("p");
descriptionElement.innerText = ampoule.description ?? "Pas de description pour le moment.";
/* nullish envoit la valeur de substitution si la valeur vaut Null ou undefined sinon garde la valeur , ici la valeur de description est gardé, la valeur de description est presente et defini*/

/* ajout a la page web de la fiche produit ampoule avec append child*/

const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(disponibiliteElement);

/* redimensionnement de l image de l'ampoule*/
imageElement.style.width="25%";

/* verification des donnée et test de valeur: test  avec nullish de la categorie essuie glace (ln55)  et test de prix avec  operateur ternaire de l ampoule .prix(ln33)*/
console.log( "essuie glace valeur retourné",pieces[4].categorie);


console.log( "test  nullish categorie essuie glace:", pieces[4].categorie ?? "(aucune categorie)"); 

/* l'opérateur nullish ??, teste la presence de la valeur categorie  de l index  4 essuie glace
 et renvoit une valeur de substitution =aucune categorie si valeur renvoyé est null ou undefined*/


 for (let piece of pieces) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");


    // Idem pour le nom, le prix et la catégorie...
    const imageElement = document.createElement("img");
    imageElement.src = piece.image; 
    const nomElement = document.createElement("h2");
    nomElement.innerText = piece.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = "prix:" + " "+ piece.prix + "€" + " (" + (piece.prix < 35 ? "€" : "€€€") + ")"; 
    const categorieElement = document.createElement("p");
    categorieElement.innerText = piece.categorie;

    // On rattache la balise article au body
   
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(disponibiliteElement);

    sectionFiches.appendChild(pieceElement);
};