import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "../Esfera/EsferaStyles.css";

import esfera from "../Esfera/esfera.png";

export default function MessageDialog({ onClose, message }) {
  return (
    <div>
      <Dialog open={true} onClose={onClose} onClick={onClose}>
        <Grid container item display="flex" justify="center">
          <div id="esfera" className="esfera-container">
            <img
              src={esfera}
              alt="Esfera"
              className="esfera-img"
              draggable="false"
            />
            <Grid className="form-container">
              <Typography variant="h6" style={{ color: "whitesmoke" }}>
                {message}
              </Typography>
            </Grid>
          </div>
          {/* <DialogContent>{message}</DialogContent> */}
        </Grid>
      </Dialog>
    </div>
  );
}
