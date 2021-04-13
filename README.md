# Project Name
> Recipe Collection Web Application

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Screenshots](#screenshots)

## General info
This web application allows users to create, view, edit, and delete individual recipe records.
They can also discover new recipes on the application via a collection of recipes loaded from a 3rd party service, TheMealDB API (API calls made on change event on category selection field).
A host of well-known food sources are also included on the site to provide users with an opportunity to discover additional 3rd party sites.

## Technologies
* Materialize
* MongoDB
* Node.js
* JavaScript
* CSS3
* Handlebars
* Express

## Setup
Here's a link to the live version of the site: [Site Link](https://recipe-repository-collection.herokuapp.com)

For installation, navigate to a terminal window and enter the below command. This will download the project to your local machine.

```bash
git clone https://github.com/JohnDennehy101/recipeRepository
```

Once installed, navigate to the root project folder
```bash
cd recipeRepository
```

To run the project, the node modules need to be installed.

```npm
npm install
```

Once that is completed, the project can be launched locally.

```npm
npm start
```

This will start the project on localhost.
Open a browser and enter http://localhost:{port number here} in the browser address bar.

## Features
List of features ready and TODOs for future development
* Create, read, update, delete recipe records
* Search functionality in place makes query to live MongoDB database
* API calls in place for TheMealDB API to obtain all recipes of user's chosen category
* Collection of 3rd party sources for additional recipes

To-do list:
* Add weekly meal planner for users
* Email subscription for recommended recipes
* Allow users to upload images of completed recipe
* Reviews of existing recipes

## Screenshots
* Dashboard View with Search Functionality
<img src="https://media.giphy.com/media/ApqjTRWTBrPQBYzHMT/giphy.gif" width="550" height="350"/>

* View Recipe
<img src="https://media.giphy.com/media/zRsQBRj9LlXD5Ka3iq/giphy.gif" width="550" height="350"/>

* Add Recipe Form
<img src="https://media.giphy.com/media/EGmPwj3eBnjXgG47gM/giphy.gif" width="550" height="350"/>

* API response from TheMealDB API
<img src="https://media.giphy.com/media/jbY2umxFawm4n2uOcq/giphy.gif" width="550" height="350"/>

* Edit Recipe
<img src="https://media.giphy.com/media/EX5Mx7EW2g9jVRtfOV/giphy.gif" width="550" height="350"/>

* Collection of 3rd party recipe sources
<img src="https://media.giphy.com/media/FcQj4Rb6YJ9I3wgJmR/giphy.gif" width="550" height="350"/>

* Multiple API Calls
<img src="https://media.giphy.com/media/Ry1I9WS6B6M3etdIUD/giphy.gif" width="550" height="350"/>






