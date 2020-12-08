import React, { useState } from "react";
import {
  Typography,
  Grid,
  Container,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";
import ArbolComponent from "../Arbol/ArbolComponent";
import EsferaComponent from "../Esfera/EsferaComponent";
import AdornoComponent from "../Adorno/AdornoComponent";
import MessageDialog from "./../MessageDialog/MessageDialog";
import MousePointer from "../MousePointer/MousePointer";

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "transparent",
      },
      elevation24: {
        boxShadow: 0,
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
});

const adornosDefault = [
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
  const [adornos, setAdornos] = useState(adornosDefault);
  const [modalMessage, setModalMessage] = useState("");

  const onAddMessage = (message) => {
    setUserMessage(message);
    setPointer(true);
  };

  const onAddAdorno = ({ x, y }) => {
    if (pointer) {
      setAdornos([...adornos, { x: x, y: y, message: userMessage }]);
      setPointer(false);
    }

    // mando a la base de datos el nuevo mensaje con
    // la posicion x,y y el mensaje que tengo almacenado
    // en algun OTRO lado
  };

  const openModal = (message) => {
    setModalMessage(message);
  };

  const closeModal = () => {
    setModalMessage("");
  };

  return (
    <ThemeProvider theme={theme}>
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
                <AdornoComponent
                  key={index}
                  {...adorno}
                  disabled={pointer}
                  onClick={openModal}
                />
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
      {modalMessage && (
        <MessageDialog message={modalMessage} onClose={closeModal} />
      )}
      {/* {pointer && <MousePointer />} */}
    </ThemeProvider>
  );
}

export default App;
