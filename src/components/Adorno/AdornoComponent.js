import { ButtonBase } from "@material-ui/core";
import esfera from "./esfera.png";

const size = 6;

function AdornoComponent({ x, y, message }) {
  return (
    <ButtonBase
      disabled
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
      }}
    >
      <img
        src={esfera}
        alt="EsferaChica"
        className="esferachica-img"
        style={{
          width: "100%",
        }}
        // onClick={}
        draggable="false"
      />
    </ButtonBase>
  );
}

export default AdornoComponent;
