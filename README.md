# Github with GraphQL App

## Installation

To run the app run `npm install`.
To start the app run 'npm start'.
To view the app visit localhost:3000

## Pre-requisite

You must have a Github personal access token to get this app working.
Once you have generated one, open "config.js" in src/config.js and replace null with your token.

Make sure your token has all scopes!

## Using the app

On page load, it loads a default user's github profile (mine) and a list of 10 repositories, ordered by created date, descending.
You can load any user you like on Github by typing the users name in the box and submitting.
