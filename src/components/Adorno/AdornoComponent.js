import { ButtonBase } from "@material-ui/core";

function AdornoComponent({
  x,
  y,
  message,
  disabled,
  imgSrc,
  onClick,
  size = 6,
}) {
  const onPressed = (e) => {
    e.stopPropagation();
    if (!disabled) {
      //showModal
      onClick?.(message, imgSrc);
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
        src={imgSrc}
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
