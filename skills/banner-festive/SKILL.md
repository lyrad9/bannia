---
name: banner-festive
description: Adapte une bannière existante à une fête ou un temps fort (Noël, Halloween, Nouvel An, Saint-Valentin, Ramadan et Aïd, Pâques, Black Friday, rentrée, fête nationale…), en français et en anglais, sans perdre l'identité de la marque. À utiliser quand l'utilisateur demande une version de fête, saisonnière ou festive de sa bannière ou de ses déclinaisons. Pour créer la bannière de départ, utilise linkedin-banner ; pour un autre réseau, banner-adapt.
---

# Bannière de fête

Pars d'un dossier de bannière existant et habille-la pour une fête. On doit reconnaître la personne au premier regard, puis la fête au second. Une bannière de fête reste une bannière de profil : la tagline, le CTA et la hiérarchie restent ceux de l'utilisateur.

## 1. Cadrer la fête

S'il n'a pas précisé la fête, propose les prochaines du calendrier ci-dessous à partir de la date du jour. Puis pose ces questions, une par élément, dans la langue de l'utilisateur.

Si sa demande répond déjà à certaines questions, par exemple le prompt copié depuis la section « Adapter à une fête ou un thème » de l'éditeur, ne les repose pas : pose seulement celles qui manquent.

| Élément | Question |
|---|---|
| Fête | Pour quelle fête ? |
| Public | Ton public célèbre-t-il cette fête ? Dans quel pays est-il surtout ? |
| Message | Veux-tu un message de fête sur la bannière (par exemple « Joyeuses fêtes »), ou seulement l'ambiance ? |
| Offre | As-tu une offre liée à cette période, avec ses conditions et sa date de fin ? |
| Dates | Jusqu'à quand la bannière doit-elle rester en ligne ? |

Règles :

