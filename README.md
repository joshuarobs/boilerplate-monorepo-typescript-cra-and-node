# Boilerplate Mono-repo in TypeScript with Create React App and Node.js
A boilerplate for a fullstack monorepo in TypeScript with Create React App on the client, and Node.js (express) on the server. Uses Lerna for monorepo functionality.

Based off https://github.com/michaljach/modern-monorepo-boilerplate

This was created because the above boilerplate:
1. Doesn't include a template package for a Node.js server
2. Doesn't include GitHub Action CI/CD integrations
3. Doesn't include built-in Heroku deployment configurations

# Stack and features

Main technologies in this stack included:
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Create React App](https://github.com/facebook/create-react-app)
* [Lerna](https://github.com/lerna/lerna)

Additional technologies include:
* Express
* Eslint
* Jest
* Prettier
* Nodemon

For the server side, we are using Express, but that can be easily swapped out for other frameworks if needed.

Additional CI/CD functionality include:
* Automated testing on commits (via GitHub Actions)
* Config files for easy integration and deployment with Heroku

# Usage
Prior to any usage, you should learn the concepts of 
[Lerna](https://github.com/lerna/lerna) as the whole monorepo revolves 
around this library. Otherwise if you don't, you may not fully understand 
the structure of the monorepo and how it operates. 

1. Clone the repo or simply paste all the files into an existing or newly created repo
2. Run `yarn install`
3. Run `yarn bootstrap`
4. Run `yarn start`

It should then proceed to open a new window in your browser on 
`localhost:3000` where you should see a working page. If the client 
successfully connected to the server, you should see a `Hello from server!` 
text appear below the title. If it's stuck on `Loading...`, then the client 
somehow can't access the server.

## Future usage
After the initial setup, you can run the other commands for additional 
functionality.

### `yarn build`
The build script can be called manually to build all the packages and create 
output JavaScript files based on the TypeScript files. The output files are 
generated in each package, in a `build/` folder.

This is also called automatically when needed during CI/CD.

### `yarn start`
When doing development, you'll be running this as usual. This should run all 
the packages together, where you'll have both the client and server deployed
at the same time. The client can then interact with the server.

The client runs on `localhost:3000`. The server runs on `localhost:3001` but 
will only work if the project was built at least once before with `yarn 
build` (see above). Checking the server gives you an idea of how it will 
look/behave during actual deployment. Create React App hot reloading will 
only work on port `3000`.

Development UX was considered into this monorepo, so that any changes to the 
client or server should automatically build and you can see live changes in 
the browser. Client hot reloading is handled by Create React App, whereas 
server reloading is handled by Nodemon.

### `yarn test`
Tests for all the packages can be run at any time with this command.

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

## 4. The build script for the server may fail if on Windows
The build script of the server is called automatically when the whole 
monorepo's build script is called (via `yarn build` in the root directory).
The command `rm -rf build/` is called prior to compiling the TypeScript 
files to clean the `build/` folder of old files. This command may not work 
on Windows.
