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
// import MousePointer from "../MousePointer/MousePointer";
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

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [pointer, setPointer] = useState(false);
  const [adornos, setAdornos] = useState([]);
  const [modalMessage, setModalMessage] = useState("");

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
        x: x,
        y: y,
        message: userMessage,
      });
      setPointer(false);
    }
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
        <Typography align="center" variant="h3">
          Adorna nuestro árbol navideño con tus deseos...
        </Typography>
        <Grid container md={12} item>
          <Grid item xs={12} md={6} className="arbol-container">
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
          <Grid item xs={12} md={6} className="esfera-container">
            {userMessage ? undefined : (
              <EsferaComponent onAddMessage={onAddMessage} />
            )}
          </Grid>
        </Grid>
      </Container>
      {modalMessage && (
        <MessageDialog message={modalMessage} onClose={closeModal} />
      )}
    </ThemeProvider>
  );
}

export default App;