- Une question sans réponse veut dire que l'élément ne figure pas. Ne relance pas.
- N'invente aucune offre, réduction, date limite ni nombre de places. Une promotion ne figure que si l'utilisateur l'a donnée, avec ses conditions.
- Si le public ne célèbre pas la fête, dis-le et propose une fête plus parlante pour lui, ou un habillage de saison neutre (« fin d'année » plutôt que « Noël »).

Si plusieurs bannières existent (directions, déclinaisons X, Facebook, WhatsApp, langues), demande lesquelles adapter. Par défaut : la bannière LinkedIn choisie, en français et en anglais.

## 2. Choisir l'intensité

Si l'utilisateur a choisi une intensité, crée uniquement celle-là, en français et en anglais. Sinon, crée 3 directions, une par intensité, chacune dans son dossier frère :

| Intensité | Suffixe | Ce qui change |
|---|---|---|
| Clin d'œil | `-touche` | Un ou deux motifs de fête discrets, placés loin du texte. Couleurs et texte inchangés. |
| Habillage | `-habillage` | Fond et motifs de fête, palette teintée vers celle de la fête. Texte inchangé, sauf un court message de fête si l'utilisateur l'a demandé. |
| Édition spéciale | `-edition` | Composition recentrée sur la période : message de fête ou offre en tête, tagline gardée en second niveau, CTA adapté seulement si l'offre le justifie. |

Exemple : `ma-banniere-noel-touche`, `ma-banniere-noel-habillage`, `ma-banniere-noel-edition`, et leurs versions `-en`.

Si l'utilisateur n'a donné ni message ni offre, la troisième direction reste une édition visuelle plus marquée : n'invente pas de texte pour la remplir.

## 3. Habiller la bannière

Copie le dossier de départ, sa police et ses images, dans le même projet de la bibliothèque que la bannière de départ (voir « Où enregistrer » dans `../linkedin-banner/SKILL.md`), puis modifie `banner.html` :

```html
<meta name="banner-occasion" content="noel">
```

Garde les balises `banner-size`, `banner-format` et `banner-lang` du dossier de départ. La valeur de `banner-occasion` est l'identifiant du tableau ci-dessous, ou un identifiant court en minuscules pour une autre fête.

- **Identité :** les couleurs de la marque restent dominantes. Ajoute au plus deux couleurs de fête, en accent, ou teinte `--primary`, `--light` et `--deep` vers la fête sans changer leur rôle. Garde les polices.
- **Une idée, pas une pile de clichés :** cherche, comme pour la bannière de départ, une idée qui relie la fête au métier de l'utilisateur. Exemple réussi : pour un développeur à Noël, une guirlande dont les ampoules sont des points de code coloré ; pour une designer à Halloween, une citrouille construite avec des poignées de sélection vectorielle.
- **Personnages et objets emblématiques :** chaque fête a ses figures, et l'utilisateur s'attend à les voir : le Père Noël dans son traîneau tiré par ses rennes, les boules du sapin, la citrouille d'Halloween, le bélier de la Tabaski, la lanterne du Ramadan. Dessine-les quand ils servent l'ambiance, placés dans un espace libre, généralement à gauche, au-dessus de la zone de la photo de profil, ou en bas à droite.
- **Rendu détaillé, jamais un pictogramme plat :** donne du volume à chaque figure, avec des dégradés, une ombre portée, des reflets et des détails de matière. Une boule de Noël a une sphère ombrée, un reflet de fenêtre, un point de lumière et une attache dorée striée. Un renne a un pelage dégradé, des bois ramifiés, un harnais et des clochettes. Une toison est faite de boucles qui accrochent la lumière. Zoome sur le PNG pour contrôler chaque figure avant de la montrer.
- **Dessin :** figures et motifs en SVG ou CSS, ou fichiers fournis par l'utilisateur. Pour un rendu photographique, demande-lui une image détourée (PNG transparent) plutôt que d'en chercher une. Pas de banque d'images ni de visuel IA générique.
- **Éditeur :** ajoute `data-el="Nom lisible"` et `data-decor` sur chaque motif de fête (`data-el="Guirlande" data-decor`), pour que l'utilisateur puisse le déplacer ou le supprimer. Garde les attributs existants des autres éléments.
- **Zones à protéger :** applique celles du format d'origine (zone mobile LinkedIn, zones de `banner-adapt` pour X, Facebook et WhatsApp). Un motif décoratif peut y passer, un texte non.
- **Superposition :** place les motifs avant le contenu dans le HTML, pour qu'ils passent sous les pastilles, cadres et boutons. Quand un motif croise l'un de ces éléments, fais-le passer dessous : ne le déplace pas et ne le rétrécis pas pour l'éviter.
- **Lisibilité :** neige, paillettes, confettis et textures denses ne passent jamais sous le texte lui-même. Vérifie le contraste du petit texte après chaque changement de fond.
- **Langues :** écris le message de fête en vrai anglais (« Season's greetings », « Happy holidays ») plutôt qu'en traduction mot à mot, et vérifie que la composition tient avec cette longueur.

## Calendrier

Les fêtes mobiles changent chaque année : vérifie la date de l'année en cours avant de la proposer, et dis-le à l'utilisateur. Les dates de l'Aïd dépendent de l'observation de la lune et du pays : donne une fourchette, pas un jour.

| Fête | `banner-occasion` | Mettre en ligne | Retirer | Codes visuels | Attention |
|---|---|---|---|---|---|
| Nouvel An | `nouvel-an` | Dernière semaine de décembre | Mi-janvier | Nuit, or, étincelles, chiffres de l'année | Écris la bonne année |
| Saint-Valentin | `saint-valentin` | Début février | 15 février | Rouge, rose, cœurs | Reste léger sur un profil pro, surtout en B2B |
| Ramadan | `ramadan` | Début du Ramadan | Aïd el-Fitr | Croissant, lanternes, nuit bleue et or | Sobriété, pas de nourriture ni de festin pendant le jeûne, « Ramadan Mubarak » ou « Ramadan Kareem » |
| Aïd el-Fitr | `aid-el-fitr` | Fin du Ramadan | Une semaine après | Croissant, motifs géométriques, or | « Aïd Moubarak » ; pas de promotion agressive |
| Pâques | `paques` | Semaine avant Pâques | Lundi de Pâques | Pastel, œufs, printemps | Date mobile |
| Fête du travail | `fete-du-travail` | Fin avril | 2 mai | Muguet en France, outils, mains | Jour férié dans de nombreux pays, sens variable |
| Tabaski, Aïd el-Adha | `tabaski` | Quelques jours avant | Une semaine après | Bélier aux cornes enroulées, paisible et paré (collier, clochette), croissant, lanternes, or, vert, motifs géométriques | Le bélier est le symbole attendu ; jamais le sacrifice, ni couteau, ni sang |
| Fête des mères, des pères | `fete-des-meres`, `fete-des-peres` | Une semaine avant | Le lendemain | Fleurs, cartes, tons doux | La date change selon le pays : demande-la |
| Rentrée | `rentree` | Fin août | Fin septembre | Cahiers, crayons, agenda | Utile pour annoncer une nouvelle offre |
| Halloween | `halloween` | Mi-octobre | 1er novembre | Orange, noir, violet, citrouilles, toiles | Peu célébré dans certains pays : vérifie le public ; effrayant, jamais gore |
| Black Friday | `black-friday` | Une semaine avant | Cyber Monday | Noir, jaune ou rouge, étiquettes | Seulement avec une vraie offre donnée par l'utilisateur |
| Noël, fin d'année | `noel` | Début décembre | Début janvier | Père Noël, traîneau et rennes (le renne de tête au nez rouge), boules en volume, sapin décoré, cadeaux, pleine lune, neige ; rouge, vert, or | « Joyeuses fêtes » plus inclusif que « Joyeux Noël » si le public est varié |
| Fête nationale | `fete-nationale` | Une semaine avant | Le lendemain | Couleurs du drapeau en accent | Demande le pays et la date ; drapeau exact ou absent, jamais approximatif |

Pour une fête absente de ce tableau, demande à l'utilisateur sa date, ses codes et ce qu'il faut éviter, et ne t'appuie que sur ce qu'il confirme.

## Respect

- Fêtes religieuses : ton sobre et respectueux, aucun symbole tourné en dérision, aucun mélange de symboles de religions différentes.
- N'associe pas de promotion à une fête religieuse sans que l'utilisateur l'ait demandé.
- Pas de stéréotypes culturels, de costumes ni de caricatures.

## 4. Exporter et présenter

Exporte et contrôle chaque PNG comme pour la bannière de départ (`../linkedin-banner/SKILL.md`, section 4), avec la taille du format. Puis ouvre l'éditeur sur le projet :

```bash
node ../linkedin-banner/editor/server.mjs <dossier-du-projet> --port 4180
```

Il lit la balise `banner-occasion` et permet de filtrer par fête, à côté des filtres de format et de langue. Montre les 3 intensités côte à côte avec la bannière d'origine, et dis ce qui a changé dans chacune.

## 5. Rappeler le retrait

Termine en rappelant :

- la date à laquelle remettre la bannière d'origine, et que son dossier n'a pas été modifié ;
- les déclinaisons que `banner-adapt` peut produire pour la même fête, si l'utilisateur publie aussi sur X, Facebook ou WhatsApp ;
- de contrôler le rendu sur son propre téléphone.

Ne publie jamais la bannière toi-même sans l'accord explicite de l'utilisateur.
