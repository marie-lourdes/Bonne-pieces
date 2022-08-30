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
prixElement.innerText = "prix:" + " "+ (ampoule.prix < 35 ? ampoule.prix +"€" : ampoule.prix +"€€€");
const categorieElement = document.createElement("p");
categorieElement.innerText = ampoule.categorie;

console.log ( "produit ampoule:",ampoule);


/* ajout a la page web de la fiche produit ampoule avec append child*/

const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);

/* redimensionnement de l image de l'ampoule*/
imageElement.style.width="25%";