import React from "react";
import { Dialog } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./styles.css";

import santa from "../../assets/santa.jpg";

export default function MessageDialog({ onClose }) {
  return (
    <div>
      <Dialog
        open={true}
        onClose={onClose}
        onClick={onClose}
        maxWidth="md"
        fullWidth
      >
        <Grid container item display="flex" justify="center">
          <div id="santa" className="santa-container">
            <img
              src={santa}
              alt="santa"
              className="santa-img"
              draggable="false"
            />
            <Grid className="santa-form-container">
              <Typography
                style={{
                  color: "whitesmoke",
                  fontFamily: "Dancing Script",
                  fontSize: "inherit",
                }}
              >
                ¡Hola! ¿Quieres compartir tu deseo navideño con la comunidad
                CICE? Es simple! Deja tu mensaje en la bolita, haz click en el
                botón, y luego en el árbol! Asi todos podrán ver tu mensaje y
                tú, el de los demás. HOHOHO
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Dialog>
    </div>
  );
}
