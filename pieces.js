// recuperation des pieces depuis le fichier JSON

/*La méthode json() de l'interface Response prend un flux Response et le lit jusqu'à la fin. 
Il renvoie une promesse qui se résout avec le résultat de l'analyse du corps du texte en tant que JSON.
Notez que bien que la méthode soit nommée json(), le résultat n'est pas JSON mais plutôt le résultat de la prise de JSON en entrée 
et de son analyse pour produire un objet JavaScript. pieces[]   */


 const reponse=  fetch("pieces-autos.json"); /* await implique d'avoir avec link js async ou au debut avec un type module du fichier pieces js*/
 



/* verification de la requete du fichier piece-autos.json*/

console.log("reponse de la requete fetch du fichier pieces-autos.json:",reponse); 
/*renvoit le status de la reponse de la requete fetch du package piece auto.json( avec la promesse resultat   response ok ( statut text=ok) 
et le statut 200 de la requete http de la page web) et affiche dans la console le corps de la requete et si tout c'est bien passé*/




