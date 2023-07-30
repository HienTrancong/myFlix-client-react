import React from 'react';
import { createRoot } from "react-dom/client";
import { Container } from 'react-bootstrap';

//Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Imprt mainView
import { MainView } from "./components/main-view/main-view";

//Main component  (will eventually use all the others)
const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  )
};

//Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Render root DOM element
root.render(<App />);