import React, { useState } from "react";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import "./EsferaStyles.css";

import esfera from "./esfera.png";

function EsferaComponent({ onAddMessage }) {
  const [message, setMessage] = useState("");

  return (
    <div id="esfera" className="esfera-container">
      <img src={esfera} alt="Esfera" className="esfera-img" draggable="false" />
      <Grid className="form-container">
        <Typography variant="h6" style={{ color: "whitesmoke" }}>
          Pon en palabras tu deseo!
        </Typography>
        <TextField
          id="message"
          variant="outlined"
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button
          style={{
            backgroundColor: "#9FA370",
            color: "whitesmoke",
            fontWeight: "bold",
            marginTop: "7px",
          }}
          variant="contained"
          disabled={!message}
          onClick={() => onAddMessage(message)}
        >
          Colócame en el arbol!
        </Button>
      </Grid>
    </div>
  );
}

export default EsferaComponent;
