## Description

Ce projet est une API REST pour la gestion des utilisateurs, construite avec NestJS. Il inclut des tests unitaires et d'intégration pour vérifier le bon fonctionnement des différentes couches de l'application, utilisant un fichier JSON comme base de données pour les tests d'intégration.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

1. **Node.js** et **npm** : Vous pouvez télécharger et installer Node.js à partir de [nodejs.org](https://nodejs.org/).

   - Vérifiez l'installation en exécutant :
     ```bash
     node -v
     npm -v
     ```

2. **NestJS CLI** : Pour faciliter le développement avec NestJS, installez le CLI globalement :
   ```bash
   npm install -g @nestjs/cli
   ```

## Installation

Suivez les étapes ci-dessous pour configurer et lancer le projet sur votre machine locale.

1. **Cloner le dépôt :**

   ```bash
   git clone <URL_DU_REPO>
   cd <NOM_DU_REPO>
   ```

2. **Installer les dépendances :**
   Dans le répertoire du projet, installez toutes les dépendances nécessaires avec npm :

   ```bash
   npm install
   ```

3. **Configurer l'environnement :**
   Créez un fichier `.env` à la racine du projet si vous souhaitez configurer des variables d'environnement spécifiques. Le projet peut fonctionner sans configuration spéciale, mais cela peut être utile pour définir des configurations personnalisées.

4. **Lancer l'application en mode développement :**
   Vous pouvez maintenant lancer le projet en utilisant la commande suivante :
   ```bash
   npm run start:dev
   ```
   Cela démarrera le serveur en mode développement et surveillera les changements dans les fichiers pour un redémarrage automatique.

## Utilisation

L'API expose plusieurs endpoints pour gérer les utilisateurs. Voici les principaux endpoints disponibles :

- `GET /users` : Récupère la liste de tous les utilisateurs.
- `GET /users/:id` : Récupère les détails d'un utilisateur spécifique par son ID.
- `POST /users` : Crée un nouvel utilisateur.
  - Corps de la requête attendu :
    ```json
    {
      "name": "Nom de l'utilisateur",
      "email": "email@domaine.com"
    }
    ```

## Tests

Le projet inclut des tests unitaires et d'intégration pour vérifier le bon fonctionnement de l'application.

1. **Exécuter les tests unitaires :**
   Les tests unitaires vérifient les méthodes des services et sont isolés grâce à l'utilisation de mocks.

   ```bash
   npm run test
   ```

2. **Exécuter les tests avec couverture :**
   Pour obtenir un rapport de couverture de test, vous pouvez exécuter :

   ```bash
   npm run test:cov
   ```

   Cela génèrera un rapport détaillant quelles parties du code sont couvertes par les tests.

3. **Exécuter les tests d'intégration :**
   Les tests d'intégration utilisent un fichier JSON temporaire pour simuler la base de données. Pour exécuter ces tests :
   ```bash
   npm run test
   ```

## Structure du Projet

Voici un aperçu de la structure des dossiers importants dans le projet :

```
src/
│
├── app.module.ts
├── main.ts
│
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.repository.ts
│   ├── dto/
│   ├── interfaces/
│   └── tests/
│
└── db/                    # BDD JSON utilisée pour les tests d'intégration
```
