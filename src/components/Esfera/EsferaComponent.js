import React, { useState } from "react";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import "./EsferaStyles.css";

function EsferaComponent({ onAddMessage, imgSrc }) {
  const [message, setMessage] = useState("");

  return (
    <div id="esfera" className="esfera-container">
      <img src={imgSrc} alt="Esfera" className="esfera-img" draggable="false" />
      <Grid className="form-container">
        <Typography variant="h6" style={{ color: "whitesmoke" }}>
          Pon en palabras tu deseo!
        </Typography>
        <TextField
          color="primary"
          variant="outlined"
          id="message"
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
          Colócame en el árbol!
        </Button>
      </Grid>
    </div>
  );
}

export default EsferaComponent;
