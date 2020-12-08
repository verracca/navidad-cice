import React, { useState } from "react";
import "./App.css";
import ArbolComponent from "../Arbol/ArbolComponent";
import EsferaComponent from "../Esfera/EsferaComponent";
import AdornoComponent from "../Adorno/AdornoComponent";
import { Typography, Grid, Container } from "@material-ui/core";

const adornos = [
  {
    x: 47,
    y: 18,
    message: "Happy xmas",
  },
  {
    x: 20,
    y: 85,
    message: "Frosty the snowman",
  },
  {
    x: 85,
    y: 85,
    message: "It´s beggining to look a lot like xmas",
  },
  {
    x: 45,
    y: 60,
    message: "It´s beggining to look a lot like xmas",
  },
  {
    x: 40,
    y: 70,
    message: "It´s beggining to look a lot like xmas",
  },
];

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [pointer, setPointer] = useState(false);

  const onAddAdorno = ({ x, y }) => {
    // mando a la base de datos el nuevo mensaje con
    // la posicion x,y y el mensaje que tengo almacenado
    // en algun OTRO lado
  };

  const onAddMessage = (message) => {
    setUserMessage(message);
    setPointer(true);
  };

  return (
    <>
      <Container
        className={`app-container ${pointer ? "pointer" : ""}`}
        maxWidth="xl"
      >
        <Typography
          align="center"
          variant="h1"
          style={{ fontFamily: "Dancing Script" }}
          className="title"
        >
          Adorna este árbol navideño con tus deseos
        </Typography>
        <Grid container justify="space-around">
          <Grid item xs={6} className="arbol-container">
            <ArbolComponent onAddAdorno={onAddAdorno}>
              {adornos.map((adorno, index) => (
                <AdornoComponent key={index} {...adorno} />
              ))}
            </ArbolComponent>
          </Grid>
          <Grid item xs={6} className="esfera-container">
            {userMessage ? undefined : (
              <EsferaComponent onAddMessage={onAddMessage} />
            )}
          </Grid>
        </Grid>
      </Container>
      {/* <MousePointer /> */}
    </>
  );
}

export default App;
