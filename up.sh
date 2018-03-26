#!/usr/bin/bash
set -e

read -p "Application Name " APPNAME
read -p "Auth0 Domain " AUTH0_DOMAIN
read -p "Auth0 Client ID " AUTH0_CLIENT_ID
read -p "Auth0 Client Secret " AUTH0_CLIENT_SECRET

export AUTH0_DOMAIN=$AUTH0_DOMAIN
export AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
export AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET

TEMPLATE_DIR=$(dirname $0)/templates
BINNAME=$(echo "$APPNAME" | sed -e 's/\(.*\)/\L\1/' | sed -e 's/ //g')

create-react-app $BINNAME

cd $BINNAME
git init .

graphcool init graph.cool.service

# Clean out some sample files
rm src/*.css src/App.test.js src/logo.svg
sed -i "s+import './index.css';++g" src/index.js
# TODO: If App.js doesn't become templated, we need to sed
# out some imports in there, too
rm graph.cool.service/src/*

# Edit some default values
sed -i "s/React App/$APPNAME/" public/index.html
sed -i "s/Create React App Sample/$APPNAME/" public/manifest.json
sed -i "s/React App/$APPNAME/" public/manifest.json
sed -i "s/graph.cool.service/$BINNAME/" graph.cool.service/package.json
sed -i "s/My Graphcool Service/$APPNAME/" graph.cool.service/package.json

# Set up graphcool
mkdir graph.cool.service/src/auth0
cp ../$TEMPLATE_DIR/auth0Authentication.graphql graph.cool.service/src/auth0
cp ../$TEMPLATE_DIR/auth0Authentication.js graph.cool.service/src/auth0

cp ../$TEMPLATE_DIR/graphcool.yml ../$TEMPLATE_DIR/types.graphql graph.cool.service/
cd graph.cool.service
yarn add jsonwebtoken jwks-rsa graphcool-lib

env


AUTH0_DOMAIN=$AUTH0_DOMAIN \
AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID \
AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET \
  graphcool deploy -c shared-us-west-2 -t dev -n $BINNAME

ENDPOINT=$(graphcool info | grep Simple | sed "s/Simple *//")

# Set up apollo in frontend
cd ../
mkdir src/authentication
pwd
ls
ls src
ls src/authentication
ls ../$TEMPLATE_DIR
cp ../$TEMPLATE_DIR/init_apollo.js src/
sed -i "s+__GRAPHCOOL_ENDPOINT__+$ENDPOINT+" src/init_apollo.js
# Set up auth in frontend
cp ../$TEMPLATE_DIR/auth0_config.js src/authentication
sed -i "s/__AUTH0_CLIENT_ID__/$AUTH0_CLIENT_ID/" src/authentication/auth0_config.js
sed -i "s/__AUTH0_DOMAIN__/$AUTH0_DOMAIN/" src/authentication/auth0_config.js
sed -i "s/__APPNAME__/$BINNAME/" src/authentication/auth0_config.js
cp ../$TEMPLATE_DIR/AuthCallback.js src/authentication
cp ../$TEMPLATE_DIR/AuthButton.js src/authentication
cp ../$TEMPLATE_DIR/auth_graphql.js src/authentication
cp ../$TEMPLATE_DIR/index.js src/
cp ../$TEMPLATE_DIR/App.js src/

yarn add \
  react-router-dom \
  react-router \
  react \
  apollo-client \
  react-apollo \
  graphql-tag \
  auth0-js \
  apollo-cache-inmemory \
  apollo-link-http \
  apollo-link-context \
  graphql


echo BROWSER=none > .env


# TODO:
#  *  yarn add appropriate stuff in the react directory
#  *  echo BROWSER=none > .env
#  * test all the brokens
