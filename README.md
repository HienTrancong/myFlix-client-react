# myFlix

## About

This app provide a list of movies and related information including each movie's description, genre, director information. It allows user to register and add movies to their favorite movies list.

This app uses React build client-site based on existing server-side code (REST API and database)

## Essential Views and Features

### Main view

- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering movies
- Ability to select a movie for more details

### Single movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add or remove a movie to their list of favorites

### Registration view

- Allows new users to register (username, password, email, birthday)

### Login view

- Allows users to log in with a username and password

### Profile view

- Allows user to see and update their user's information
- Allows user to see their list of favorite movies, and to remove any movie from the list
- Allows user to unregister

### Genre view

- Returns data about a genre, with a name and description

### Director view

- Returns data about a director (name, bio, birth year, death year)
- Displays example movies

## Technical requirements

- SPA application using React
- Use Parcel as build tool
- Use react-router-dom to navigate between views
- Use react-bootstrap as UI library
- Use react-redux for statemamagement (Redux pattern)
- Contain mix of class and function components
- Use axios to connect to API (for user and movies data)

## How to install and run project

- Clone git

```bash
https://github.com/HienTrancong/myFlix-client-react.git
```

- Use parcel to build

```bash
  parcel src/index.html
```
