import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import esfera from "../../assets/esfera.png";
import esferaVerde from "../../assets/esferaVerde.png";
import esferaGorro from "../../assets/esferaGorro.png";
import pointer0 from "../../assets/pointer0.png";
import pointer1 from "../../assets/pointer1.png";
import pointer2 from "../../assets/pointer2.png";

import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIA_Wcy9pbfzO2cdNeePCVpzoEn41bZ2U",
  authDomain: "navidad-cice.firebaseapp.com",
  projectId: "navidad-cice",
  storageBucket: "navidad-cice.appspot.com",
  messagingSenderId: "675258996631",
  appId: "1:675258996631:web:eb0e0a352450ba26c0d6d2",
};

firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
  },

  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 12,
  },
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
    MuiInputBase: {
      root: {
        color: "whitesmoke",
      },
    },
    Mui: {
      root: {
        "&$focused": {
          color: "whitesmoke",
        },
      },
    },
  },
});

theme.typography.h3 = {
  fontSize: "3rem",
  color: "#F9F6F1",
  fontFamily: "Dancing Script",

  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
    color: "#F9F6F1",
    fontFamily: "Dancing Script",
  },
};

const images = [esfera, esferaVerde, esferaGorro];
const pointers = [pointer0, pointer1, pointer2];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const selectedImgNum = getRandomInt(0, images.length);

const getImg = (imgNum = selectedImgNum) => images[imgNum];

const getPointer = () => pointers[selectedImgNum];

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [pointer, setPointer] = useState(false);
  const [adornos, setAdornos] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalImg, setModalImg] = useState(0);

  const location = useLocation();
  const messages = useRef(
    firebase
      .database()
      .ref(`${location.pathname.replace("/", "") || "public"}/messages`)
  );

  console.log();

  useEffect(() => {
    return messages.current.on("value", (snapshot) => {
      const dbValues = snapshot.val();
      if (dbValues) {
        const messages = Object.values(dbValues);
        setAdornos(messages);
      }
    });
  }, [messages]);

  const onAddMessage = (message) => {
    setUserMessage(message);
    setPointer(true);
  };

  const onAddAdorno = ({ x, y }) => {
    if (pointer) {
      messages.current.push({
        imgSrc: selectedImgNum,
        x: x,
        y: y,
        message: userMessage,
      });
      setPointer(false);
    }
  };

  const openModal = (message, imgSrc) => {
    setModalMessage(message);
    setModalImg(imgSrc);
  };

  const closeModal = () => {
    setModalMessage("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        className={`app-container`}
        style={{
          cursor: pointer && `url(${getPointer()}), auto`,
        }}
        maxWidth="xl"
      >
        <Typography align="center" variant="h3">
          🎅¡Compartí tu deseo de Navidad en el arbolito de CICE!🎅
        </Typography>
        <Grid container md={12} item>
          <Grid item xs={12} md={6} className="arbol-container">
            <ArbolComponent onAddAdorno={onAddAdorno}>
              {adornos.map((adorno, index) => (
                <AdornoComponent
                  key={index}
                  {...adorno}
                  imgSrc={getImg(adorno.imgSrc || 0)}
                  disabled={pointer}
                  onClick={openModal}
                />
              ))}
            </ArbolComponent>
          </Grid>
          <Grid item xs={12} md={6} className="esfera-container">
            {userMessage ? undefined : (
              <EsferaComponent onAddMessage={onAddMessage} imgSrc={getImg()} />
            )}
          </Grid>
        </Grid>
      </Container>
      {modalMessage && (
        <MessageDialog
          message={modalMessage}
          imgSrc={modalImg}
          onClose={closeModal}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
