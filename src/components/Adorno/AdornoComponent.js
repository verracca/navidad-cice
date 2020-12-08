import { ButtonBase } from "@material-ui/core";
import esfera from "./esfera.png";

function AdornoComponent({ x, y, message, disabled, onClick, size = 6 }) {
  const onPressed = (e) => {
    e.stopPropagation();
    if (!disabled) {
      //showModal
      onClick?.(message);
      console.log(message);
    }
  };

  return (
    <ButtonBase
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
      }}
      onClick={onPressed}
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
