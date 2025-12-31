// import prev from "../../../Assets/Images/prev.png";
// function RightButton(onClick, onDisable) {
//   return (
//     <img
//       src={prev}
//       alt="rrow-prev"
//       onClick={onClick}
//       onDisable={onDisable}
//       height="35px"
//       width="35px"
//       style={{ float: "right", marginTop: "220px", cursor: "pointer" }}
//     />
//   );
// }

// export default RightButton;

import prev from "../../../Assets/Images/prev.png";

function RightButton({ onClick, disabled }) {
  return (
    <img
      src={prev}
      alt="prev-arrow"
      onClick={onClick}
      style={{ 
        position: "absolute",
        right: "15px", 
        top: "50%", 
        transform: "translateY(-50%)", 
        zIndex: "4", 
        cursor: "pointer",
        opacity: disabled ? "0.3" : "1"
      }}
      width="35px"
      height="35px"
    />
  );
}

export default RightButton;