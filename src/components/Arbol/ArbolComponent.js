import "./ArbolComponent.css";
import arbol from "./xmastree.png";

// Returns true if point P inside the triangle with vertices at A, B and C
// representing 2D vectors and points as [x,y]. Based on
// http://www.blackpawn.com/texts/pointinpoly/default.html
function pointInTriange(P, { A, B, C }) {
  // Compute vectors
  function vec(from, to) {
    return { x: to.x - from.x, y: to.y - from.y };
  }
  var v0 = vec(A, C);
  var v1 = vec(A, B);
  var v2 = vec(A, P);
  // Compute dot products
  function dot(u, v) {
    return u.x * v.x + u.y * v.y;
  }
  var dot00 = dot(v0, v0);
  var dot01 = dot(v0, v1);
  var dot02 = dot(v0, v2);
  var dot11 = dot(v1, v1);
  var dot12 = dot(v1, v2);
  // Compute barycentric coordinates
  var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
  var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
  // Check if point is in triangle
  return u >= 0 && v >= 0 && u + v < 1;
}

const clickOnThree = (e) => {
  const puntosArbol = {
    A: { x: 47, y: 0 },
    B: { x: 3, y: 90 },
    C: { x: 98, y: 85 },
  };
  const mouseClientCoords = { x: e.clientX, y: e.clientY };
  const componentBounds = e.target.getBoundingClientRect();
  const mouseComponentCoords = {
    x: mouseClientCoords.x - componentBounds.x,
    y: mouseClientCoords.y - componentBounds.y,
  };

  const mouseIndependantCoords = {
    x: (mouseComponentCoords.x * 100) / componentBounds.width,
    y: (mouseComponentCoords.y * 100) / componentBounds.height,
  };

  return pointInTriange(mouseIndependantCoords, puntosArbol)
    ? mouseIndependantCoords
    : null;
};

function ArbolComponent({ onAddAdorno, children }) {
  const onClick = (e) => {
    console.log("arbol");
    const coords = clickOnThree(e);
    if (coords) {
      onAddAdorno?.(coords);
      console.log("ADENTRO DEL ARBOL", coords);
    }
  };

  return (
    <div className="arbol-container">
      <div className="arbol" style={{ position: "relative" }} onClick={onClick}>
        <img src={arbol} alt="Arbol" className="arbol-img" draggable="false" />
        {children}
      </div>
    </div>
  );
}

export default ArbolComponent;
