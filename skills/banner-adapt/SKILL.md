---
name: banner-adapt
description: Adapte une bannière LinkedIn existante pour X, WhatsApp et Facebook, en français et en anglais. À utiliser quand l'utilisateur demande de décliner sa bannière ou sa couverture sur un autre réseau. Pour créer la bannière de départ, utilise linkedin-banner.
---

# Déclinaisons de bannière

Pars d'un dossier de bannière existant, et garde son identité, sa hiérarchie et son idée visuelle. Une déclinaison n'est pas un simple recadrage : recompose le contenu pour le format et la photo de profil de chaque réseau.

## Formats

Aucune de ces plateformes ne confirme ces valeurs sur une page officielle consultée : elles viennent de guides tiers, qui ne s'accordent pas tous. Dis-le à l'utilisateur et demande-lui de contrôler le rendu après l'envoi.

| Réseau | Taille | `banner-format` | À protéger |
|---|---|---|---|
| X | 1500 × 500 | `x` | Photo en bas à gauche : rien d'important dans le cercle centré vers x = 190, y = 500, de rayon 230. Le téléphone coupe le haut et le bas : marge verticale de 60 px |
| Facebook | 1640 × 624 | `facebook` | Tout le contenu dans les 1280 px centraux. Photo en bas à gauche : rien d'important dans le cercle centré vers x = 230, y = 610, de rayon 170 |
| WhatsApp Business | 1211 × 681 | `whatsapp` | Tout le contenu dans le rectangle x 150 à 1061, y 90 à 591. Photo centrée en bas : rien d'important dans le cercle centré vers x = 605, y = 660, de rayon 120 |

WhatsApp ne propose une photo de couverture que sur les comptes Business. Pour un compte personnel, propose plutôt la photo de profil.

Ces zones sont des estimations. Corrige ce fichier si un contrôle réel montre autre chose.

## Créer les déclinaisons

Crée les déclinaisons dans le même projet de la bibliothèque que la bannière de départ (voir « Où enregistrer » dans `../linkedin-banner/SKILL.md`). Fais un dossier par réseau et par langue, par exemple `x-fr` et `x-en`, avec son `banner.html`, sa police et ses images, et ces balises :

```html
<meta name="banner-size" content="1500x500">
<meta name="banner-format" content="x">
<meta name="banner-lang" content="fr">
```

- Redimensionne `html` et `body`, puis recalcule le fond et les motifs pour le nouveau format.
- Applique la règle d'alignement : contenu seul, centré entre lui ; visuel à côté, contenu aligné à gauche.
- Écarte du texte ce que le réseau affiche déjà ou ce qui ne sert pas : un seul CTA, et aucun bouton s'il ne correspond à aucune action possible sur ce réseau.
- Rédige toujours aussi la version anglaise. Écris un vrai texte anglais plutôt qu'une traduction mot à mot.
- N'ajoute ni chiffre, ni client, ni promesse absents de la bannière de départ.

## Contrôler et présenter

Ouvre l'éditeur sur le projet :

```bash
node ../linkedin-banner/editor/server.mjs <dossier-du-projet> --port 4180
```

Il lit la taille et le format de chaque dossier, affiche la bonne zone et la bonne photo simulée, et permet de filtrer par réseau et par langue. Vérifie que la photo simulée ne cache rien d'important, regarde chaque PNG, et ne publie jamais rien toi-même sans l'accord explicite de l'utilisateur.

## Sources des formats

- X : https://socialk.it, https://socialsizes.io
- Facebook : https://contentstudio.io, https://socialsizes.io
- WhatsApp : https://chatarmin.com, https://aiarty.com
