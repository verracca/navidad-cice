import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "../Esfera/EsferaStyles.css";
import Slide from "@material-ui/core/Slide";

import esfera from "../../assets/esfera.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function MessageDialog({ onClose, message }) {
  return (
    <div>
      <Dialog
        open={true}
        onClose={onClose}
        onClick={onClose}
        TransitionComponent={Transition}
      >
        <Grid container item display="flex" justify="center">
          <div id="esfera" className="esfera-container">
            <img
              src={esfera}
              alt="Esfera"
              className="esfera-img"
              draggable="false"
            />
            <Grid className="form-container">
              <Typography
                style={{
                  color: "whitesmoke",
                  fontFamily: "Dancing Script",
                  fontSize: "2rem",
                }}
              >
                {message}
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Dialog>
    </div>
  );
}
