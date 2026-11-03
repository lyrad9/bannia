---
name: linkedin-featured
description: Crée un visuel pour la section Sélection d'un profil LinkedIn en 1200 × 627, en français et en anglais, à partir du but que lui donne l'utilisateur. À utiliser uniquement quand l'utilisateur demande explicitement un visuel de Sélection, une vignette Featured ou une image pour un lien mis en avant sur son profil. Ne couvre ni la bannière de profil, ni les posts, ni les carrousels.
---

# Visuels de Sélection LinkedIn

Chaque visuel met en avant un seul lien. On doit comprendre l'action en un coup d'œil, car la vignette s'affiche petite.

Ne crée aucun visuel tant que l'utilisateur ne l'a pas demandé, et ne génère pas d'exemples de ta propre initiative.

## 1. Demander le but

Commence toujours par cette question, avant toute création :

« Quel est le but de ce visuel ? Par exemple : proposer un audit, faire visiter ton site, échanger avec toi, montrer tes réalisations, présenter tes offres. »

Puis demande uniquement ce que ce but exige :

| But | À demander |
|---|---|
| Audit ou diagnostic | Ce qui est audité, la durée s'il y en a une, le lien de réservation |
| Échanger, réserver un appel | La durée s'il y en a une, le lien de réservation, sa photo |
| Visiter le site | L'adresse, ce que le visiteur y trouve, une capture du site |
| Montrer ses réalisations | L'adresse, des captures de ses travaux |
| Présenter ses offres | Les offres, le lien, des captures s'il en a |

Une question sans réponse veut dire que l'élément ne figure pas sur le visuel. Si l'utilisateur envoie son profil ou son portfolio, propose les textes à partir de ce qui y figure et fais-les valider. N'invente aucun chiffre, client, durée, offre ou résultat.

Reprends les couleurs et la police de sa bannière s'il en a une. Sinon, demande une ou deux couleurs principales.

## 2. Choisir la meilleure référence

Lis `../linkedin-banner/references/selection.md`, puis regarde les images candidates. Les références ne sont pas fournies avec le skill : si `../linkedin-banner/references/images/selection/` est vide, dis-le à l'utilisateur et propose-lui d'en ajouter (voir `../linkedin-banner/references/README.md`) ou de continuer sans. Sans référence, construis le visuel avec les règles de la section 3. Choisis **une seule référence**, la plus adaptée au but et à ce que l'utilisateur a fourni : une référence construite sur un calendrier avec photo ne convient pas sans photo. Dis laquelle tu as choisie et pourquoi, en une phrase.

## 3. Construire le visuel

Inspire-toi fortement de la composition, de la hiérarchie et du traitement du fond de la référence, tout en gardant ta créativité : apporte une idée à toi, liée au métier de l'utilisateur, et l'identité de sa marque. Ne reprends jamais le texte, le logo, le nom ni la photo de la référence.

Crée un dossier avec un `banner.html` de 1200 × 627 px :

```html
<meta name="banner-size" content="1200x627">
<meta name="banner-format" content="featured">
<meta name="banner-lang" content="fr">
```

- **Une seule action,** un seul CTA, cinq à huit mots de titre au maximum.
- **Lisibilité :** le visuel doit rester lisible à 300 px de large. Titre d'au moins 80 px, texte secondaire d'au moins 30 px, marges d'au moins 60 px, car l'affichage peut recadrer les bords.
- **Alignement :** contenu seul, centré entre lui. Personne ou objet à côté, contenu aligné à gauche.
- **Visuels :** utilise les fichiers de l'utilisateur ou des formes dessinées en CSS ou SVG. Pas de banque d'images ni de visuel IA générique.
- **Éditeur :** mêmes attributs que la bannière (`data-el`, `data-repeat`, `data-decor`) et mêmes variables CSS.
- **Série :** si l'utilisateur demande plusieurs visuels, garde la même base pour qu'ils paraissent cohérents sur son profil.

Rédige aussi la version anglaise, dans un dossier frère suffixé `-en`. Écris un vrai texte anglais plutôt qu'une traduction mot à mot, et vérifie que la composition tient avec cette longueur.

## 4. Exporter et présenter

Ouvre l'éditeur sur le dossier parent :

```bash
node ../linkedin-banner/editor/server.mjs <dossier> --port 4180
```

Le filtre « Sélection » y réunit les visuels. Regarde le PNG en taille réelle et réduit à 300 px avant de le présenter, puis dis ce que tu as repris de la référence et ce que tu as ajouté.

Signale que LinkedIn ne publie pas de dimension officielle pour ces vignettes : 1200 × 627 est la taille recommandée par des sources tierces, et l'utilisateur doit contrôler le rendu sur son profil. Ne publie jamais rien toi-même sans son accord explicite.
