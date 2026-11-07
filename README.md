<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/bannia-horizontal-ondark.svg">
    <img src=".github/bannia-horizontal.svg" alt="Bannia" width="320">
  </picture>
</p>

# Bannia : crée ta bannière LinkedIn avec l'IA

Quatre skills pour [Claude Code](https://claude.com/claude-code) et un mini-éditeur local. Avec eux, tu crées ta bannière LinkedIn, ses déclinaisons pour X, Facebook et WhatsApp, ses éditions de fête et les visuels de ta section Sélection. Gratuit.

| Skill | Ce qu'il fait |
|---|---|
| `linkedin-banner` | Te pose quelques questions, choisit des références, propose trois directions de bannière en 1584 × 396, en français et en anglais, puis les exporte en PNG. |
| `banner-adapt` | Recompose ta bannière pour X (1500 × 500), Facebook (1640 × 624) et WhatsApp Business (1211 × 681). |
| `banner-festive` | Habille ta bannière pour une fête (Noël, Halloween, Nouvel An, Ramadan et Aïd, Black Friday, fête nationale…) en trois intensités, du clin d'œil à l'édition spéciale, sans toucher à l'originale. |
| `linkedin-featured` | Crée un visuel de section Sélection en 1200 × 627, construit autour d'un seul but : réserver un appel, visiter ton site, montrer tes réalisations… |

L'éditeur, dans `skills/linkedin-banner/editor/`, compare les directions et filtre par format, par langue et par fête. Il permet de déplacer, modifier, commenter et exporter. Tes commentaires sont enregistrés dans un fichier que Claude lit pour appliquer tes retours.

## Ce qu'il te faut

- **Claude Code**, dans le terminal ou l'application Claude, avec un compte Claude.
- **Node.js** 18 ou plus récent, pour lancer l'éditeur.
- **Chrome ou Edge** installé sur ta machine, pour l'export en PNG. L'éditeur le trouve aux emplacements habituels ; sinon, indique son chemin dans la variable d'environnement `CHROME_PATH`.
- **Tes propres références** d'inspiration : elles ne sont pas fournies (voir plus bas).

## Installation

1. Clone le dépôt :

   ```bash
   git clone https://github.com/lyrad9/bannia.git
   ```

2. Copie les quatre dossiers de `skills/` dans le dossier `.claude/skills/` du projet où tu travailles avec Claude Code. Crée-le s'il n'existe pas :

   ```bash
   mkdir -p mon-projet/.claude/skills
   cp -r bannia/skills/* mon-projet/.claude/skills/
   ```

   Sous Windows, dans PowerShell :

   ```powershell
   New-Item -ItemType Directory -Force mon-projet\.claude\skills
   Copy-Item -Recurse bannia\skills\* mon-projet\.claude\skills\
   ```

   Pour les avoir dans tous tes projets, copie-les plutôt dans `~/.claude/skills/` (sous Windows : `$HOME\.claude\skills\`).

   Aucun plugin ni `npm install` n'est nécessaire : Claude Code détecte tout seul les skills de ce dossier.

3. Ouvre Claude Code dans ce projet et écris : « Crée-moi une bannière LinkedIn ». Plus tard, pour une fête : « Fais-moi la version Noël de ma bannière ».

## Les références ne sont pas incluses

Les skills s'inspirent de vraies bannières et de vrais visuels de Sélection pour leur composition. Ces images appartiennent à leurs auteurs, et beaucoup viennent de profils de personnes réelles : elles ne sont donc pas dans ce dépôt.

Tu constitues les tiennes en une vingtaine de minutes :

1. **Bannières :** sur Pinterest, cherche « linkedin banner ». Découpe les planches pour garder une bannière par image, au format 1584 × 396 si possible. Range-les dans `.claude/skills/linkedin-banner/references/images/pinterest/`, nommées `P01.png`, `P02.png`…
2. **Visuels de Sélection :** fais des captures des sections Sélection de profils LinkedIn qui t'inspirent. Range-les dans `.claude/skills/linkedin-banner/references/images/selection/`, nommées `F01.png`, `F02.png`…
3. **Index :** décris chaque image dans `references/index.md` et `references/selection.md`, en suivant le modèle. Tu peux le demander à Claude : « Regarde mes références et remplis index.md et selection.md. »

Le détail est dans [`skills/linkedin-banner/references/README.md`](skills/linkedin-banner/references/README.md). Sans référence, les skills fonctionnent quand même : Claude te le signale et s'appuie sur ses règles de composition.

Le `.gitignore` de ce dépôt ignore le contenu de `references/images/`, pour que tes références ne partent pas par erreur sur GitHub.

## Ta bibliothèque

Toutes tes créations sont rangées au même endroit : ta bibliothèque. Par défaut, c'est le dossier `Bannia` de ton dossier personnel (`~/Bannia`, sous Windows `C:\Users\<toi>\Bannia`).

- À ta première bannière, Claude te dit où elle sera enregistrée et te demande si cet emplacement te convient.
- Chaque projet a son sous-dossier, avec un dossier par direction et par langue. Les déclinaisons, les visuels de Sélection et les éditions de fête vont dans le même projet.
- Le chemin choisi est enregistré dans `~/.bannia/config.json`. Tu peux le changer depuis l'éditeur, avec « Mes bannières » puis « Changer ».

## L'éditeur

Claude le lance pour toi. Tu peux aussi l'ouvrir toi-même :

```bash
node .claude/skills/linkedin-banner/editor/server.mjs --port 4180
```

Puis ouvre http://localhost:4180. Sans dossier indiqué, l'éditeur ouvre le dernier projet modifié de ta bibliothèque. Pour ouvrir un autre dossier, ajoute son chemin avant `--port`. Il peut contenir un `banner.html`, ou plusieurs sous-dossiers qui en contiennent chacun un. Un exemple neutre se trouve dans `skills/linkedin-banner/exemple/`.

Dans l'éditeur, tu peux :

- comparer les bannières côte à côte, et les filtrer par format, par langue et par fête ;
- modifier les éléments, ajouter du texte, des images, des formes et des flèches ;
- simuler ta photo de profil et la zone cachée sur mobile ;
- commenter avec un point, une zone, une flèche ou un tracé libre ;
- exporter en PNG ;
- ouvrir tes autres projets avec « Mes bannières », sans passer par l'explorateur de fichiers, changer le dossier de ta bibliothèque ou y ajouter le projet ouvert ;
- adapter ta bannière à une fête ou un thème : choisis la fête, l'intensité, et si tu veux un message ou une offre, puis clique sur « Copier le prompt ». Colle-le dans Claude : il crée la version de fête dans le même projet.

Il enregistre tout seul `banner.html`, tes commentaires dans `retours.json` et le PNG.

## Bon à savoir

- Rien n'est inventé : chiffres, clients, logos et résultats viennent de tes réponses. Demande l'accord des clients dont tu affiches le logo.
- Les dimensions des réseaux viennent de guides tiers, pas de pages officielles : vérifie le rendu après l'envoi.
- Claude ne publie jamais rien à ta place.

## Soutenir le projet

Bannia est gratuit. S'il t'est utile, laisse une étoile ⭐ au dépôt sur [GitHub](https://github.com/lyrad9/bannia) : ça aide d'autres personnes à le trouver.

## Licence

Code et skills sous licence MIT (voir [LICENSE](LICENSE)). La police Inter, incluse dans l'éditeur et l'exemple, est distribuée sous licence SIL Open Font License 1.1.

Claude est une marque d'Anthropic. Ce pack est indépendant, sans lien avec Anthropic. LinkedIn, X, Facebook et WhatsApp sont des marques de leurs propriétaires.

Site du pack : [bannia.lyrad.dev](https://bannia.lyrad.dev). Par [Daryl Ngako](https://lyrad.dev).
