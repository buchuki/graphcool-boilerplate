# React Graphcool Boilerplate

Seems everyone likes to make boilerplate projects that nobody else uses. Let
me try that!

I've become increasingly confident that backend as a service is the way to go.
React is obviously the best choice for frontend. GraphQL is a wonderful way to
make queries. Graphcool is a great service for generating GraphQL queries and it
can be self hosted, avoiding the Parse effect. Apollo is a nice library for
making graphql queries and can also be used as an alternative to redux.
Authentication really sucks in general and auth0 doesn't make it much easier,
but at least it deals with security and version upgrades. I don't care for
react-router, but it's industry standard and works well with Apollo.

## Prerequisites:

* Install the [yarn](https://yarnpkg.com/en/) binary
* `yarn global add create-react-app`
* `yarn global add graphcool`

## Manual stuff

* Set up an auth0 account with:
  * App name you will use for the repo
  * Type single page application
  * callback url `http://localhost:3000/auth0_callback`
  * Advanced - Grant type: Implicit

## Running

Run the `up.sh` script and follow the prompts. I'll probably wish I'd done this
in Python.

## What it does

* Inits a git repo
* creates a react app
* cleans out cruft from the react app
* adds the .env file with browser none
* yarn adds a bunch of deps
* creates a graphcool service definition
* sets up auth0 with graphcool
  * It follows https://medium.com/@quiaro/authentication-inside-a-graphcool-service-using-auth0-5056806d02f0
  * Doesn't use the templates shipped with graphcool, they don't work right for me
* creates some components for authentication

## Postrequisites:

* Make a real favicon for yourself in `public/`
* Edit `public/manifest.json` to have your name if default sucks
* Edit title in `public/index.html`
* Edit `package.json` and `graph.cool.schema/package.json` if necessary

## Graphcooling

* Make some types in `types.graphcool`
* Edit some permissions in `graphcool.yml`

## Reacting

* Add some components in `src/`
