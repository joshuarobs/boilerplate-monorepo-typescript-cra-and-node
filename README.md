# Boilerplate Mono-repo in TypeScript with create-react-app and Node.js
A boilerplate for a fullstack monorepo in TypeScript with Create React App on the client, and Node.js (express) on the server. Uses Lerna for monorepo functionality.

Main technologies in this stack included:
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Create React App](https://github.com/facebook/create-react-app)
* [Lerna](https://github.com/lerna/lerna)

Additional technologies include:
* Express
* Eslint
* Jest
* Prettier

For the server side, we are using Express, but that can be easily swapped out for other frameworks if needed.

Additional CI/CD functionality include:
* Automated testing on commits (via GitHub Actions)
* Config files for easy integration and deployment with Heroku

# Usage
1. Clone the repo or simply paste all the files into an existing or newly created repo
2. 

# Use cases for this boilerplate
This boilerplate was originally intended to be used for a "fullstack" client for a web application. I needed a way to have both the front end code (React) be in the same repo as the server code (middleware GraphQL client, Apollo). My "client server" is a server that primarily handled database interactions on behalf of the database itself, that served the web app (client). Thus I required a monorepo to put the two original repos (client + server) together as they require each other for deployment.

The monorepo is intended to be deployed on Heroku, but is limited to only 1 of the packages that can be deployed. See limitations section below.

Additional packages can be added to the boilerplate, such as:
* [Storybook](https://github.com/storybookjs/storybook) prototyping
* Other side clients and servers
* etc.

# Limitations
## 1. Uses Lerna and yarn for monorepo functionality
I typically used npm entirely for my previous projects, but now I'll have to stick with yarn as this whole setup requires the use of yarn's workspace feature.

[Lerna](https://github.com/lerna/lerna) is required for monorepo functionality in general for Javascript based projects.

You may want to learn how these technologies work.

## 2. Heroku can only deploy 1 package
*Note: This limitation only applies if you're deploying on Heroku normally*

Given how Heroku deploys projects automatically via a `Procfile`, Heroku is only able to deploy 1 package (application) of this monorepo. That is, if you were to have a main client (React) and another sub-client (React), which both would be in their own individual packages, you'd have to pick which of the two you would like to deploy. What gets deployed is what's described in the `Procfile`.

The contents of the `Procfile` are:
````
web: node packages/server/build/src/index.js
````

That means when the Heroku app gets deployed, we are running on the web the node.js application, which is our "main" server. If we were to have another server, it probably wouldn't work, and you'd have to change what `index.js` file should be chosen to be operated. So while you can have multiple packages that have an `index.js` file, only one at a time can be chosen to be operated. One repo = one application, for Heroku. And in this setup, this monorepo is counted as a single repo.

Caveats: It's probably possible to run a database alongside this, but I haven't attempted to do so to add that in this boilerplate as my usecase doesn't require having a database included in the client-server monorepo.

Also on a side note, there may be a way to select a different `index.js` file, or a `Procfile` (assuming multiple of these) in Heroku with this buildpack: https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo

I haven't tried to configure Heroku with that buildpack, so I wouldn't know if it works or not, and if it's even viable to do so.

Naturally, if you aren't going to use Heroku, and will deploy this manually with other provides such as aws, then you can obviously choose to deploy whatever packages you wish.

## 3. TypeScript is required
I originally made this with the intention to work with TypeScript. As far as I'm concerned, there isn't any easy way to adjust this monorepo such that it'd work without TypeScript (vanilla JavaScript). I suppose you could just write normal JavaScript in the `.ts` files as TypeScript is a superset of JavaScript. Or you can instead learn TypeScript, which I think is the better option since it comes with more features and makes code completion and refactoring easier.
