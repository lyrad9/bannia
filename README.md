# Crée ta bannière LinkedIn avec l'IA

Trois skills pour [Claude Code](https://claude.com/claude-code) et un mini-éditeur local. Avec eux, tu crées ta bannière LinkedIn, ses déclinaisons pour X, Facebook et WhatsApp, et les visuels de ta section Sélection. Gratuit.

| Skill | Ce qu'il fait |
|---|---|
| `linkedin-banner` | Te pose quelques questions, choisit des références, propose trois directions de bannière en 1584 × 396, en français et en anglais, puis les exporte en PNG. |
| `banner-adapt` | Recompose ta bannière pour X (1500 × 500), Facebook (1640 × 624) et WhatsApp Business (1211 × 681). |
| `linkedin-featured` | Crée un visuel de section Sélection en 1200 × 627, construit autour d'un seul but : réserver un appel, visiter ton site, montrer tes réalisations… |

L'éditeur, dans `skills/linkedin-banner/editor/`, compare les directions et filtre par format et par langue. Il permet de déplacer, modifier, commenter et exporter. Tes commentaires sont enregistrés dans un fichier que Claude lit pour appliquer tes retours.

## Ce qu'il te faut

- **Claude Code**, dans le terminal ou l'application Claude, avec un compte Claude.
- **Node.js** 18 ou plus récent, pour lancer l'éditeur.
- **Chrome ou Edge** installé sur ta machine, pour l'export en PNG. L'éditeur le trouve aux emplacements habituels ; sinon, indique son chemin dans la variable d'environnement `CHROME_PATH`.
- **Tes propres références** d'inspiration : elles ne sont pas fournies (voir plus bas).

## Installation

1. Clone le dépôt :

   ```bash
   git clone https://github.com/lyrad9/banniere-linkedin-ia.git
   ```

2. Copie les trois dossiers de `skills/` dans le dossier `.claude/skills/` du projet où tu travailles avec Claude Code. Crée-le s'il n'existe pas :

   ```bash
   mkdir -p mon-projet/.claude/skills
   cp -r banniere-linkedin-ia/skills/* mon-projet/.claude/skills/
   ```

   Pour les avoir dans tous tes projets, copie-les plutôt dans `~/.claude/skills/`.

3. Ouvre Claude Code dans ce projet et écris : « Crée-moi une bannière LinkedIn ».

## Les références ne sont pas incluses

Les skills s'inspirent de vraies bannières et de vrais visuels de Sélection pour leur composition. Ces images appartiennent à leurs auteurs, et beaucoup viennent de profils de personnes réelles : elles ne sont donc pas dans ce dépôt.

Tu constitues les tiennes en une vingtaine de minutes :

1. **Bannières :** sur Pinterest, cherche « linkedin banner ». Découpe les planches pour garder une bannière par image, au format 1584 × 396 si possible. Range-les dans `.claude/skills/linkedin-banner/references/images/pinterest/`, nommées `P01.png`, `P02.png`…
2. **Visuels de Sélection :** fais des captures des sections Sélection de profils LinkedIn qui t'inspirent. Range-les dans `.claude/skills/linkedin-banner/references/images/selection/`, nommées `F01.png`, `F02.png`…
3. **Index :** décris chaque image dans `references/index.md` et `references/selection.md`, en suivant le modèle. Tu peux le demander à Claude : « Regarde mes références et remplis index.md et selection.md. »

Le détail est dans [`skills/linkedin-banner/references/README.md`](skills/linkedin-banner/references/README.md). Sans référence, les skills fonctionnent quand même : Claude te le signale et s'appuie sur ses règles de composition.

Le `.gitignore` de ce dépôt ignore le contenu de `references/images/`, pour que tes références ne partent pas par erreur sur GitHub.

## L'éditeur

Claude le lance pour toi. Tu peux aussi l'ouvrir toi-même sur un dossier de bannières :

```bash
node .claude/skills/linkedin-banner/editor/server.mjs mes-bannieres --port 4180
```

Puis ouvre http://localhost:4180. Le dossier peut contenir un `banner.html`, ou plusieurs sous-dossiers qui en contiennent chacun un. Un exemple neutre se trouve dans `skills/linkedin-banner/exemple/`.

Dans l'éditeur, tu peux :

- comparer les bannières côte à côte ;
- modifier les éléments, ajouter du texte, des images, des formes et des flèches ;
- simuler ta photo de profil et la zone cachée sur mobile ;
- commenter avec un point, une zone, une flèche ou un tracé libre ;
- exporter en PNG.

Il enregistre tout seul `banner.html`, tes commentaires dans `retours.json` et le PNG.

## Bon à savoir

- Rien n'est inventé : chiffres, clients, logos et résultats viennent de tes réponses. Demande l'accord des clients dont tu affiches le logo.
- Les dimensions des réseaux viennent de guides tiers, pas de pages officielles : vérifie le rendu après l'envoi.
- Claude ne publie jamais rien à ta place.

## Licence

Code et skills sous licence MIT (voir [LICENSE](LICENSE)). La police Inter, incluse dans l'éditeur et l'exemple, est distribuée sous licence SIL Open Font License 1.1.

Claude est une marque d'Anthropic. Ce pack est indépendant, sans lien avec Anthropic. LinkedIn, X, Facebook et WhatsApp sont des marques de leurs propriétaires.

Par [Daryl Ngako](https://lyrad.dev).
