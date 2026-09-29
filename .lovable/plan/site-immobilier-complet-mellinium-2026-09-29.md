# Site immobilier complet Mellinium

## Objectif
Transformer l’expérience actuelle en véritable site d’agence immobilière, sans perdre son récit photographique immersif noir et or.

## Ce qui sera construit
- Intégrer le nouveau logo transparent dans l’en-tête, le menu et le pied de page.
- Ajouter une vraie page de recherche de biens avec filtres vente/location, localisation, type, pièces et budget.
- Créer une recherche guidée qui se construit étape par étape au défilement, avec des wagons visuels reliés sur un rail et une récapitulation finale.
- Ajouter une page de détail pour chaque bien, avec galerie, caractéristiques et demande de visite.
- Relier les biens de la page d’accueil aux nouvelles pages et ajouter une navigation cohérente entre accueil, recherche et détails.
- Renforcer la profondeur des animations existantes : perspective, mouvements de plans photographiques, cartes inclinées et transitions en couches, sans rendre la lecture difficile.
- Ajouter les réseaux sociaux dans le menu, le contact et le pied de page.

## Contenu et comportement
- Utiliser les photos et informations de démonstration déjà présentes, clairement présentées comme une sélection éditoriale.
- Les filtres fonctionneront immédiatement sur les biens disponibles dans le site.
- Les liens sociaux et coordonnées resteront provisoires tant que les adresses officielles ne sont pas fournies.
- Toutes les pages fonctionneront sur mobile et ordinateur, avec animations réduites selon les préférences d’accessibilité.

## Détails techniques
- Conserver l’application côté client et l’architecture TanStack actuelle.
- Centraliser les données des biens pour éviter les incohérences entre accueil, résultats et fiches.
- Créer des pages distinctes pour `/biens` et `/biens/$propertyId` avec leurs propres titres et descriptions de partage.
- Réaliser les effets de profondeur en CSS et au mouvement du pointeur/défilement, sans réintroduire une scène WebGL lourde.
- Vérifier les filtres, la navigation, les pages de détail, le menu et l’affichage mobile dans le navigateur.
